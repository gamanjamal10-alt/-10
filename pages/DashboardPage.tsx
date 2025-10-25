import React, { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { KpiCard } from '../components/KpiCard';
import { TaskList } from '../components/TaskList';
import { AlertList } from '../components/AlertList';
import { Modal } from '../components/Modal';
import type { Stat, KpiData, Task, Alert } from '../types';

interface DashboardPageProps {
    stats: Stat[];
    kpiData: KpiData;
    tasks: Task[];
    alerts: Alert[];
    onToggleTask: (taskId: number) => void;
    onViewAllTasks: () => void;
    onViewAllAlerts: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ stats, kpiData, tasks, alerts, onToggleTask, onViewAllTasks, onViewAllAlerts }) => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

    const upcomingTasks = tasks.filter(t => !t.completed).slice(0, 4);

    const handleTaskClick = (task: Task) => setSelectedTask(task);
    const handleAlertClick = (alert: Alert) => setSelectedAlert(alert);
    const closeModal = () => {
        setSelectedTask(null);
        setSelectedAlert(null);
    };

    return (
        <div className="p-4 space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
            </div>

            {/* KPIs */}
            <KpiCard kpiData={kpiData} />

            {/* Tasks & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TaskList
                    title="المهام القادمة"
                    tasks={upcomingTasks}
                    onTaskClick={handleTaskClick}
                    onToggleTask={onToggleTask}
                    onViewAllClick={onViewAllTasks}
                />
                <AlertList
                    title="أحدث التنبيهات"
                    alerts={alerts}
                    onAlertClick={handleAlertClick}
                    onViewAllClick={onViewAllAlerts}
                />
            </div>

            {/* Modals for details */}
            <Modal isOpen={!!selectedTask || !!selectedAlert} onClose={closeModal} title={selectedTask ? "تفاصيل المهمة" : "تفاصيل التنبيه"}>
                {selectedTask && (
                     <div className="space-y-4">
                        <p><strong className="font-semibold">المهمة:</strong> {selectedTask.title}</p>
                        <p><strong className="font-semibold">الموعد النهائي:</strong> {selectedTask.dueDate}</p>
                        <p><strong className="font-semibold">الأولوية:</strong> {selectedTask.priority === 'high' ? 'عالية' : 'عادية'}</p>
                         {selectedTask.description && <p><strong className="font-semibold">الوصف:</strong> {selectedTask.description}</p>}
                    </div>
                )}
                {selectedAlert && (
                     <div className="space-y-4">
                        <p><strong className="font-semibold">التنبيه:</strong> {selectedAlert.title}</p>
                        <p><strong className="font-semibold">الوقت:</strong> {selectedAlert.time}</p>
                        <p><strong className="font-semibold">النوع:</strong> {selectedAlert.type === 'danger' ? 'خطر' : 'تحذير'}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};