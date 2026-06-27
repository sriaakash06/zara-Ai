import os
from dotenv import load_dotenv
from cerebras.cloud.sdk import Cerebras

load_dotenv()
api_key = os.getenv("CEREBRAS_API_KEY")
client = Cerebras(api_key=api_key)

try:
    print(client.models.list())
except Exception as e:
    print("Error:", e)
