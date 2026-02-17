# Supabase Database Setup & Verification Guide

## 🔍 Current Issue
Your Supabase API key appears to be incomplete or incorrect. The current key is only 46 characters, but a valid Supabase key should be much longer (typically 100+ characters).

## ✅ Steps to Fix

### 1. Get the Correct API Keys

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/qnxzoijsoxwrlzrrwcsv
2. Click on **Settings** (gear icon) in the left sidebar
3. Click on **API** under Project Settings
4. You'll see two important keys:
   - **Project URL**: `https://qnxzoijsoxwrlzrrwcsv.supabase.co` ✅ (This is correct in your .env)
   - **anon/public key**: This is a LONG key (starts with `eyJ...`) - Copy this entire key
   - **service_role key**: This is also a long key (only use if you need admin access)

### 2. Update Your .env File

Replace the `SUPABASE_KEY` in your `.env` file with the **anon public key** (the long one):

```env
SUPABASE_URL=https://qnxzoijsoxwrlzrrwcsv.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFueHpvaWpzb3h3cmx6cnJ3Y3N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2NzI4MDAsImV4cCI6MjAyNDI0ODgwMH0.YOUR_ACTUAL_KEY_HERE
```

### 3. Verify Your Database Tables

Go to: https://supabase.com/dashboard/project/qnxzoijsoxwrlzrrwcsv/editor/17451?schema=public

Check if these tables exist:

#### Required Tables:

1. **`messages` table** - Should have columns:
   - `id` (int8, primary key, auto-increment)
   - `user_email` (text)
   - `username` (text)
   - `user_message` (text)
   - `bot_reply` (text)
   - `created_at` (timestamptz, default: now())

2. **`users` table** - Should have columns:
   - `id` (int8, primary key, auto-increment)
   - `username` (text, unique)
   - `email` (text, unique)
   - `password_hash` (text)
   - `created_at` (timestamptz, default: now())

### 4. Create Tables (If They Don't Exist)

If the tables don't exist, run this SQL in the Supabase SQL Editor:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id BIGSERIAL PRIMARY KEY,
    user_email TEXT NOT NULL,
    username TEXT,
    user_message TEXT NOT NULL,
    bot_reply TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_user_email ON messages(user_email);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
```

### 5. Test the Connection

After updating the `.env` file, run:

```bash
python test_db_connection.py
```

You should see:
- ✅ Supabase client created successfully!
- ✅ Messages table exists!
- ✅ Users table exists!
- ✅ Insert successful!

## 🔐 Security Note

- **anon/public key**: Safe to use in frontend and backend for user-level operations
- **service_role key**: Only use in backend, has admin privileges (can bypass Row Level Security)

For your chatbot, the **anon public key** is sufficient.

## 📊 Checking if Data is Being Saved

After fixing the API key, you can verify data is being saved by:

1. **In Supabase Dashboard**:
   - Go to Table Editor: https://supabase.com/dashboard/project/qnxzoijsoxwrlzrrwcsv/editor/17451
   - Select the `messages` table
   - You should see all chat messages stored there

2. **Using the test script**:
   ```bash
   python test_db_connection.py
   ```

3. **Check in your app**:
   - Send a message in your chatbot
   - Check the backend terminal - you should see: `"Saved to Supabase for user: <email>"`
   - Refresh the Supabase table editor to see the new message

## 🐛 Common Issues

1. **"Invalid API key"** → Copy the full anon key from Supabase dashboard
2. **"relation does not exist"** → Create the tables using the SQL above
3. **"permission denied"** → Check Row Level Security (RLS) policies in Supabase

## 📝 Current Status

Based on your code in `app.py`:
- ✅ Supabase integration code is present (lines 456-470)
- ✅ Messages are being synced after each chat response
- ✅ User registration syncs to Supabase (lines 178-187)
- ❌ API key needs to be updated with the correct value

Once you update the API key, everything should work automatically! 🎉
