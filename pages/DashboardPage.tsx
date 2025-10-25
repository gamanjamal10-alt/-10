import React from 'react';
import { StatCard } from '../components/StatCard';
import { KpiCard } from '../components/KpiCard';
import { TaskList } from '../components/TaskList';
import { AlertList } from '../components/AlertList';
import { STATS_DATA, KPI_DATA, TASKS_DATA, ALERTS_DATA } from '../constants';
import type { Task, Alert } from '../types';

interface DashboardPageProps {
    onTaskClick: (task: Task) => void;
    onAlertClick: (alert: Alert) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onTaskClick, onAlertClick }) => {
    return (
        <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STATS_DATA.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            <KpiCard kpiData={KPI_DATA} />

            <TaskList 
                tasks={TASKS_DATA.slice(0, 3)} 
                onTaskClick={onTaskClick}
                onViewAllClick={() => console.log('View all tasks clicked')}
            />

            <AlertList 
                alerts={ALERTS_DATA} 
                onAlertClick={onAlertClick}
                onViewAllClick={() => console.log('View all alerts clicked')}
            />
        </div>
    );
};
