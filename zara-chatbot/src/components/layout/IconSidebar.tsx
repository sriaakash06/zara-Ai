import React from 'react';
import {
    MessageSquare,
    Settings,
    Edit3,
    FileText,
    Book,
    Bot,
    LogOut,
    User
} from 'lucide-react';

interface IconSidebarProps {
    onLogout: () => void;
    onNewChat?: () => void;
    user: any;
}

export default function IconSidebar({ onLogout, onNewChat, user }: IconSidebarProps) {
    return (
        <div className="flex flex-col items-center py-6 gap-6 w-[70px] bg-[#050409] border-r border-[#1a1825] shrink-0 h-full z-50 shadow-2xl shadow-black/50">
            {/* Logo / Main Icon */}
            <div className="mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <Bot className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full items-center">
                <SidebarIcon icon={<MessageSquare className="w-5 h-5" />} active tooltip="Chats" />
                <SidebarIcon icon={<Edit3 className="w-5 h-5" />} tooltip="New Chat" onClick={onNewChat} />
                <SidebarIcon icon={<FileText className="w-5 h-5" />} tooltip="Files" />
                <SidebarIcon icon={<Book className="w-5 h-5" />} tooltip="Library" />
            </div>

            <div className="mt-auto flex flex-col gap-6 w-full items-center mb-4">
                <SidebarIcon icon={<Settings className="w-5 h-5" />} tooltip="Settings" />

                <div className="w-full h-[1px] bg-[#1a1825] w-1/2"></div>

                <SidebarIcon
                    icon={<LogOut className="w-5 h-5" />}
                    tooltip="Logout"
                    onClick={onLogout}
                    danger
                />

                <div className="w-9 h-9 rounded-full bg-[#1e1e2e] border border-[#2d2645] flex items-center justify-center text-xs font-bold text-violet-300 hover:border-violet-500 transition-colors cursor-pointer relative overflow-hidden">
                    {user?.username?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
                </div>
            </div>
        </div>
    );
}

function SidebarIcon({ icon, active = false, danger = false, tooltip, onClick }: { icon: React.ReactNode, active?: boolean, danger?: boolean, tooltip: string, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`
                group relative p-3 rounded-xl transition-all duration-300 ease-out
                ${active
                    ? 'bg-violet-500/10 text-violet-400 shadow-[0_0_15px_-3px_rgba(139,92,246,0.3)]'
                    : danger
                        ? 'text-gray-500 hover:text-red-400 hover:bg-red-500/10'
                        : 'text-gray-500 hover:text-gray-200 hover:bg-[#15141f]'}
            `}
        >
            {icon}

            {/* Tooltip */}
            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#1e1e2e] text-gray-300 text-xs font-medium px-2 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none border border-[#2d2645] shadow-xl translate-x-2 group-hover:translate-x-0 transition-transform">
                {tooltip}
            </span>

            {/* Active Indicator */}
            {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-violet-500 rounded-r-full"></div>
            )}
        </button>
    )
}
