import React from 'react';

interface TopAppBarProps {
    onNotificationsClick: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ onNotificationsClick }) => {
    return (
        <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-border-light dark:border-border-dark">
            <div className="flex size-12 shrink-0 items-center">
                <div 
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCeNmu8d-jx0SA8QL_AFbefNHobtcN7VyX7W0T4rvoFI4UYXDMu6WMr4uBvSY1qYyKbbAIzglid-8FA_J_InajMkAQze7s-dpRLDI_f3bZrqoJCSYmFAZuZFZq5MWRkb-ksWTiEfiKfAj6mlS3fLEllyY4aqv5Q-_DAJ4pePOxxoEaE-oJDRXorCRNUYt2BYe3fUtLBewhFZGDQzS5aQoyVtjt-xJQOQxbvlRtzXcdvYLTWZyqG7nIkl16Bb4e0U8A01Q50MRwcGt4")'}}
                    aria-label="User profile picture"
                ></div>
            </div>
            <h2 className="text-text-light-primary dark:text-dark-primary text-xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center">مزرعة وادي البلوط</h2>
            <div className="flex w-12 items-center justify-end">
                <button onClick={onNotificationsClick} className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 text-text-light-primary dark:text-dark-primary">
                    <span className="material-symbols-outlined text-2xl">notifications</span>
                </button>
            </div>
        </div>
    );
};