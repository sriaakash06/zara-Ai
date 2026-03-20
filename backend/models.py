from datetime import datetime
from bson import ObjectId


def serialize_doc(doc):
    """Convert MongoDB document to JSON-serializable dict."""
    if doc is None:
        return None
    doc = dict(doc)
    if '_id' in doc:
        doc['_id'] = str(doc['_id'])
    return doc


class UserModel:
    """Helper class for User operations in MongoDB."""

    def __init__(self, db):
        self.collection = db['users']
        # Ensure unique indexes
        self.collection.create_index('email', unique=True)
        self.collection.create_index('username', unique=True)

    def create(self, username, email, hashed_password):
        user = {
            'username': username,
            'email': email,
            'password': hashed_password,
            'created_at': datetime.utcnow()
        }
        result = self.collection.insert_one(user)
        user['_id'] = str(result.inserted_id)
        return user

    def find_by_email(self, email):
        return self.collection.find_one({'email': email})

    def find_by_username(self, username):
        return self.collection.find_one({'username': username})

    def find_by_id(self, user_id):
        try:
            return self.collection.find_one({'_id': ObjectId(user_id)})
        except Exception:
            return None

    def to_dict(self, user):
        return {
            'id': str(user['_id']),
            'username': user['username'],
            'email': user['email']
        }


class ChatModel:
    """Helper class for Chat operations in MongoDB."""

    def __init__(self, db):
        self.collection = db['chats']
        self.collection.create_index('user_id')

    def create(self, user_id, title='New Chat'):
        chat = {
            'user_id': str(user_id),
            'title': title,
            'created_at': datetime.utcnow()
        }
        result = self.collection.insert_one(chat)
        chat['_id'] = result.inserted_id
        return chat

    def find_by_user(self, user_id):
        return list(self.collection.find({'user_id': str(user_id)}).sort('created_at', -1))

    def find_by_id(self, chat_id):
        try:
            return self.collection.find_one({'_id': ObjectId(chat_id)})
        except Exception:
            return None

    def update_title(self, chat_id, title):
        self.collection.update_one({'_id': ObjectId(chat_id)}, {'$set': {'title': title}})

    def delete(self, chat_id):
        self.collection.delete_one({'_id': ObjectId(chat_id)})

    def to_dict(self, chat):
        return {
            'id': str(chat['_id']),
            'title': chat.get('title', 'New Chat'),
            'created_at': chat['created_at'].isoformat() if isinstance(chat['created_at'], datetime) else chat['created_at']
        }


class MessageModel:
    """Helper class for Message operations in MongoDB."""

    def __init__(self, db):
        self.collection = db['messages']
        self.collection.create_index('chat_id')

    def create(self, chat_id, role, content):
        message = {
            'chat_id': str(chat_id),
            'role': role,
            'content': content,
            'timestamp': datetime.utcnow()
        }
        result = self.collection.insert_one(message)
        message['_id'] = result.inserted_id
        return message

    def find_by_chat(self, chat_id):
        return list(self.collection.find({'chat_id': str(chat_id)}).sort('timestamp', 1))

    def delete_by_chat(self, chat_id):
        self.collection.delete_many({'chat_id': str(chat_id)})

    def to_dict(self, message):
        return {
            'role': message['role'],
            'content': message['content'],
            'timestamp': message['timestamp'].isoformat() if isinstance(message['timestamp'], datetime) else message['timestamp']
        }
