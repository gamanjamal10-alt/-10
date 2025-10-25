import React from 'react';

const navItems = [
    { name: 'لوحة القيادة', icon: 'dashboard' },
    { name: 'القطيع', icon: 'pets' },
    { name: 'المهام', icon: 'task_alt' },
    { name: 'التقارير', icon: 'analytics' },
];

interface NavItemProps {
    name: string;
    icon: string;
    isActive: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ name, icon, isActive, onClick }) => {
    const activeClass = isActive ? 'text-primary' : 'text-text-light-secondary dark:text-dark-secondary';
    return (
        <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} className="flex flex-col items-center gap-1 w-20 transition-colors group">
            <div className={`relative flex items-center justify-center h-8 w-16 rounded-full transition-colors ${isActive ? 'bg-primary/10' : ''}`}>
                 <span className={`material-symbols-outlined transition-colors ${activeClass}`}>{icon}</span>
            </div>
            <span className={`text-xs font-medium transition-colors ${activeClass}`}>{name}</span>
        </a>
    );
};

interface BottomNavBarProps {
    activeItem: string;
    onNavigate: (itemName: string) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeItem, onNavigate }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm border-t border-border-light dark:border-border-dark flex justify-around items-center z-30">
            {navItems.map(item => (
                <NavItem
                    key={item.name}
                    name={item.name}
                    icon={item.icon}
                    isActive={activeItem === item.name}
                    onClick={() => onNavigate(item.name)}
                />
            ))}
        </div>
    );
};