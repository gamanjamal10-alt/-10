import React from 'react';

interface TopAppBarProps {
    onAssistantClick: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ onAssistantClick }) => {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark flex items-center justify-between px-4 z-30">
            <div className="flex items-center gap-2">
                 <div className="flex items-center justify-center w-8 h-8 bg-primary/20 text-primary rounded-lg">
                    <span className="material-symbols-outlined">
                        eco
                    </span>
                 </div>
                <h1 className="text-xl font-bold text-text-light-primary dark:text-dark-primary">حضيرتي</h1>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={onAssistantClick} className="flex items-center justify-center w-10 h-10 text-text-light-secondary dark:text-dark-secondary hover:bg-primary/10 hover:text-primary rounded-full transition-colors" aria-label="المساعد الذكي">
                    <span className="material-symbols-outlined">auto_awesome</span>
                </button>
            </div>
        </header>
    );
};