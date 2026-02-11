import requests
import json
import time

url = 'http://127.0.0.1:5000/api/chat'
headers = {'Content-Type': 'application/json'}
data = {
    'messages': [
        {'role': 'user', 'content': 'Hello, are you working now?'}
    ]
}

print("Sending request to backend...")
try:
    response = requests.post(url, headers=headers, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
