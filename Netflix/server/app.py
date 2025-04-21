from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask import Flask, jsonify, request
from flask_cors import CORS
import email
import imaplib
import os
import jwt

app = Flask(__name__)
cors_origins = [
    os.getenv("ORIGIN_1"),
    os.getenv("ORIGIN_2"),
    # 'http://localhost:5173'
]

CORS(app, origins=cors_origins)


imap_server = "imap.gmail.com"
email_address = os.getenv("FORWARD_MAIL")
password = os.getenv("FORWARD_MAIL_PASS")
SECRET_KEY = os.getenv("SECRET_KEY")


# MongoDB connection
uri = os.getenv("MONGO_URI")
client = MongoClient(uri, server_api=ServerApi('1'))

# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)

# MongoDB collections
db = client["access_codes"]
codes_collection = db["codes"]



@app.route('/get_last_email', methods=['GET'])
def get_last_email():
    search_string = request.args.get('search', default="", type=str)
    subject1 = request.args.get('subject', default="", type=str)
    subject2 = request.args.get('subject2', default="", type=str)

    if not search_string or not (subject1 or subject2):
        return jsonify({"error": "At least one subject and the 'search' parameter are required"}), 400

    try:
        imap = imaplib.IMAP4_SSL(imap_server)
        imap.login(email_address, password)
        imap.select("Inbox")

        email_ids = []

        # Search using first subject
        if subject1:
            search_criteria_1 = f'(SUBJECT "{subject1}" TO "{search_string}")'
            _, msgnums1 = imap.search(None, search_criteria_1)
            email_ids += list(map(int, msgnums1[0].split()))

        # Search using second subject
        if subject2:
            search_criteria_2 = f'(SUBJECT "{subject2}" TO "{search_string}")'
            _, msgnums2 = imap.search(None, search_criteria_2)
            email_ids += list(map(int, msgnums2[0].split()))

        # Remove duplicates and sort by ID (increasing)
        email_ids = sorted(set(email_ids))

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
                    # email_data["Content"] = part.get_payload(decode=True).decode()
                    content = part.get_payload(decode=True).decode()
                    words = content.split()
                    limited_content = " ".join(words[:200])
                    email_data["Content"] = limited_content

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



# MongoDB-based access code management
@app.route('/access-codes', methods=['GET'])
def get_access_codes():
    document = codes_collection.find_one()
    if document and 'valid_codes' in document:
        return jsonify(document['valid_codes'])
    return jsonify([])

@app.route('/access-codes', methods=['POST'])
def add_access_code():
    code = request.json.get('code')
    if not code:
        return jsonify({"message": "Invalid input"}), 400

    document = codes_collection.find_one()
    if document:
        if code in document['valid_codes']:
            return jsonify({"message": "Access code already exists"})
        codes_collection.update_one(
            {'_id': document['_id']},
            {'$push': {'valid_codes': code}}
        )
    else:
        codes_collection.insert_one({'valid_codes': [code]})

    return jsonify({"message": "Access code added successfully"})

@app.route('/access-codes', methods=['DELETE'])
def remove_access_code():
    code = request.json.get('code')
    if not code:
        return jsonify({"message": "Invalid input"}), 400

    document = codes_collection.find_one()
    if document and code in document['valid_codes']:
        codes_collection.update_one(
            {'_id': document['_id']},
            {'$pull': {'valid_codes': code}}
        )
        return jsonify({"message": "Access code removed successfully"})
    else:
        return jsonify({"message": "Access code does not exist"})



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


@app.route('/')
def home():
    return jsonify({"message": "Backend is running"}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
