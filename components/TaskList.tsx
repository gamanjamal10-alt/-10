
import React from 'react';
import type { Task } from '../types';

interface TaskListProps {
    tasks: Task[];
}

const TaskItem: React.FC<Task> = ({ title, dueDate, priority }) => {
    const priorityColor = priority === 'high' ? 'bg-warning' : 'bg-secondary';
    return (
        <div className="flex items-center gap-4 p-3 rounded-lg bg-background-light dark:bg-background-dark cursor-pointer">
            <div className={`w-2 h-10 rounded-full ${priorityColor}`}></div>
            <div className="flex-1">
                <p className="font-semibold text-text-light-primary dark:text-dark-primary">{title}</p>
                <p className="text-sm text-text-light-secondary dark:text-dark-secondary">{dueDate}</p>
            </div>
            <span className="material-symbols-outlined text-text-light-secondary dark:text-dark-secondary">chevron_right</span>
        </div>
    );
};

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <div className="flex flex-col gap-4 rounded-xl p-4 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
            <div className="flex justify-between items-center">
                <h3 className="text-text-light-primary dark:text-dark-primary text-lg font-bold leading-tight tracking-[-0.015em]">Upcoming Tasks</h3>
                <a className="text-primary text-sm font-medium hover:underline" href="#">View All</a>
            </div>
            <div className="flex flex-col gap-3">
                {tasks.map((task, index) => <TaskItem key={index} {...task} />)}
            </div>
        </div>
    );
};
