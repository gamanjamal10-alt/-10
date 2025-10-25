import React from 'react';

interface TopAppBarProps {
    onAssistantClick: () => void;
    onThemeToggle: () => void;
    isDarkMode: boolean;
    pageTitle: string;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ onAssistantClick, onThemeToggle, isDarkMode, pageTitle }) => {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark flex items-center justify-between px-4 z-20">
            <div className="flex items-center gap-2">
                {/* Assuming a logo.png is available in the public folder */}
                <img src="/logo.png" alt="Farm Logo" className="h-8 w-8" onError={(e) => e.currentTarget.style.display = 'none'} />
                <h1 className="text-xl font-bold text-text-light-primary dark:text-dark-primary">{pageTitle}</h1>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={onAssistantClick}
                    className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors"
                    aria-label="المساعد الذكي"
                >
                    <span className="material-symbols-outlined">smart_toy</span>
                </button>
                <button
                    onClick={onThemeToggle}
                    className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors"
                    aria-label="تبديل الوضع"
                >
                    <span className="material-symbols-outlined">
                        {isDarkMode ? 'light_mode' : 'dark_mode'}
                    </span>
                </button>
            </div>
        </header>
    );
};
