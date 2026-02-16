
import requests
import json

URL = "https://zara-ai-iphl.onrender.com/api/health"
print(f"Testing {URL}...")
try:
    response = requests.get(URL, timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    if response.status_code == 200:
        data = response.json()
        if data.get('api_configured'):
             print("SUCCESS: Remote API is Configured!")
        else:
             print("WARNING: Remote API NOT Configured (Check Render Dashboard).")
except Exception as e:
    print(f"Error: {e}")

CHAT_URL = "https://zara-ai-iphl.onrender.com/api/chat"
print(f"\nTesting {CHAT_URL}...")
try:
    response = requests.post(CHAT_URL, json={"messages": [{"role": "user", "content": "hello"}]}, timeout=15)
    print(f"Status Code: {response.status_code}")
    prefix = response.text[:200] if len(response.text) > 200 else response.text
    print(f"Response content prefix: {prefix}")
    
    if "Fallback Mode" in response.text:
         print("NOTICE: Response is FALLBACK (Key issue?).")
    elif response.status_code == 200:
         print("SUCCESS: Real AI Response received!")
except Exception as e:
    print(f"Error: {e}")
