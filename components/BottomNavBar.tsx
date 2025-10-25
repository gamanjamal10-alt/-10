import React, { useState } from 'react';

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
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NavItem: React.FC<NavItemProps> = ({ name, icon, isActive, onClick }) => {
    const colorClass = isActive ? 'text-primary' : 'text-text-light-secondary dark:text-dark-secondary';
    return (
        <a href="#" onClick={onClick} className={`flex flex-col items-center gap-1 ${colorClass} transition-colors`}>
            <span className="material-symbols-outlined">{icon}</span>
            <span className="text-xs font-medium">{name}</span>
        </a>
    );
};

export const BottomNavBar: React.FC = () => {
    const [activeItem, setActiveItem] = useState('لوحة القيادة');

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, name: string) => {
        e.preventDefault();
        setActiveItem(name);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark flex justify-around items-center z-10">
            {navItems.map(item => (
                <NavItem
                    key={item.name}
                    name={item.name}
                    icon={item.icon}
                    isActive={activeItem === item.name}
                    onClick={(e) => handleNavClick(e, item.name)}
                />
            ))}
        </div>
    );
};