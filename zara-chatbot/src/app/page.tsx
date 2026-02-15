'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader2, Settings, Paperclip, X, FileText, PanelLeftOpen, PanelLeftClose, MessageSquare } from 'lucide-react';
import WorkspaceSidebar from '@/components/layout/WorkspaceSidebar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    fileContent?: string;
    fileType?: string;
}

interface Chat {
    id: number;
    title: string;
    created_at: string;
}

interface UserData {
    username: string;
    email: string;
}

export default function Home() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hello! I'm Zara ✨. How can I help you today? 😊" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);
    const [chats, setChats] = useState<Chat[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [chatId, setChatId] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<{ name: string, type: string, base64: string } | null>(null);

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const shouldAutoScrollRef = useRef(true);
    const userHasScrolledRef = useRef(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('zara_theme') as 'dark' | 'light';
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle('light', savedTheme === 'light');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('zara_theme', newTheme);
        document.documentElement.classList.toggle('light', newTheme === 'light');
    };

    useEffect(() => {
        const token = localStorage.getItem('zara_token');
        if (!token) {
            router.push('/auth');
            return;
        }

        const fetchData = async () => {
            try {
                if (token === 'null' || token === 'undefined') {
                    throw new Error('Invalid token');
                }

                const userRes = await fetch('https://zara-ai-iphl.onrender.com/api/user/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!userRes.ok) {
                    const errorText = await userRes.text().catch(() => "Unknown error");
                    console.error('Auth check failed:', userRes.status, errorText);
                    throw new Error('Unauthorized');
                }

                const userData = await userRes.json();
                setUser(userData);
                fetchChats(token);
            } catch (err) {
                console.error('Session validation failed:', err);
                localStorage.removeItem('zara_token');
                localStorage.removeItem('zara_user');
                router.push('/auth');
            }
        };
        fetchData();
    }, [router]);

    const fetchChats = async (token: string) => {
        try {
            const chatsRes = await fetch('https://zara-ai-iphl.onrender.com/api/chats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (chatsRes.ok) {
                const chatsData = await chatsRes.json();
                setChats(chatsData);
                if (!chatId) {
                    createNewChat(token);
                }
            }
        } catch (error) { console.error(error); }
    };

    const fetchMessages = async (id: number, token?: string) => {
        const authToken = token || localStorage.getItem('zara_token');
        if (!authToken) return;
        try {
            const res = await fetch(`https://zara-ai-iphl.onrender.com/api/chats/${id}/messages`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            if (res.ok) {
                const data = await res.json();
                setMessages(data.length > 0 ? data : [{ role: 'assistant', content: "Hello! I'm Zara ✨. How can I help you today? 😊" }]);
            }
        } catch (error) { console.error(error); }
    };

    const loadChat = (id: number) => {
        setChatId(id);
        fetchMessages(id);
    };

    const createNewChat = async (token?: string) => {
        const authToken = token || localStorage.getItem('zara_token');
        if (!authToken) return;
        try {
            const res = await fetch('https://zara-ai-iphl.onrender.com/api/chats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
                body: JSON.stringify({ title: 'New Chat' })
            });
            if (res.ok) {
                const newChat = await res.json();
                setChatId(newChat.id);
                setChats(prev => [newChat, ...prev]);
                setMessages([{ role: 'assistant', content: "Hello! I'm Zara ✨. How can I help you today? 😊" }]);
            }
        } catch (error) { console.error(error); }
    };

    const handleDeleteChat = async (id: number) => {
        const token = localStorage.getItem('zara_token');
        try {
            const res = await fetch(`https://zara-ai-iphl.onrender.com/api/chats/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                setChats(prev => prev.filter(c => c.id !== id));
                if (chatId === id) {
                    setChatId(null);
                    setMessages([{ role: 'assistant', content: "Hello! I'm Zara ✨. How can I help you today? 😊" }]);
                }
            }
        } catch (error) { console.error(error); }
    };

    const handleRenameChat = async (id: number, newTitle: string) => {
        const token = localStorage.getItem('zara_token');
        try {
            const res = await fetch(`https://zara-ai-iphl.onrender.com/api/chats/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ title: newTitle })
            });
            if (res.ok) {
                setChats(prev => prev.map(c => c.id === id ? { ...c, title: newTitle } : c));
            }
        } catch (error) { console.error(error); }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];
            setSelectedFile({ name: file.name, type: file.type, base64: base64 });
        };
        reader.readAsDataURL(file);
    };

    const handleSendMessage = async () => {
        if ((!input.trim() && !selectedFile) || isLoading) return;

        const userMsgContent = input;
        const userFileData = selectedFile;
        const userMessage: Message = {
            role: 'user',
            content: userMsgContent,
            fileContent: userFileData?.base64,
            fileType: userFileData?.type
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setSelectedFile(null);
        setIsLoading(true);
        shouldAutoScrollRef.current = true;
        userHasScrolledRef.current = false;

        try {
            const token = localStorage.getItem('zara_token');
            const headers: Record<string, string> = { 'Content-Type': 'application/json' };
            if (token && token !== 'null' && token !== 'undefined') {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const res = await fetch('https://zara-ai-iphl.onrender.com/api/chat', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    chatId: chatId,
                    fileData: userFileData
                })
            });
            const data = await res.json();
            if (!res.ok) {
                console.error('Chat API Error:', res.status, data);
                if (res.status === 401 || res.status === 422) {
                    localStorage.removeItem('zara_token');
                    localStorage.removeItem('zara_user');
                    router.push('/auth');
                }
                throw new Error(data.error || data.msg || data.content || 'Failed to fetch response');
            }

            if (chats.find(c => c.id === chatId)?.title === 'New Chat') {
                if (token) fetchChats(token);
            }
            setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to the server. Please check your connection or AI quota. ⚠️" }]);
        } finally { setIsLoading(false); }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

            if (distanceFromBottom > 200) {
                shouldAutoScrollRef.current = false;
                userHasScrolledRef.current = true;
            } else {
                shouldAutoScrollRef.current = true;
                userHasScrolledRef.current = false;
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (messages.length <= 1) return;

        // Auto-scroll if we're allowed (user hasn't manually scrolled up)
        if (shouldAutoScrollRef.current && !userHasScrolledRef.current) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [messages]);

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const settingsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setIsSettingsOpen(false);
            }
        };
        if (isSettingsOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSettingsOpen]);

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            // Only close if clicking outside the sidebar
            if (sidebarRef.current && !sidebarRef.current.contains(target)) {
                if (!isSidebarCollapsed) {
                    setIsSidebarCollapsed(true);
                }
            }
        };

        // Only add listener when sidebar is expanded
        if (!isSidebarCollapsed) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSidebarCollapsed]);

    if (!user) {
        return (
            <div className={styles.loadingOverlay}>
                <Loader2 className={styles.spinner} />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Floating sidebar toggle button */}
            <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className={clsx(
                    styles.floatingToggle,
                    isSidebarCollapsed && styles.floatingToggleCollapsed
                )}
                title={isSidebarCollapsed ? "Open Sidebar" : "Close Sidebar"}
            >
                {isSidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>

            <div
                ref={sidebarRef}
                className={clsx(
                    styles.sidebarWrapper,
                    isSidebarCollapsed && styles.sidebarWrapperCollapsed
                )}
            >
                <WorkspaceSidebar
                    chats={chats}
                    activeChatId={chatId}
                    loadChat={loadChat}
                    startNewChat={() => createNewChat()}
                    onDeleteChat={handleDeleteChat}
                    onRenameChat={handleRenameChat}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    user={user}
                    onLogout={() => { localStorage.removeItem('zara_token'); router.push('/auth'); }}
                    isCollapsed={isSidebarCollapsed}
                    onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />
            </div>

            <main className={clsx(
                styles.mainSection,
                isSidebarCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded
            )}>
                <header className={styles.header}>
                    <div className={styles.headerLeft}>

                        <div className={styles.logoWrapper}>
                            <div className={styles.logoIcon}>
                                <img src="/zara-icon.png" alt="Zara Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <h1 className={styles.logoText}>Zara</h1>
                        </div>
                    </div>
                    <div className={styles.headerRight}>
                        <div className="relative" ref={settingsRef}>
                            <button
                                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                className={styles.iconButton}
                                title="Settings"
                            >
                                <Settings size={20} />
                            </button>

                            {isSettingsOpen && (
                                <div className={styles.settingsOverlay}>
                                    <h3 className={styles.settingsTitle}>Settings</h3>
                                    <div className={styles.settingsGroup}>
                                        <div className={styles.settingItem}>
                                            <div className={styles.settingLabel}>
                                                {theme === 'dark' ? <Bot size={18} /> : <User size={18} />}
                                                <span>Theme Mode</span>
                                            </div>
                                            <div
                                                className={clsx(
                                                    styles.themeToggle,
                                                    theme === 'dark' && styles.themeToggleActive
                                                )}
                                                onClick={toggleTheme}
                                            >
                                                <div className={clsx(
                                                    styles.toggleCircle,
                                                    theme === 'dark' && styles.toggleCircleActive
                                                )} />
                                            </div>
                                        </div>
                                        <div className={styles.settingItem}>
                                            <div className={styles.settingLabel}>
                                                <MessageSquare size={18} />
                                                <span>Animations</span>
                                            </div>
                                            <div className={clsx(styles.themeToggle, styles.themeToggleActive)}>
                                                <div className={clsx(styles.toggleCircle, styles.toggleCircleActive)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div ref={messagesContainerRef} className={styles.messagesArea}>
                    <div className={styles.messagesContainer}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={clsx(
                                styles.messageRow,
                                msg.role === 'user' ? styles.userRow : styles.assistantRow
                            )}>
                                {msg.role === 'assistant' && (
                                    <div className={clsx(styles.avatar, styles.assistantAvatar)} style={{ padding: 0, overflow: 'hidden' }}>
                                        <img src="/zara-icon.png" alt="Zara" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                )}

                                <div className={clsx(
                                    styles.messageContentWrapper,
                                    msg.role === 'user' ? styles.userContentWrapper : styles.assistantContentWrapper
                                )}>
                                    <span className={styles.senderName}>
                                        {msg.role === 'assistant' ? 'Zara' : 'You'}
                                    </span>

                                    <div className={clsx(
                                        styles.messageBubble,
                                        msg.role === 'user' ? styles.userBubble : styles.assistantBubble
                                    )}>
                                        {msg.role === 'assistant' ? (
                                            <div className="prose prose-invert max-w-none">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {msg.fileContent && (
                                                    <div
                                                        className={styles.fileBubblePreview}
                                                        onClick={() => setLightboxImage(`data:${msg.fileType};base64,${msg.fileContent}`)}
                                                    >
                                                        {msg.fileType?.startsWith('image/') ? (
                                                            <img src={`data:${msg.fileType};base64,${msg.fileContent}`} alt="Uploaded content" />
                                                        ) : (
                                                            <div className="p-4 flex items-center gap-3 text-sm h-full w-full justify-center">
                                                                <FileText className="w-8 h-8 text-primary" />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                <p className="whitespace-pre-wrap">{msg.content}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {msg.role === 'user' && (
                                    <div className={clsx(styles.avatar, styles.userAvatar)}>
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className={clsx(styles.messageRow, styles.assistantRow)}>
                                <div className={clsx(styles.avatar, styles.assistantAvatar)} style={{ padding: 0, overflow: 'hidden' }}>
                                    <img src="/zara-icon.png" alt="Zara" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className={styles.typingIndicator}>
                                    <span className={clsx(styles.dot, styles.dot1)}></span>
                                    <span className={clsx(styles.dot, styles.dot2)}></span>
                                    <span className={styles.dot}></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <div className={styles.inputWrapper}>
                    <div className={styles.inputContainer}>
                        {selectedFile && (
                            <div className={styles.filePreview}>
                                <div className={styles.filePreviewItem}>
                                    <div className={styles.fileThumbnail}>
                                        {selectedFile.type.startsWith('image/') ? (
                                            <img
                                                src={`data:${selectedFile.type};base64,${selectedFile.base64}`}
                                                alt="Preview"
                                            />
                                        ) : (
                                            <FileText className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setSelectedFile(null)}
                                        className={styles.removeFileBtn}
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className={styles.inputFieldWrapper}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className={styles.hidden}
                                accept="image/*,application/pdf"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className={styles.actionButton}
                                title="Upload file"
                            >
                                <Paperclip size={20} />
                            </button>

                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Send a message..."
                                className={styles.textArea}
                                rows={1}
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = 'auto';
                                    target.style.height = `${target.scrollHeight}px`;
                                }}
                            />

                            <button
                                onClick={handleSendMessage}
                                disabled={(!input.trim() && !selectedFile) || isLoading}
                                className={styles.actionButton}
                            >
                                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                            </button>
                        </div>
                        <div className={styles.disclaimer}>
                            <p>Zara can make mistakes. Consider checking important information.</p>
                        </div>
                    </div>
                </div>
            </main>

            {lightboxImage && (
                <div className={styles.lightbox} onClick={() => setLightboxImage(null)}>
                    <button onClick={() => setLightboxImage(null)} className={styles.lightboxClose}>
                        <X size={24} />
                    </button>
                    <img
                        src={lightboxImage}
                        alt="Full view"
                        className={styles.lightboxImage}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
