
import { NextRequest, NextResponse } from 'next/server';
import { ZARA_SYSTEM_PROMPT } from '@/lib/zara';

export const runtime = 'edge'; // Optional: Use edge for faster response if supported

// This is a mock implementation.
// In a real scenario, you would call OpenAI/Anthropic API here.
export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1];
        const userMessage = lastMessage.content;

        // Simulate AI processing delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simple rule-based logic for demo (replace with LLM call)
        let responseText = "I'm Zara, here to help! could you please elaborate?";

        if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
            responseText = "Hello! It's wonderful to meet you. I'm Zara, created by Sri. How are you feeling today?";
        } else if (userMessage.toLowerCase().includes('who are you')) {
            responseText = "I'm Zara, a friendly and intelligent AI assistant created by Sri. I'm here to help you with anything from coding to emotional support.";
        } else if (userMessage.toLowerCase().includes('sri')) {
            responseText = "Sri is my creator! He designed me to be helpful, emotionally aware, and professional.";
        } else if (userMessage.toLowerCase().includes('help')) {
            responseText = "I'd be happy to help! Whether it's a technical coding usage, career advice, or just a chat, I'm here for you. What do you need assistance with?";
        } else if (userMessage.toLowerCase().includes('sad') || userMessage.toLowerCase().includes('frustrated')) {
            responseText = "I'm so sorry to hear you're feeling that way. It's completely normal to have tough days. I'm here to listen if you want to talk about it, or we can focus on something else to help you reset. You're doing great.";
        } else {
            // Fallback generic response that sounds like Zara
            responseText = `That's interesting! I'm listening. Tell me more about "${userMessage.substring(0, 20)}..." or feel free to ask me anything else.`;
        }

        return NextResponse.json({
            role: 'assistant',
            content: responseText
        });

    } catch (error) {
        console.error('Error in chat route:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
