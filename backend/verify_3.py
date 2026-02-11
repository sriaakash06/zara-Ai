import google.generativeai as genai
import os
from dotenv import load_dotenv
import sys

# Configure stdout and stderr to write to a file as well
class Tee(object):
    def __init__(self, name, mode):
        self.file = open(name, mode)
        self.stdout = sys.stdout
        sys.stdout = self
    def __del__(self):
        sys.stdout = self.stdout
        self.file.close()
    def write(self, data):
        try:
            self.file.write(data)
            self.stdout.write(data)
        except Exception:
            pass # handle encoding errors gracefully
    def flush(self):
        self.file.flush()
        self.stdout.flush()

# Redirect stdout to a file
sys.stdout = Tee('verify_3_output.txt', 'w')

load_dotenv()

api_key = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=api_key)

print(f"Testing model: gemini-flash-latest")
try:
    model = genai.GenerativeModel('gemini-flash-latest')
    response = model.generate_content("Hello from verification 3!")
    print(f"Success! Response: {response.text}")
except Exception as e:
    print(f"Failed again: {e}")

print("\n--- Done ---")
