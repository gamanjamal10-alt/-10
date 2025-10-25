import React from 'react';
import { StatCard } from '../components/StatCard';
import { KpiCard } from '../components/KpiCard';
import { TaskList } from '../components/TaskList';
import { AlertList } from '../components/AlertList';
import type { Stat, KpiData, Task, Alert, Page } from '../types';

interface DashboardPageProps {
    stats: Stat[];
    kpiData: KpiData;
    tasks: Task[];
    alerts: Alert[];
    onTaskToggle: (taskId: number) => void;
    onNavigate: (page: Page) => void;
    onStatClick: (stat: Stat) => void;
    onTaskClick: (task: Task) => void;
    onAlertClick: (alert: Alert) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
    stats,
    kpiData,
    tasks,
    alerts,
    onTaskToggle,
    onNavigate,
    onStatClick,
    onTaskClick,
    onAlertClick,
}) => {
    return (
        <div className="p-4 space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {stats.map(stat => (
                    <StatCard 
                        key={stat.id || stat.title} 
                        {...stat} 
                        onClick={() => onStatClick(stat)}
                    />
                ))}
            </div>

            {/* KPI Card */}
            <KpiCard kpiData={kpiData} />

            {/* Task List */}
            <TaskList
                title="المهام العاجلة"
                tasks={tasks}
                onTaskClick={onTaskClick}
                onToggleTask={onTaskToggle}
                onViewAllClick={() => onNavigate('tasks')}
            />

            {/* Alert List */}
            <AlertList
                title="أحدث التنبيهات"
                alerts={alerts}
                onAlertClick={onAlertClick}
            />
        </div>
    );
};
