import React from 'react';
import { TaskList } from '../components/TaskList';
import { TASKS_DATA } from '../constants';
import type { Task } from '../types';

interface TasksPageProps {
    onTaskClick: (task: Task) => void;
}

export const TasksPage: React.FC<TasksPageProps> = ({ onTaskClick }) => {
    return (
        <div className="p-4">
            <TaskList
                title="كل المهام"
                tasks={TASKS_DATA}
                onTaskClick={onTaskClick}
            />
        </div>
    );
};