import React, { useState } from 'react';
import { TaskList } from '../components/TaskList';
import { Modal } from '../components/Modal';
import type { Task } from '../types';

interface TasksPageProps {
    tasks: Task[];
    onToggleTask: (taskId: number) => void;
}

export const TasksPage: React.FC<TasksPageProps> = ({ tasks, onToggleTask }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    return (
        <div className="p-4">
            <TaskList title="جميع المهام" tasks={tasks} onTaskClick={handleTaskClick} onToggleTask={onToggleTask} />
            
            <Modal isOpen={isModalOpen} onClose={closeModal} title="تفاصيل المهمة">
                {selectedTask && (
                     <div className="space-y-4">
                        <div>
                            <p className="mb-2"><strong className="font-semibold">المهمة:</strong> {selectedTask.title}</p>
                            <p className="mb-2"><strong className="font-semibold">الموعد النهائي:</strong> {selectedTask.dueDate}</p>
                            <p className="mb-2"><strong className="font-semibold">الأولوية:</strong> {selectedTask.priority === 'high' ? 'عالية' : 'عادية'}</p>
                            <p className="mb-2"><strong className="font-semibold">الحالة:</strong> {selectedTask.completed ? 'مكتملة' : 'قيد التنفيذ'}</p>
                            {selectedTask.description && <p><strong className="font-semibold">الوصف:</strong> {selectedTask.description}</p>}
                        </div>
                        <button 
                            onClick={() => {
                                onToggleTask(selectedTask.id);
                                closeModal();
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