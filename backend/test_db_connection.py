import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

print("=" * 50)
print("SUPABASE CONNECTION TEST")
print("=" * 50)
print(f"URL: {SUPABASE_URL}")
print(f"Key (first 20 chars): {SUPABASE_KEY[:20] if SUPABASE_KEY else 'None'}...")
print(f"Key length: {len(SUPABASE_KEY) if SUPABASE_KEY else 0}")
print("=" * 50)

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("✅ Supabase client created successfully!")
    
    # Test 1: Try to list tables by querying a simple table
    print("\n📋 Testing database connection...")
    
    # Test 2: Check if 'messages' table exists and can be queried
    try:
        print("\n🔍 Checking 'messages' table...")
        response = supabase.table('messages').select("*").limit(5).execute()
        print(f"✅ Messages table exists! Found {len(response.data)} records")
        if response.data:
            print(f"Sample record: {response.data[0]}")
    except Exception as e:
        print(f"❌ Error accessing 'messages' table: {e}")
    
    # Test 3: Check if 'users' table exists
    try:
        print("\n🔍 Checking 'users' table...")
        response = supabase.table('users').select("*").limit(5).execute()
        print(f"✅ Users table exists! Found {len(response.data)} records")
        if response.data:
            print(f"Sample record: {response.data[0]}")
    except Exception as e:
        print(f"❌ Error accessing 'users' table: {e}")
    
    # Test 4: Try to insert a test message
    print("\n📝 Testing insert operation...")
    test_data = {
        'user_email': 'test@example.com',
        'user_message': 'Test message from connection script',
        'bot_reply': 'Test reply from Zara'
    }
    
    try:
        response = supabase.table('messages').insert(test_data).execute()
        print(f"✅ Insert successful!")
        print(f"Inserted data: {response.data}")
    except Exception as e:
        print(f"❌ Insert failed: {e}")
        print(f"Error type: {type(e).__name__}")

except Exception as e:
    print(f"\n❌ CRITICAL ERROR: {e}")
    print(f"Error type: {type(e).__name__}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 50)
print("TEST COMPLETE")
print("=" * 50)
