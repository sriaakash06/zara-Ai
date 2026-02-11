
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("ERROR: No GEMINI_API_KEY found in .env")
    exit(1)

print(f"Testing with API Key: {api_key[:5]}...{api_key[-5:]}")

try:
    genai.configure(api_key=api_key)
    
    # Try gemini-flash-latest (as seen in available models)
    print("Attempting to generate with gemini-flash-latest...")
    model = genai.GenerativeModel('gemini-flash-latest')
    response = model.generate_content("Hello")
    print("SUCCESS: gemini-flash-latest works!")
    print(f"Response: {response.text}")
    
except Exception as e:
    print(f"ERROR with gemini-flash-latest: {type(e).__name__}: {e}")
    
    try:
        # Fallback to gemini-pro (v1.0) without system instructions just to check basic access
        print("\nAttempting fallback to gemini-pro (without system instructions)...")
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content("Hello")
        print("SUCCESS: gemini-pro works!")
        print(f"Response: {response.text}")
    except Exception as e2:
        print(f"ERROR with gemini-pro: {type(e2).__name__}: {e2}")
