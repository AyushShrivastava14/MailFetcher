from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask import Flask, jsonify, request
from flask_cors import CORS
import email
import imaplib
import os
import re
from email.utils import parsedate_to_datetime
from datetime import datetime, timedelta, timezone

app = Flask(__name__)
cors_origins = [
    os.getenv("ORIGIN_1"),
    os.getenv("ORIGIN_2"),
    os.getenv("ORIGIN_3"),
]

CORS(app, origins=cors_origins)

imap_server = "imap.gmail.com"
email_address = os.getenv("FORWARD_MAIL")
password = os.getenv("FORWARD_MAIL_PASS")

# MongoDB connection
uri = os.getenv("MONGO_URI")
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["access_codes"]
codes_collection = db["codes"]



@app.route('/get_last_email', methods=['GET'])
def get_last_email():
    search_string = request.args.get('search', default="", type=str)
    subject1 = request.args.get('subject', default="", type=str)
    subject2 = request.args.get('subject2', default="", type=str)

    if not search_string or not (subject1 or subject2):
        return jsonify({"error": "At least one subject and the 'search' parameter are required"}), 400

    blocked_domains = {
        "autofusionx.com",
        "legitanand.com",
        "poxol.us",
        "hotscar.com",
        "gilnate.com",
        "hybridpro.fun"
    }

    if search_string.lower() in blocked_domains:
        return jsonify({"error": "This domain is blocked"}), 403

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

        # Remove duplicates, sort descending (newest first)
        email_ids = sorted(set(email_ids), reverse=True)

        # Time filter (last 15 minutes)
        now = datetime.now(timezone.utc)
        cutoff_time = now - timedelta(minutes=15)

        for email_id in email_ids:
            _, data = imap.fetch(str(email_id), "(RFC822)")
            message = email.message_from_bytes(data[0][1])

            try:
                date_tuple = parsedate_to_datetime(message["Date"])
            except Exception:
                continue  # Skip if date parsing fails

            if date_tuple < cutoff_time:
                continue

            email_data = {
                "Content": "",
                "Link": False
            }

            for part in message.walk():
                if part.get_content_type() == "text/plain":
                    content = part.get_payload(decode=True).decode()

                    if subject1 == "Complete your password reset request":
                        reset_link_match = re.search(r'https://www\.netflix\.com/password\?[^ \n\r<>"]+', content)
                        email_data["Content"] = reset_link_match.group(0).rstrip(']>') if reset_link_match else "Reset link not found"
                        email_data["Link"] = True

                    elif subject1 == "Netflix: Your sign-in code":
                        code_match = re.search(r'\b\d{4,6}\b', content)
                        email_data["Content"] = code_match.group(0) if code_match else "Code not found"
                        email_data["Link"] = False

                    else:
                        household_link_match = re.search(
                            r'https://www\.netflix\.com/account/update-primary-location\?[^ \n\r<>"]+',
                            content
                        )
                        email_data["Content"] = household_link_match.group(0).rstrip(']>') if household_link_match else "Household update link not found"
                        email_data["Link"] = True

            imap.close()
            imap.logout()
            return jsonify(email_data)

        imap.close()
        imap.logout()
        return jsonify({"error": "No recent emails found in last 15 minutes"}), 404

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




# MongoDB-based SIGN-IN access code management
@app.route('/signincodes', methods=['GET'])
def get_signin_codes():
    document = codes_collection.find_one()
    if document and 'signin-codes' in document:
        return jsonify(document['signin-codes'])
    return jsonify([])

@app.route('/signincodes', methods=['POST'])
def add_signin_code():
    code = request.json.get('code')
    if not code:
        return jsonify({"message": "Invalid input"}), 400

    document = codes_collection.find_one()
    if document:
        if code in document['signin-codes']:
            return jsonify({"message": "Sign-In code already exists"})
        codes_collection.update_one(
            {'_id': document['_id']},
            {'$push': {'signin-codes': code}}
        )
    else:
        codes_collection.insert_one({'signin-codes': [code]})

    return jsonify({"message": "Sign-In code added successfully"})

@app.route('/signincodes', methods=['DELETE'])
def remove_signin_code():
    code = request.json.get('code')
    if not code:
        return jsonify({"message": "Invalid input"}), 400

    document = codes_collection.find_one()
    if document and code in document['signin-codes']:
        codes_collection.update_one(
            {'_id': document['_id']},
            {'$pull': {'signin-codes': code}}
        )
        return jsonify({"message": "Sign-In code removed successfully"})
    else:
        return jsonify({"message": "Sign-In code does not exist"})






# MongoDB-based household access code management
@app.route('/household-codes', methods=['GET'])
def get_access_codes():
    document = codes_collection.find_one()
    if document and 'household-codes' in document:
        return jsonify(document['household-codes'])
    return jsonify([])

@app.route('/household-codes', methods=['POST'])
def add_access_code():
    code = request.json.get('code')
    if not code:
        return jsonify({"message": "Invalid input"}), 400

    document = codes_collection.find_one()
    if document:
        if code in document['household-codes']:
            return jsonify({"message": "Access code already exists"})
        codes_collection.update_one(
            {'_id': document['_id']},
            {'$push': {'household-codes': code}}
        )
    else:
        codes_collection.insert_one({'household-codes': [code]})

    return jsonify({"message": "Access code added successfully"})

@app.route('/household-codes', methods=['DELETE'])
def remove_access_code():
    code = request.json.get('code')
    if not code:
        return jsonify({"message": "Invalid input"}), 400

    document = codes_collection.find_one()
    if document and code in document['household-codes']:
        codes_collection.update_one(
            {'_id': document['_id']},
            {'$pull': {'household-codes': code}}
        )
        return jsonify({"message": "Access code removed successfully"})
    else:
        return jsonify({"message": "Access code does not exist"})





@app.route('/')
def home():
    return jsonify({"message": "Backend is running"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
