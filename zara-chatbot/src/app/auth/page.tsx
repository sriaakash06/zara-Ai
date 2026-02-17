"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Lock, User, ArrowRight, Loader2, Rocket, RotateCcw, Eye, EyeOff, Check, X } from 'lucide-react';
import { setAuthToken, setUser, API_URL } from '@/lib/auth';
import styles from './auth.module.css';
import clsx from 'clsx';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!isLogin && password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        const endpoint = isLogin ? '/login' : '/register';
        const username = `${firstName} ${lastName}`.trim();
        const body = isLogin
            ? { email, password }
            : { username: username || 'User', email, password };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.error === 'Email already registered') {
                    setError('Account already exists. Switched to Login.');
                    setIsLogin(true);
                    return;
                }
                throw new Error(data.error || 'Something went wrong');
            }

            setAuthToken(data.token);
            setUser(data.user);
            router.push('/');
        } catch (err: any) {
            console.group('%c🚨 Zara Auth Error', 'background: #222; color: #ff4444; font-weight: bold; padding: 4px;');
            console.error('Message:', err.message);
            console.error('Stack:', err.stack);
            console.groupEnd();
            setError(err.message === 'Failed to fetch' ? 'Unable to connect to server. Please try again later.' : err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authBody}>
            <div className={styles.waveContainer}>
                <div className={clsx(styles.wave, styles.wave1)}></div>
                <div className={clsx(styles.wave, styles.wave2)}></div>
            </div>

            <div className={styles.loginCard}>
                <div className={styles.cardHeader}>
                    <div className={styles.logoContainer}>
                        <img src="/zara-icon.png" alt="Zara" style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
                    </div>
                    <h2 className={styles.cardTitle}>{isLogin ? 'Welcome Back' : 'Join Zara'}</h2>
                    <p className={styles.cardSubtitle}>{isLogin ? 'Sign in to access your AI' : 'Create an account to get started'}</p>
                </div>

                {error && <div className={styles.errorBox}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid grid-cols-2 gap-4"
                            >
                                <div className={styles.inputContainer}>
                                    <div className={styles.inputBg}></div>
                                    <input
                                        type="text"
                                        placeholder=" "
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                    <label>First Name</label>
                                </div>
                                <div className={styles.inputContainer}>
                                    <div className={styles.inputBg}></div>
                                    <input
                                        type="text"
                                        placeholder=" "
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                    <label>Last Name</label>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className={styles.inputContainer}>
                        <div className={styles.inputBg}></div>
                        <input
                            type="email"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Email Address</label>
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.inputBg}></div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>Password</label>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.passwordToggle}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {!isLogin && (
                        <div className={styles.inputContainer}>
                            <div className={styles.inputBg}></div>
                            <input
                                type="password"
                                placeholder=" "
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <label>Confirm Password</label>
                        </div>
                    )}

                    <button className={clsx(styles.gradientButton, "flex items-center justify-center gap-2")} disabled={isLoading}>
                        {isLoading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                <div className={styles.authFooter}>
                    <p className={styles.footerText}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className={styles.switchButton}
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
