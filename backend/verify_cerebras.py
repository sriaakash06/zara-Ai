
import os
from dotenv import load_dotenv
from cerebras.cloud.sdk import Cerebras

# Load environment variables
load_dotenv()

api_key = os.getenv("CEREBRAS_API_KEY")

if not api_key:
    print("Error: CEREBRAS_API_KEY not found in .env")
    exit(1)

print(f"Testing Cerebras API with key: {api_key[:10]}...")

try:
    client = Cerebras(api_key=api_key)
    
    response = client.chat.completions.create(
        messages=[
            {"role": "user", "content": "Hello, are you working?"}
        ],
        model="cerebras-flash-latest",
    )
    
    print("\nSuccess! Response:")
    print(response.choices[0].message.content)

except Exception as e:
    print(f"\nError: {e}")
