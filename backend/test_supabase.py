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
    
    test_data = {
        'user_message': 'Debug Sync Test',
        'bot_reply': 'Response from Zara'
    }
    
    print("Attempting insert...")
    response = supabase.table('messages').insert(test_data).execute()
    
    print("--- RESPONSE DATA ---")
    print(response.data)
    print("--- FULL RESPONSE ---")
    print(response)

except Exception as e:
    print(f"CRITICAL ERROR: {e}")
    import traceback
    traceback.print_exc()
