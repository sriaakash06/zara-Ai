# Zara AI Chatbot

A modern, full-stack AI chatbot application with a **Flask (Python) backend** and **Next.js (React) frontend**.

## 🏗️ Architecture

```
Zara-Chatbot/
├── backend/                 # Flask API Server (Python)
│   ├── app.py              # Main Flask application
│   └── requirements.txt    # Python dependencies
│
└── zara-chatbot/           # Next.js Frontend (React)
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx    # Main chat UI
    │   │   ├── layout.tsx  # Root layout
    │   │   └── globals.css # Global styles
    │   └── lib/
    │       └── zara.ts     # Zara system prompt
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- **Python 3.10+** (for backend)
- **Node.js 18+** (for frontend)
- **npm** or **yarn**

### Installation & Running

You need to run **TWO servers** simultaneously:

#### Terminal 1: Python Backend (Port 5000)
```bash
cd backend
pip install -r requirements.txt
python app.py
```

You should see:
```
* Running on http://127.0.0.1:5000
```

#### Terminal 2: React Frontend (Port 3080)
```bash
cd zara-chatbot
npm install
npx next dev -p 3080
```

You should see:
```
✓ Ready on http://localhost:3080
```

### Access the Application
Open your browser and navigate to:
```
http://localhost:3080
```

## 🎨 Features

### UI/UX
- **Dark Mode Design**: Professional ChatGPT-style interface
- **Glassmorphism Effects**: Modern translucent UI elements
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Layout**: Works on desktop and mobile
- **Sidebar Navigation**: Chat history and user profile
- **Typing Indicators**: Real-time feedback during responses

### Backend
- **Flask REST API**: Handles chat requests at `/api/chat`
- **CORS Enabled**: Allows frontend-backend communication
- **Zara Persona**: Emotionally intelligent AI assistant logic
- **Extensible**: Ready to integrate with OpenAI/Gemini APIs

### Frontend
- **Next.js 14**: App Router with TypeScript
- **Tailwind CSS**: Utility-first styling
- **Lucide Icons**: Clean, modern iconography
- **Real-time Chat**: Async message handling

## 🧠 Zara Persona

Zara is designed to be:
- **Emotionally Aware**: Understands user sentiment
- **Friendly & Professional**: Warm but competent
- **Helpful**: Assists with coding, career advice, and general questions
- **Created by Sri**: Custom AI assistant identity

## 🔧 Configuration

### Change Frontend Port
Edit `zara-chatbot/package.json`:
```json
"scripts": {
  "dev": "next dev -p 3080"
}
```

### Change Backend Port
Edit `backend/app.py`:
```python
app.run(debug=True, port=5000)
```

And update the frontend API URL in `zara-chatbot/src/app/page.tsx`:
```typescript
const response = await fetch('http://127.0.0.1:5000/api/chat', {
```

## 🔌 Integrating Real AI (OpenAI/Gemini)

Currently, the backend uses **rule-based logic** for demo purposes. To integrate a real LLM:

### Option 1: OpenAI
```python
# backend/app.py
import openai

openai.api_key = "your-api-key"

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": ZARA_SYSTEM_PROMPT},
        *messages
    ]
)
response_text = response.choices[0].message.content
```

### Option 2: Google Gemini
```python
# backend/app.py
import google.generativeai as genai

genai.configure(api_key="your-api-key")
model = genai.GenerativeModel('gemini-pro')

response = model.generate_content(last_message)
response_text = response.text
```

## 📝 Current Status

✅ **Working:**
- Flask backend running on port 5000
- Next.js frontend running on port 3080
- Chat UI with dark mode design
- Message sending/receiving
- Typing indicators
- Responsive layout

⚠️ **Known Issues:**
- Port 3000 may be occupied (use 3080 instead)
- Browser automation tools unavailable in current environment
- Currently using mock AI responses (not connected to real LLM)

## 🎯 Next Steps

1. **Test the Application**: Open http://localhost:3080 in your browser
2. **Send Messages**: Try "Hello", "Who are you?", "Help me with Java code"
3. **Integrate Real AI**: Add OpenAI or Gemini API key
4. **Add Database**: Store chat history with SQLite/PostgreSQL
5. **User Authentication**: Add login system with JWT
6. **Deploy**: Host on Vercel (frontend) + Railway/Render (backend)

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /F /PID <PID>

# Use alternative port
npx next dev -p 3080
```

### Backend Not Responding
- Check if Flask is running: `http://127.0.0.1:5000/api/chat`
- Verify CORS is enabled in `app.py`
- Check browser console for CORS errors

### Frontend Build Errors
```bash
cd zara-chatbot
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 📚 Tech Stack

**Frontend:**
- Next.js 16.1.6
- React 19.2.3
- TypeScript 5.9.3
- Tailwind CSS 4.1.18
- Framer Motion 12.33.0
- Lucide React 0.563.0

**Backend:**
- Flask 3.x
- Flask-CORS
- Python 3.10+

## 👨‍💻 Created By

**Sri** - Creator of Zara AI Assistant

## 📄 License

This project is for personal/educational use.
