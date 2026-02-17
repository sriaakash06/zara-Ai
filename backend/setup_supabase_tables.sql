-- Supabase Table Setup for Zara Chatbot
-- Run this SQL in Supabase SQL Editor

-- Drop existing tables if they have wrong structure
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT, -- Added for sync restoration
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create messages table
CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY,
    user_email TEXT NOT NULL,
    username TEXT, -- Added for sync analytics
    user_message TEXT NOT NULL,
    bot_reply TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_messages_user_email ON messages(user_email);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- Verify tables were created
SELECT 'Tables created successfully!' as status;
