import React from 'react';
import { TaskList } from '../components/TaskList';
import { TASKS_DATA } from '../constants';
import type { Task } from '../types';

interface TasksPageProps {
    onTaskClick: (task: Task) => void;
}

export const TasksPage: React.FC<TasksPageProps> = ({ onTaskClick }) => {
    return (
        <div className="p-4 space-y-4">
            <h2 className="text-text-light-primary dark:text-dark-primary text-xl font-bold">كل المهام</h2>
            <TaskList
                tasks={TASKS_DATA}
                onTaskClick={onTaskClick}
                onViewAllClick={() => {}}
            />
        </div>
    );
};
