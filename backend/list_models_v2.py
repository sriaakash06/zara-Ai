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
        self.file.write(data)
        self.stdout.write(data)
    def flush(self):
        self.file.flush()
        self.stdout.flush()

# Redirect stdout to a file
sys.stdout = Tee('list_models_output.txt', 'w')

load_dotenv()

api_key = os.getenv('CEREBRAS_API_KEY')
print(f"API Key present: {bool(api_key)}")

if not api_key:
    print("No API key found!")
    exit()

genai.configure(api_key=api_key)

print("\n--- Listing Models ---")
try:
    for m in genai.list_models():
        print(f"Model: {m.name}")
        print(f"  Supported methods: {m.supported_generation_methods}")
except Exception as e:
    print(f"Error listing models: {e}")

print("\n--- Done ---")
