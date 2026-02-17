
import os
from dotenv import load_dotenv
from cerebras.cloud.sdk import Cerebras

# Load environment variables
load_dotenv()

api_key = os.getenv("CEREBRAS_API_KEY")

print("=" * 50)
if not api_key:
    print("ERROR: CEREBRAS_API_KEY not found in .env")
    exit(1)

print(f"API Key found: {api_key[:10]}...")
print("=" * 50)

print("Sending test message to Cerebras...")
try:
    client = Cerebras(api_key=api_key)
    
    response = client.chat.completions.create(
        messages=[
            {"role": "user", "content": "Say hello in one sentence"}
        ],
        model="cerebras-flash-latest",
    )
    
    print("=" * 50)
    print("SUCCESS! Cerebras API is working!")
    print(f"Response: {response.choices[0].message.content}")
    print("=" * 50)

except Exception as e:
    print(f"\nError: {e}")
