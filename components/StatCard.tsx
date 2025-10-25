
import React from 'react';
import type { Stat } from '../types';

export const StatCard: React.FC<Stat> = ({ title, value, color }) => {
    const valueColorClass = color === 'warning' ? 'text-warning' : color === 'danger' ? 'text-danger' : 'text-text-light-primary dark:text-dark-primary';

    return (
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-4 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
            <p className="text-text-light-secondary dark:text-dark-secondary text-sm font-medium leading-normal">{title}</p>
            <p className={`${valueColorClass} tracking-tight text-3xl font-bold leading-tight`}>{value}</p>
        </div>
    );
};
