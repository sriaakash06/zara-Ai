import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('GEMINI_API_KEY')
print(f"Testing API Key: {api_key[:25]}...")

# Try different model names
model_names = [
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'models/gemini-pro',
]

for model_name in model_names:
    try:
        print(f"\nTrying model: {model_name}")
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(model_name)
        response = model.generate_content("Say hello in one word")
        print(f"✅ SUCCESS with {model_name}!")
        print(f"Response: {response.text}")
        break
    except Exception as e:
        print(f"❌ Failed: {str(e)[:80]}")
