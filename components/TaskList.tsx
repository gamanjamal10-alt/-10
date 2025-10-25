import React from 'react';
import type { Task } from '../types';

interface TaskListProps {
    title: string;
    tasks: Task[];
    onTaskClick: (task: Task) => void;
    onToggleTask: (taskId: number) => void;
    onViewAllClick?: () => void;
}

const TaskItem: React.FC<Task & { onClick: () => void; onToggle: () => void; }> = ({ title, dueDate, priority, completed, onClick, onToggle }) => {
    const priorityColor = priority === 'high' ? 'bg-warning' : 'bg-secondary';
    
    const handleToggleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent modal from opening when toggling completion
        onToggle();
    };

    return (
        <div onClick={onClick} className={`flex items-center gap-4 p-3 rounded-lg bg-background-light dark:bg-background-dark cursor-pointer transition-opacity ${completed ? 'opacity-60' : ''}`}>
            <div onClick={handleToggleClick} className="cursor-pointer text-text-light-secondary dark:text-dark-secondary hover:text-primary">
                <span className="material-symbols-outlined">
                    {completed ? 'check_circle' : 'radio_button_unchecked'}
                </span>
            </div>
            <div className={`w-1 h-10 rounded-full ${priorityColor}`}></div>
            <div className="flex-1">
                <p className={`font-semibold text-text-light-primary dark:text-dark-primary ${completed ? 'line-through' : ''}`}>{title}</p>
                <p className="text-sm text-text-light-secondary dark:text-dark-secondary">{dueDate}</p>
            </div>
            <span className="material-symbols-outlined text-text-light-secondary dark:text-dark-secondary">chevron_left</span>
        </div>
    );
};

export const TaskList: React.FC<TaskListProps> = ({ title, tasks, onTaskClick, onToggleTask, onViewAllClick }) => {
    return (
        <div className="flex flex-col gap-4 rounded-xl p-4 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
            <div className="flex justify-between items-center">
                <h3 className="text-text-light-primary dark:text-dark-primary text-lg font-bold leading-tight tracking-[-0.015em]">{title}</h3>
                {onViewAllClick && <a className="text-primary text-sm font-medium hover:underline cursor-pointer" onClick={onViewAllClick}>عرض الكل</a>}
            </div>
            <div className="flex flex-col gap-3">
                {tasks.map((task) => <TaskItem key={task.id} {...task} onClick={() => onTaskClick(task)} onToggle={() => onToggleTask(task.id)} />)}
            </div>
        </div>
    );
};