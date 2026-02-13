import sqlite3
import os
import sys

# Set UTF-8 encoding for Windows console
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')

# Flask stores the database in the instance folder
db_path = os.path.join('instance', 'zara.db')

if not os.path.exists(db_path):
    print(f"Database file '{db_path}' not found!")
    print("The database should be created when you run app.py")
    exit(1)

print("=" * 60)
print("ZARA CHATBOT - LOCAL DATABASE CHECK")
print("=" * 60)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Check Users
print("\nUSERS TABLE:")
print("-" * 60)
cursor.execute("SELECT COUNT(*) FROM user")
user_count = cursor.fetchone()[0]
print(f"Total users: {user_count}")

if user_count > 0:
    cursor.execute("SELECT id, username, email FROM user LIMIT 5")
    users = cursor.fetchall()
    print("\nRecent users:")
    for user in users:
        print(f"  ID: {user[0]}, Username: {user[1]}, Email: {user[2]}")

# Check Chats
print("\nCHATS TABLE:")
print("-" * 60)
cursor.execute("SELECT COUNT(*) FROM chat")
chat_count = cursor.fetchone()[0]
print(f"Total chats: {chat_count}")

if chat_count > 0:
    cursor.execute("SELECT id, user_id, title, created_at FROM chat ORDER BY created_at DESC LIMIT 5")
    chats = cursor.fetchall()
    print("\nRecent chats:")
    for chat in chats:
        title = chat[2][:50] if chat[2] else "Untitled"
        print(f"  Chat ID: {chat[0]}, User ID: {chat[1]}, Title: {title}, Created: {chat[3]}")

# Check Messages
print("\nMESSAGES TABLE:")
print("-" * 60)
cursor.execute("SELECT COUNT(*) FROM message")
message_count = cursor.fetchone()[0]
print(f"Total messages: {message_count}")

if message_count > 0:
    cursor.execute("""
        SELECT m.id, m.chat_id, m.role, m.content, m.timestamp 
        FROM message m 
        ORDER BY m.timestamp DESC 
        LIMIT 10
    """)
    messages = cursor.fetchall()
    print("\nRecent messages:")
    for msg in messages:
        content_preview = msg[3][:60] + "..." if len(msg[3]) > 60 else msg[3]
        print(f"  [{msg[4]}] {msg[2].upper()}: {content_preview}")

print("\n" + "=" * 60)
print("SUMMARY:")
print(f"  Users: {user_count}")
print(f"  Chats: {chat_count}")
print(f"  Messages: {message_count}")
print("=" * 60)

if message_count > 0:
    print("\nData IS being saved to the local SQLite database!")
    print("Next step: Fix Supabase connection to sync to cloud database")
else:
    print("\nNo messages found in local database")
    print("Try sending a message in the chat to test if saving works")

conn.close()
