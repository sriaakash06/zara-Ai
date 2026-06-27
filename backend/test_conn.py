import requests
try:
    r = requests.get("http://localhost:5000/health")
    print("Localhost:", r.status_code, r.json())
except Exception as e:
    print("Localhost Error:", e)

try:
    r = requests.get("http://127.0.0.1:5000/health")
    print("127.0.0.1:", r.status_code, r.json())
except Exception as e:
    print("127.0.0.1 Error:", e)
