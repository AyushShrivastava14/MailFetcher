from flask import Flask, jsonify, request
from flask_cors import CORS
import email
import imaplib
import os
import jwt

app = Flask(__name__)
CORS(app)

imap_server = "imap.gmail.com"
email_address = os.getenv("FORWARD_MAIL")
password = os.getenv("FORWARD_MAIL_PASS")
SECRET_KEY = os.getenv("SECRET_KEY")

# Initial valid access codes
valid_access_codes = ['0000', '1111']

@app.route('/get_last_email', methods=['GET'])
def get_last_email():
    search_string = request.args.get('search', default="", type=str)
    subject = request.args.get('subject', default="", type=str)

    if not subject or not search_string:
        return jsonify({"error": "Both 'subject' and 'search' parameters are required"}), 400

    try:
        imap = imaplib.IMAP4_SSL(imap_server)
        imap.login(email_address, password)
        imap.select("Inbox")

        search_criteria = f'(SUBJECT "{subject}" TO "{search_string}")'
        _, msgnums = imap.search(None, search_criteria)

        email_ids = list(map(int, msgnums[0].split()))

        if email_ids:
            last_email = email_ids[-1]
            _, data = imap.fetch(str(last_email), "(RFC822)")
            message = email.message_from_bytes(data[0][1])

            email_data = {
                "From": message.get('From'),
                "To": message.get('To'),
                "Date": message.get('Date'),
                "Subject": message.get('Subject'),
                "Content": ""
            }

            for part in message.walk():
                if part.get_content_type() == "text/plain":
                    email_data["Content"] = part.get_payload(decode=True).decode()

            imap.close()
            imap.logout()
            return jsonify(email_data)
        else:
            imap.close()
            imap.logout()
            return jsonify({"error": "No emails found"}), 404

    except imaplib.IMAP4.error as e:
        return jsonify({"error": f"IMAP error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/access-codes', methods=['GET'])
def get_access_codes():
    return jsonify(valid_access_codes)

@app.route('/access-codes', methods=['POST'])
def add_access_code():
    code = request.json.get('code')
    if code and code not in valid_access_codes:
        valid_access_codes.append(code)
        return jsonify({"message": "Access code added successfully"})
    else:
        return jsonify({"message": "Access code already exists or invalid input"})

@app.route('/access-codes', methods=['DELETE'])
def remove_access_code():
    code = request.json.get('code')
    if code and code in valid_access_codes:
        valid_access_codes.remove(code)
        return jsonify({"message": "Access code removed successfully"})
    else:
        return jsonify({"message": "Access code does not exist or invalid input"})
    


def generate_token(role):
    payload = {
        "role": role
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token

def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return True
    except jwt.ExpiredSignatureError:
        return False
    except jwt.InvalidTokenError:
        return False
    

@app.route('/generate-token', methods=['POST'])
def generate_token_route():
    role = request.json.get('role')
    if not role:
        return jsonify({"error": "Email is required"}), 400
    token = generate_token(role)
    return jsonify({"token": token})

@app.route('/verify-token', methods=['POST'])
def verify_token_route():
    token = request.json.get('token')
    if not token:
        return jsonify({"error": "Token is required"}), 400
    is_valid = verify_token(token)
    if is_valid:
        return jsonify({"message": "valid"})
    else:
        return jsonify({"message": "Token is invalid or expired"}), 401


if __name__ == '__main__':
    app.run(debug=True)