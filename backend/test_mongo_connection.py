import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError, OperationFailure

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

print("=" * 55)
print("  ZARA - MongoDB Connection Test")
print("=" * 55)

if not MONGO_URI:
    print("FAIL: MONGO_URI is NOT set in .env!")
    exit(1)

safe_uri = MONGO_URI
if "@" in MONGO_URI:
    pre  = MONGO_URI.split("://")[0]
    post = MONGO_URI.split("@")[1]
    safe_uri = f"{pre}://****:****@{post}"
print(f"URI   : {safe_uri}")
print("-" * 55)

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=8000)
    info = client.server_info()
    print(f"PASS: Connected - MongoDB v{info.get('version', '?')}")

    db = client.get_database("zara_db")
    collections = db.list_collection_names()
    print(f"Database   : zara_db")
    print(f"Collections: {collections if collections else '(empty - first run)'}")

    db.command("ping")
    print("PASS: Ping successful!")

except ServerSelectionTimeoutError as e:
    print(f"FAIL: Timeout - Cannot reach MongoDB Atlas.")
    print(f"  Reason: {e}")
    print()
    print("  Likely causes:")
    print("  1. Atlas IP Whitelist is blocking this machine")
    print("  2. Wrong cluster hostname in MONGO_URI")
    print("  3. No internet / firewall issue")

except OperationFailure as e:
    print(f"FAIL: Auth failed - Wrong username or password.")
    print(f"  Reason: {e}")

except Exception as e:
    print(f"FAIL: {type(e).__name__}: {e}")

finally:
    try:
        client.close()
    except Exception:
        pass

print("=" * 55)
