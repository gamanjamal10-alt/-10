
import React from 'react';
import type { Page } from '../types';

interface NavItemProps {
    label: string;
    icon: string;
    isActive: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
            isActive ? 'text-primary' : 'text-text-light-secondary dark:text-dark-secondary'
        }`}
    >
        <span className="material-symbols-outlined">{icon}</span>
        <span className="text-xs font-medium">{label}</span>
    </button>
);

interface BottomNavBarProps {
    activePage: Page;
    onNavigate: (page: Page) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activePage, onNavigate }) => {
    const navItems: { page: Page; label: string; icon: string }[] = [
        { page: 'dashboard', label: 'الرئيسية', icon: 'dashboard' },
        { page: 'herd', label: 'القطيع', icon: 'pets' },
        { page: 'tasks', label: 'المهام', icon: 'task_alt' },
        { page: 'reports', label: 'التقارير', icon: 'analytics' },
        { page: 'shepherds', label: 'الرعاة', icon: 'group' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark flex items-center justify-around z-30">
            {navItems.map(item => (
                <NavItem
                    key={item.page}
                    label={item.label}
                    icon={item.icon}
                    isActive={activePage === item.page}
                    onClick={() => onNavigate(item.page)}
                />
            ))}
        </nav>
    );
};
