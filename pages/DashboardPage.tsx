import React from 'react';
import { StatCard } from '../components/StatCard';
import { KpiCard } from '../components/KpiCard';
import { TaskList } from '../components/TaskList';
import { AlertList } from '../components/AlertList';
import { STATS_DATA, UPCOMING_TASKS, RECENT_ALERTS, KPI_DATA } from '../constants';
import type { Stat, Task, Alert } from '../types';

interface DashboardPageProps {
    onTaskClick: (task: Task) => void;
    onViewAllTasks: () => void;
    onAlertClick: (alert: Alert) => void;
    onViewAllAlerts: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onTaskClick, onViewAllTasks, onAlertClick, onViewAllAlerts }) => {
    return (
        <>
            {/* Stats */}
            <div className="flex flex-wrap gap-4 p-4">
                {STATS_DATA.map((stat: Stat) => (
                    <StatCard key={stat.title} title={stat.title} value={stat.value} color={stat.color} />
                ))}
            </div>

            {/* Data Visualization Card (KPIs) */}
            <div className="px-4">
                <KpiCard kpiData={KPI_DATA} />
            </div>

            {/* List Cards: Upcoming Tasks & Recent Alerts */}
            <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TaskList tasks={UPCOMING_TASKS} onTaskClick={onTaskClick} onViewAllClick={onViewAllTasks} />
                <AlertList alerts={RECENT_ALERTS} onAlertClick={onAlertClick} onViewAllClick={onViewAllAlerts} />
            </div>
        </>
    );
};
