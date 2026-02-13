import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv(os.path.join('backend', '.env'))

api_key = os.getenv('GEMINI_API_KEY')
print(f"API Key found: {bool(api_key)}")
if api_key:
    print(f"Key starts with: {api_key[:10]}...")

try:
    genai.configure(api_key=api_key)
    print("Listing models...")
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"- {m.name}")
except Exception as e:
    print(f"Error: {e}")
