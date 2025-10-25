import React, { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { KpiCard } from '../components/KpiCard';
import { TaskList } from '../components/TaskList';
import { AlertList } from '../components/AlertList';
import { Modal } from '../components/Modal';
import { STATS_DATA, KPI_DATA } from '../constants';
import type { Task, Alert, Animal, Stat } from '../types';

interface DashboardPageProps {
    tasks: Task[];
    alerts: Alert[];
    herd: Animal[];
    onViewAllTasks: () => void;
    onViewAllAlerts?: () => void;
    onToggleTask: (taskId: number) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ tasks, alerts, herd, onViewAllTasks, onViewAllAlerts, onToggleTask }) => {
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
                <div className="space-y-4">
                    <div>
                        <p className="mb-2"><strong className="font-semibold">المهمة:</strong> {task.title}</p>
                        <p className="mb-2"><strong className="font-semibold">الموعد النهائي:</strong> {task.dueDate}</p>
                        <p className="mb-2"><strong className="font-semibold">الأولوية:</strong> {task.priority === 'high' ? 'عالية' : 'عادية'}</p>
                        <p className="mb-2"><strong className="font-semibold">الحالة:</strong> {task.completed ? 'مكتملة' : 'قيد التنفيذ'}</p>
                        {task.description && <p><strong className="font-semibold">الوصف:</strong> {task.description}</p>}
                    </div>
                     <button 
                        onClick={() => {
                            onToggleTask(task.id);
                            closeModal();
                        }} 
                        className="w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                    >
                        {task.completed ? 'وضع علامة كغير مكتملة' : 'وضع علامة كمكتملة'}
                    </button>
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

    const cattleCount = herd.filter(animal => animal.type === 'cattle').length;
    const sheepCount = herd.filter(animal => animal.type === 'sheep').length;
    const milkingCowsCount = herd.filter(animal => animal.type === 'cattle' && animal.subType === 'بقرة حلوب').length;
    const dailyMilkProduction = milkingCowsCount * 25; // Assuming 25 liters per milking cow

    const stats: Stat[] = [
        { title: 'عدد الأبقار', value: `${cattleCount} رأس`, icon: 'pets' },
        { title: 'عدد الأغنام', value: `${sheepCount} رأس`, icon: 'pets' },
        { title: 'حالات مرضية', value: `${herd.filter(a => a.healthStatus === 'Sick').length} حالات`, color: 'warning', icon: 'sick' },
        { title: 'تنبيهات حرجة', value: `${alerts.filter(a => a.type === 'danger').length} حالة`, color: 'danger', icon: 'warning' },
        { title: 'إنتاج الحليب اليومي', value: `${dailyMilkProduction.toLocaleString()} لتر`, icon: 'science' },
    ];
    
    return (
        <div className="p-4 space-y-6">
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
            </div>

            {/* KPI Section */}
            <KpiCard kpiData={KPI_DATA} />

            {/* Tasks Section */}
            <TaskList 
                title="المهام القادمة" 
                tasks={tasks.filter(t => !t.completed).slice(0, 3)} 
                onTaskClick={handleItemClick} 
                onViewAllClick={onViewAllTasks}
                onToggleTask={onToggleTask} 
            />

            {/* Alerts Section */}
            <AlertList title="التنبيهات الأخيرة" alerts={alerts} onAlertClick={handleItemClick} onViewAllClick={onViewAllAlerts} />

            {/* Details Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title="تفاصيل العنصر">
                {getModalContent()}
            </Modal>
        </div>
    );
};