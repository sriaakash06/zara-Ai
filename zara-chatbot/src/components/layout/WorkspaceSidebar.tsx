"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
    Plus,
    MessageSquare,
    LogOut,
    Edit2,
    Trash2,
    Sparkles,
    PanelLeftClose
} from 'lucide-react';
import clsx from 'clsx';
import styles from './WorkspaceSidebar.module.css';

interface Chat {
    id: number;
    title: string;
    created_at: string;
}

interface WorkspaceSidebarProps {
    chats: Chat[];
    activeChatId: number | null;
    loadChat: (id: number) => void;
    startNewChat: () => void;
    onDeleteChat: (id: number) => void;
    onRenameChat: (id: number, newTitle: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    user: any;
    onLogout: () => void;
    isCollapsed: boolean;
    onToggle: () => void;
}

export default function WorkspaceSidebar({
    chats,
    activeChatId,
    loadChat,
    startNewChat,
    onDeleteChat,
    onRenameChat,
    searchTerm,
    setSearchTerm,
    user,
    onLogout,
    isCollapsed,
    onToggle
}: WorkspaceSidebarProps) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredChats = chats.filter(c =>
        (c.title || 'New Chat').toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (editingId && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingId]);

    const handleStartRename = (e: React.MouseEvent, chat: Chat) => {
        e.stopPropagation();
        setEditingId(chat.id);
        setEditTitle(chat.title);
    };

    const handleSaveRename = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        if (editTitle.trim()) {
            onRenameChat(id, editTitle.trim());
        }
        setEditingId(null);
    };

    const handleBlur = (id: number) => {
        if (editTitle.trim()) {
            onRenameChat(id, editTitle.trim());
        }
        setEditingId(null);
    };

    const handleDelete = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (window.confirm('Delete this conversation?')) {
            onDeleteChat(id);
        }
    };

    return (
        <aside className={clsx(
            styles.sidebar,
            isCollapsed ? styles.collapsed : styles.expanded
        )}>
            <div className={styles.brandingHeader}>
                <div className={styles.brandingContent}>
                    <div className={styles.sparkleIconWrapper} style={{ backgroundColor: 'transparent', padding: 0, overflow: 'hidden' }}>
                        <img src="/zara-icon.png" alt="Zara" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div className={styles.brandingInfo}>
                        <h1>Zara</h1>
                        <span>Assistant</span>
                    </div>
                </div>
            </div>

            <div className={styles.mainContent}>
                <button
                    onClick={startNewChat}
                    className={styles.newChatButton}
                >
                    <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
                    <span>New Chat</span>
                </button>

                <div className={styles.sectionLabel}>
                    <span>Recent</span>
                </div>

                <div className={styles.chatList}>
                    {filteredChats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => editingId !== chat.id && loadChat(chat.id)}
                            className={clsx(
                                styles.chatItem,
                                activeChatId === chat.id && styles.activeChatItem
                            )}
                        >
                            {activeChatId === chat.id && (
                                <div className={styles.activeIndicator} />
                            )}

                            <MessageSquare className={clsx(
                                styles.chatIcon,
                                activeChatId === chat.id && styles.activeChatIcon
                            )} />

                            <div className={styles.chatTitleWrapper}>
                                {editingId === chat.id ? (
                                    <form
                                        onSubmit={(e) => handleSaveRename(e, chat.id)}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <input
                                            ref={inputRef}
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            onBlur={() => handleBlur(chat.id)}
                                            className={styles.editInput}
                                            placeholder="Chat title..."
                                        />
                                    </form>
                                ) : (
                                    <p className={styles.chatTitle}>{chat.title || 'New Chat'}</p>
                                )}
                            </div>

                            {editingId !== chat.id && (
                                <div
                                    className={styles.hoverActions}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        onClick={(e) => handleStartRename(e, chat)}
                                        className={styles.actionBtn}
                                        title="Rename"
                                    >
                                        <Edit2 className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={(e) => handleDelete(e, chat.id)}
                                        className={clsx(styles.actionBtn, styles.deleteBtn)}
                                        title="Delete"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {chats.length === 0 && (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIconWrapper}>
                                <MessageSquare className="w-5 h-5 text-gray-600" />
                            </div>
                            <p>No conversations</p>
                            <p>Start a new chat to begin</p>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.userProfile}>
                    <div className={styles.userAvatarWrapper}>
                        <div className={styles.avatarGradient}>
                            <div className={styles.avatarInner}>
                                {user?.username ? (
                                    <span>{user.username[0].toUpperCase()}</span>
                                ) : (
                                    <span>U</span>
                                )}
                            </div>
                        </div>
                        <div className={styles.onlineIndicator}></div>
                    </div>

                    <div className={styles.userInfo}>
                        <p className={styles.userName}>{user?.username || 'Guest User'}</p>
                        <p className={styles.userPlan}>Free Plan</p>
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); onLogout(); }}
                        className={styles.logoutButton}
                        title="Logout"
                    >
                        <LogOut className="w-4.5 h-4.5" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
