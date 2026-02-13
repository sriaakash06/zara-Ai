import sqlite3
import os

db_path = os.path.join('backend', 'instance', 'zara.db')
if not os.path.exists(db_path):
    # Try alternate path if first one fails
    db_path = 'backend/zara.db'

print(f"Checking database at: {db_path}")

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT id, username, email FROM user")
    users = cursor.fetchall()
    print(f"Users found: {len(users)}")
    for user in users:
        print(f"ID: {user[0]}, Username: {user[1]}, Email: {user[2]}")
    conn.close()
except Exception as e:
    print(f"Error: {e}")
