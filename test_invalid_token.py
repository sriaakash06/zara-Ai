import requests

BASE_URL = "https://zara-chatbot-365f-465f.supabase.co/api"

def test_wrong_token():
    headers = {"Authorization": "Bearer invalid-token"}
    res = requests.get(f"{BASE_URL}/user/me", headers=headers)
    print(f"Status: {res.status_code}")
    print(f"Body: {res.text}")

if __name__ == "__main__":
    test_wrong_token()
