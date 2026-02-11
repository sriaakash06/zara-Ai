import requests
import json
import traceback

url = "http://127.0.0.1:5000/api/chat"
headers = {"Content-Type": "application/json"}
data = {
    "messages": [{"role": "user", "content": "Hello"}],
    "chatId": None
}

print(f"Sending POST to {url}...")
try:
    response = requests.post(url, json=data, headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
except Exception as e:
    print(f"Request Failed: {e}")
    traceback.print_exc()
