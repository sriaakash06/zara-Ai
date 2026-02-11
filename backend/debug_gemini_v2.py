import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('GEMINI_API_KEY')
print(f"API Key found: {bool(api_key)}")

if api_key:
    genai.configure(api_key=api_key)
    
    print("\nListing available models:")
    try:
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(m.name)
    except Exception as e:
        print(f"Error listing models: {e}")

    print("\nTesting generation with 'gemini-1.5-flash'...")
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content("Hello")
        print(f"Success! Response: {response.text}")
    except Exception as e:
        print(f"Error with 'gemini-1.5-flash': {e}")
        
    print("\nTesting generation with 'models/gemini-1.5-flash'...")
    try:
        model = genai.GenerativeModel('models/gemini-1.5-flash')
        response = model.generate_content("Hello")
        print(f"Success! Response: {response.text}")
    except Exception as e:
        print(f"Error with 'models/gemini-1.5-flash': {e}")
