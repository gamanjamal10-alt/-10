import React, { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { KpiCard } from '../components/KpiCard';
import { TaskList } from '../components/TaskList';
import { AlertList } from '../components/AlertList';
import { Modal } from '../components/Modal';
import { STATS_DATA, KPI_DATA } from '../constants';
import type { Task, Alert } from '../types';

interface DashboardPageProps {
    tasks: Task[];
    alerts: Alert[];
    onViewAllTasks: () => void;
    onViewAllAlerts?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ tasks, alerts, onViewAllTasks, onViewAllAlerts }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Task | Alert | null>(null);

    const handleItemClick = (item: Task | Alert) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const getModalContent = () => {
        if (!selectedItem) return null;

        if ('dueDate' in selectedItem) { // It's a Task
            const task = selectedItem as Task;
            return (
                <div>
                    <p className="mb-2"><strong className="font-semibold">المهمة:</strong> {task.title}</p>
                    <p className="mb-2"><strong className="font-semibold">الموعد النهائي:</strong> {task.dueDate}</p>
                    <p className="mb-2"><strong className="font-semibold">الأولوية:</strong> {task.priority === 'high' ? 'عالية' : 'عادية'}</p>
                    {task.description && <p><strong className="font-semibold">الوصف:</strong> {task.description}</p>}
                </div>
            );
        } else { // It's an Alert
            const alert = selectedItem as Alert;
            return (
                <div>
                     <p className="mb-2"><strong className="font-semibold">التنبيه:</strong> {alert.title}</p>
                     <p><strong className="font-semibold">الوقت:</strong> {alert.time}</p>
                </div>
            );
        }
    };
    
    return (
        <div className="p-4 space-y-6">
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STATS_DATA.map(stat => <StatCard key={stat.title} {...stat} />)}
            </div>

            {/* KPI Section */}
            <KpiCard kpiData={KPI_DATA} />

            {/* Tasks Section */}
            <TaskList title="المهام القادمة" tasks={tasks} onTaskClick={handleItemClick} onViewAllClick={onViewAllTasks} />

            {/* Alerts Section */}
            <AlertList title="التنبيهات الأخيرة" alerts={alerts} onAlertClick={handleItemClick} onViewAllClick={onViewAllAlerts} />

            {/* Details Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title="تفاصيل العنصر">
                {getModalContent()}
            </Modal>
        </div>
    );
};