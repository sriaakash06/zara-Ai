# 🚀 Quick Setup Guide - Zara AI Chatbot

## ✅ Current Status
Your Zara AI Chatbot is **READY** and both servers are running!

### Running Servers:
- **Backend (Flask)**: http://127.0.0.1:5000 ✅ (Running for 18+ minutes)
- **Frontend (Next.js)**: http://localhost:3080 ✅ (Running for 1h35m+)

## 🔑 IMPORTANT: Add Your Cerebras API Key

### Step 1: Get Your API Key
1. Visit: https://cloud.cerebras.ai/
2. Sign in or create an account
3. Navigate to **API Keys**
4. Copy your **CEREBRAS_API_KEY**

### Step 2: Add API Key to Your Project
Open the file: `backend/.env`

Replace:
```env
CEREBRAS_API_KEY=your_api_key_here
```

With your actual API key:
```env
CEREBRAS_API_KEY=csk-v3r9vev3m...
```

### Step 3: Restart the Backend
After adding your API key:
1. Press `Ctrl+C` in the terminal running `python app.py`
2. Run again:
   ```bash
   cd backend
   python app.py
   ```

You should see:
```
✅ Cerebras API configured successfully!
🚀 Starting Zara AI Backend Server...
📡 Server running on: http://127.0.0.1:5000
🔑 API Key configured: True
```

## 🎯 Access Your Chatbot

Open your browser and go to:
**http://localhost:3080**

## ✨ Test Your Chatbot

Try these messages:
- "Hello Zara!"
- "Who are you?"
- "Help me write a Python function to calculate fibonacci"
- "I'm feeling stressed today"
- "Explain React hooks in simple terms"

## 🔧 Troubleshooting

### Issue: API Key Not Working
**Error**: "I'm not fully configured yet..."

**Solution**:
1. Make sure the `.env` file is in the `backend/` folder
2. Check there are no extra spaces around the `=` sign
3. Restart the Flask server after adding the key

### Issue: CORS Error in Browser
**Error**: "Access to fetch... has been blocked by CORS policy"

**Solution**: The backend already has CORS enabled. If you still see this:
1. Check both servers are running
2. Make sure frontend is calling `http://127.0.0.1:5000/api/chat`

### Issue: Port Already in Use
**Error**: "Port 3080 is in use"

**Solution**:
```bash
# Kill the process on port 3080
netstat -ano | findstr :3080
taskkill /F /PID <PID>

# Or use a different port
npx next dev -p 3090
```

## 📁 Project Structure

```
Zara-Chatbot/
├── backend/
│   ├── app.py           # Flask server with Cerebras AI
│   ├── .env            # 🔑 Your API key goes here!
│   └── requirements.txt
│
└── zara-chatbot/
    ├── src/
    │   └── app/
    │       ├── page.tsx     # Chat UI
    │       └── globals.css  # Styles
    └── package.json
```

## 🎨 What You'll See

- **Dark Theme**: Modern ChatGPT-style interface
- **Sidebar**: Chat history and profile
- **Real-time Typing**: Animated indicators
- **Smart Responses**: Powered by Cerebras AI

## 📝 Current Configuration

- **AI Model**: Llama-3.1-8b (via Cerebras)
- **System Prompt**: Zara personality (emotionally intelligent)
- **Context Window**: Last 10 messages
- **Response Style**: Friendly, warm, professional

## 🚦 Next Steps

1. **Add API Key** (if not done): See Step 2 above
2. **Test the Chat**: Open http://localhost:3080
3. **Customize Zara**: Edit `backend/app.py` to modify personality
4. **Add Features**: 
   - User authentication
   - Chat history database
   - Voice input/output
   - Image generation

## 💡 Tips

- **Conversations are not saved** (currently) - they reset on page refresh
- **API costs**: Cerebras API offers a generous free tier for developers
- **Security**: Never commit `.env` file to Git (already in `.gitignore`)

---

**Created by Sri** | Powered by Cerebras AI 🚀
