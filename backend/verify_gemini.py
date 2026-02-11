import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=api_key)

print(f"Testing model: gemini-2.0-flash")
try:
    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content("Hello from verification script!")
    print(f"Success! Response: {response.text}")
except Exception as e:
    print(f"Failed again: {e}")
