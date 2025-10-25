import React, { useState } from 'react';

// Components
import { StatCard } from '../components/StatCard';
import { KpiCard } from '../components/KpiCard';
import { TaskList } from '../components/TaskList';
import { AlertList } from '../components/AlertList';
import { Modal } from '../components/Modal';

// Data and Types
import type { Stat, KpiData, Task, Alert } from '../types';

interface DashboardPageProps {
    stats: Stat[];
    kpiData: KpiData;
    tasks: Task[];
    alerts: Alert[];
    onToggleTask: (taskId: number) => void;
    onViewAllTasks: () => void;
    onViewAllAlerts: () => void;
    onStatClick: (stat: Stat) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
    stats,
    kpiData,
    tasks,
    alerts,
    onToggleTask,
    onViewAllTasks,
    onViewAllAlerts,
    onStatClick,
}) => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setIsTaskModalOpen(true);
    };

    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
        setSelectedTask(null);
    };

    // Show only the first 4 upcoming tasks on the dashboard
    const upcomingTasks = tasks.filter(t => !t.completed).slice(0, 4);
    // Show only the first 3 alerts
    const recentAlerts = alerts.slice(0, 3);

    return (
        <div className="p-4 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {stats.map((stat) => (
                    <StatCard 
                        key={stat.title} 
                        {...stat} 
                        onClick={stat.id === 'milk' || stat.id === 'fodder' ? () => onStatClick(stat) : undefined}
                    />
                ))}
            </div>

            {/* KPI Card */}
            <KpiCard kpiData={kpiData} />

            {/* Tasks List */}
            <TaskList
                title="المهام القادمة"
                tasks={upcomingTasks}
                // FIX: Corrected invalid prop name 'onTask-Click' to 'onTaskClick'
                onTaskClick={handleTaskClick}
                onToggleTask={onToggleTask}
                onViewAllClick={onViewAllTasks}
            />

            {/* Alerts List */}
            <AlertList
                title="أحدث التنبيهات"
                alerts={recentAlerts}
                onAlertClick={(alert) => console.log('Alert clicked:', alert)} // Clicks do nothing on the dashboard preview
                onViewAllClick={onViewAllAlerts}
            />

            {/* Task Details Modal */}
            <Modal isOpen={isTaskModalOpen} onClose={closeTaskModal} title="تفاصيل المهمة">
                {selectedTask && (
                    <div className="space-y-4">
                        <div>
                            <p className="mb-2"><strong className="font-semibold">المهمة:</strong> {selectedTask.title}</p>
                            <p className="mb-2"><strong className="font-semibold">الموعد النهائي:</strong> {selectedTask.dueDate}</p>
                            <p className="mb-2"><strong className="font-semibold">الأولوية:</strong> {selectedTask.priority === 'high' ? 'عالية' : 'عادية'}</p>
                             {selectedTask.description && <p><strong className="font-semibold">الوصف:</strong> {selectedTask.description}</p>}
                        </div>
                        <button 
                            onClick={() => {
                                onToggleTask(selectedTask.id);
                                closeTaskModal();
                            }} 
                            className="w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                        >
                            {selectedTask.completed ? 'وضع علامة كغير مكتملة' : 'وضع علامة كمكتملة'}
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};
