from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
cors_origins = [
    os.getenv("ORIGIN_1"),
    os.getenv("ORIGIN_2"),
    # 'http://localhost:5173'
]

CORS(app, origins=cors_origins)


# MongoDB connection
uri = os.getenv("MONGO_URI")
client = MongoClient(uri, server_api=ServerApi('1'))

# MongoDB collections
db = client["access_codes"]
codes_collection = db["codes"]


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


@app.route('/')
def home():
    return jsonify({"message": "Backend is running"}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)