
import os
from dotenv import load_dotenv
import google.generativeai as genai
import traceback

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
print(f"Key loaded: {bool(api_key)}")

if not api_key:
    print("NO API KEY")
    exit(1)

genai.configure(api_key=api_key)

try:
    print("Listing models...")
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"- {m.name}")
except Exception:
    traceback.print_exc()

print("\nTrying generation with 'models/gemini-1.5-flash'...")
try:
    model = genai.GenerativeModel('models/gemini-1.5-flash')
    response = model.generate_content("Hi")
    print(f"SUCCESS 1.5-flash: {response.text}")
except Exception:
    traceback.print_exc()
