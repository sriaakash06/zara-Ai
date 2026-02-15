import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TypingEffectProps {
    text: string;
    onComplete: () => void;
}

export default function TypingEffect({ text, onComplete }: TypingEffectProps) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setDisplayedText(text.slice(0, index + 1));
            index++;
            if (index >= text.length) {
                clearInterval(intervalId);
                onComplete();
            }
        }, 15); // Speed: 15ms per char
        return () => clearInterval(intervalId);
    }, [text, onComplete]);

    return <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayedText}</ReactMarkdown>;
}
