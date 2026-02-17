
import os
from dotenv import load_dotenv
from cerebras.cloud.sdk import Cerebras

load_dotenv()

api_key = os.getenv("CEREBRAS_API_KEY")

if not api_key:
    print("ERROR: No CEREBRAS_API_KEY found in .env")
    exit(1)

print(f"Testing with API Key: {api_key[:10]}...")

try:
    client = Cerebras(api_key=api_key)
    
    print("Attempting to generate with cerebras-flash-latest...")
    response = client.chat.completions.create(
        messages=[{"role": "user", "content": "Hello"}],
        model="cerebras-flash-latest",
    )
    print("SUCCESS: Cerebras works!")
    print(f"Response: {response.choices[0].message.content}")
    
except Exception as e:
    print(f"ERROR: {type(e).__name__}: {e}")
