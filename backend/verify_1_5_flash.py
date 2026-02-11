import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=api_key)

print(f"Testing model: gemini-1.5-flash")
try:
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("Hello from verification 1.5 flash!")
    print(f"Success! Response: {response.text}")
except Exception as e:
    print(f"Failed: {e}")
