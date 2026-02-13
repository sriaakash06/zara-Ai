import requests

BASE_URL = "http://localhost:5000/api"

def test_wrong_token():
    headers = {"Authorization": "Bearer invalid-token"}
    res = requests.get(f"{BASE_URL}/user/me", headers=headers)
    print(f"Status: {res.status_code}")
    print(f"Body: {res.text}")

if __name__ == "__main__":
    test_wrong_token()
