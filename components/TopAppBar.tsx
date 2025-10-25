// FIX: Replaced placeholder content with a full implementation for the TopAppBar component.
import React from 'react';

interface TopAppBarProps {
    title: string;
    onNotificationClick: () => void;
    onSettingsClick: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ title, onNotificationClick, onSettingsClick }) => {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark flex items-center justify-between px-4 z-10">
            <div className="flex items-center gap-2">
                <button onClick={onSettingsClick} className="text-text-light-secondary dark:text-dark-secondary hover:text-text-light-primary dark:hover:text-dark-primary" aria-label="الإعدادات">
                    <span className="material-symbols-outlined">settings</span>
                </button>
            </div>
            <h1 className="text-xl font-bold text-text-light-primary dark:text-dark-primary">{title}</h1>
            <div className="flex items-center gap-2">
                <button onClick={onNotificationClick} className="text-text-light-secondary dark:text-dark-secondary hover:text-text-light-primary dark:hover:text-dark-primary" aria-label="الإشعارات">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
            </div>
        </header>
    );
};
