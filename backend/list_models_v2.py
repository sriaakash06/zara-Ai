from cerebras.cloud.sdk import Cerebras
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('CEREBRAS_API_KEY')
print(f"API Key present: {bool(api_key)}")

if not api_key:
    print("No API key found!")
    exit()

client = Cerebras(api_key=api_key)

print("\n--- Listing Models ---")
try:
    # Cerebras SDK doesn't have a direct .list_models() in the same way, 
    # but we can try common ones or check the client capabilities if available.
    # Actually, as of now, they support llama3.1-8b, llama3.1-70b, llama3.3-70b.
    # We will try a simple completion with a known model to verify.
    
    models = ["llama3.1-8b", "llama3.1-70b", "llama-3.3-70b"]
    for model in models:
        try:
            print(f"Checking model availability: {model}")
            response = client.chat.completions.create(
                messages=[{"role": "user", "content": "test"}],
                model=model,
                max_tokens=10
            )
            print(f"  Model {model} is AVAILABLE")
        except Exception as me:
            print(f"  Model {model} check failed: {me}")

except Exception as e:
    print(f"Error: {e}")

print("\n--- Done ---")

