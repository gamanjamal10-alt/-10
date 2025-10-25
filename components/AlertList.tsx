import React from 'react';
import type { Alert } from '../types';

interface AlertListProps {
    alerts: Alert[];
    onAlertClick: (alert: Alert) => void;
    onViewAllClick: () => void;
}

const AlertItem: React.FC<Alert & { onClick: () => void }> = ({ title, time, icon, type, onClick }) => {
    const iconColor = type === 'danger' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning';
    return (
        <div onClick={onClick} className="flex items-center gap-4 p-3 rounded-lg bg-background-light dark:bg-background-dark cursor-pointer">
            <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${iconColor}`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div className="flex-1">
                <p className="font-semibold text-text-light-primary dark:text-dark-primary">{title}</p>
                <p className="text-sm text-text-light-secondary dark:text-dark-secondary">{time}</p>
            </div>
            <span className="material-symbols-outlined text-text-light-secondary dark:text-dark-secondary">chevron_left</span>
        </div>
    );
};

export const AlertList: React.FC<AlertListProps> = ({ alerts, onAlertClick, onViewAllClick }) => {
    return (
        <div className="flex flex-col gap-4 rounded-xl p-4 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
            <div className="flex justify-between items-center">
                <h3 className="text-text-light-primary dark:text-dark-primary text-lg font-bold leading-tight tracking-[-0.015em]">التنبيهات الأخيرة</h3>
                <a className="text-primary text-sm font-medium hover:underline cursor-pointer" onClick={onViewAllClick}>عرض الكل</a>
            </div>
            <div className="flex flex-col gap-3">
                {alerts.map((alert, index) => <AlertItem key={index} {...alert} onClick={() => onAlertClick(alert)} />)}
            </div>
        </div>
    );
};