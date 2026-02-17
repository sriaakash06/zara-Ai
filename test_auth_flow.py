import requests

BASE_URL = "https://zara-chatbot-365f-465f.supabase.co/api"

def test_auth():
    # Try to login
    login_data = {
        "email": "asriaakash@gmail.com",
        "password": "password" # I don't know the password, but I can try to register a new user
    }
    
    # Try register first to be sure
    reg_data = {
        "username": "testuser_debug",
        "email": "debug@example.com",
        "password": "password123"
    }
    
    print("Testing /api/register...")
    res = requests.post(f"{BASE_URL}/register", json=reg_data)
    print(f"Register status: {res.status_code}")
    if res.status_code in [201, 409]: # 409 if already exists
        if res.status_code == 409:
            print("User already exists, trying login...")
            res = requests.post(f"{BASE_URL}/login", json={"email": "debug@example.com", "password": "password123"})
            print(f"Login status: {res.status_code}")
        
        if res.status_code in [200, 201]:
            data = res.json()
            token = data.get('token')
            print(f"Token received: {token[:20]}...")
            
            print("Testing /api/user/me...")
            headers = {"Authorization": f"Bearer {token}"}
            me_res = requests.get(f"{BASE_URL}/user/me", headers=headers)
            print(f"User/me status: {me_res.status_code}")
            print(f"User/me response: {me_res.text}")
        else:
            print(f"Failed to get token: {res.text}")
    else:
        print(f"Register failed: {res.text}")

if __name__ == "__main__":
    test_auth()
