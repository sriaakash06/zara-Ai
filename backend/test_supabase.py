import os
import sys
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

print(f"URL: {SUPABASE_URL}")

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("Client created.")
    
    print("Attempting insert into messages...")
    test_message = {
        'user_email': 'test@example.com',
        'user_message': 'Debug Sync Test - ' + str(os.urandom(4).hex()),
        'bot_reply': 'Response from Zara'
    }
    response = supabase.table('messages').insert(test_message).execute()
    print("Messages insert success!")
    print(f"Data saved: {response.data}")

except Exception as e:
    print(f"CRITICAL ERROR: {e}")
    import traceback
    traceback.print_exc()
