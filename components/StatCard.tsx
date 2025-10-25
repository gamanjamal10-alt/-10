import React from 'react';
import type { Stat } from '../types';

interface StatCardProps extends Stat {
    onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, color, icon, onClick }) => {
    const valueColorClass = color === 'warning' ? 'text-warning' : color === 'danger' ? 'text-danger' : 'text-text-light-primary dark:text-dark-primary';
    const isClickable = !!onClick;

    return (
        <div 
            onClick={onClick}
            className={`flex flex-col gap-4 rounded-xl p-4 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark ${isClickable ? 'cursor-pointer hover:border-primary/50 transition-all' : ''}`}
        >
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-lg">
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div>
                <p className="text-text-light-secondary dark:text-dark-secondary text-sm font-medium leading-normal">{title}</p>
                <p className={`${valueColorClass} tracking-tight text-2xl font-bold leading-tight`}>{value}</p>
            </div>
        </div>
    );
};
