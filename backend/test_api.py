
# Test script to verify Gemini API key
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

print("=" * 50)
if not GEMINI_API_KEY:
    print("ERROR: No API key found in .env file")
    exit(1)

print(f"API Key found: {GEMINI_API_KEY[:20]}...")
print("=" * 50)

try:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('models/gemini-flash-latest')
    
    print("Sending test message to Gemini...")
    response = model.generate_content("Say hello in one sentence")
    
    print("=" * 50)
    print("SUCCESS! Gemini API is working!")
    print(f"Response: {response.text}")
    print("=" * 50)
    
except Exception as e:
    print("=" * 50)
    print(f"ERROR: {type(e).__name__}")
    print(f"Message: {str(e)}")
    print("=" * 50)
    print("\nTroubleshooting:")
    print("1. Verify your API key at: https://aistudio.google.com/app/apikey")
    print("2. Make sure you've enabled the Gemini API")
    print("3. Check if you have rate limits or quota issues")
    print("4. Try creating a new API key")
