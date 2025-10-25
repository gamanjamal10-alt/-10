import React, { useState } from 'react';
import type { Task } from '../types';

interface AddItemFormProps {
    onAddTask: (task: Omit<Task, 'id' | 'priority' | 'completed'>) => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && dueDate.trim()) {
            onAddTask({ title, dueDate, completed: false });
            setTitle('');
            setDueDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">
                    عنوان المهمة
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-primary focus:border-primary text-text-light-primary dark:text-dark-primary"
                    placeholder="مثال: تطعيم الأبقار"
                    required
                />
            </div>
            <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">
                    تاريخ الاستحقاق
                </label>
                 <input
                    id="dueDate"
                    type="text"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-primary focus:border-primary text-text-light-primary dark:text-dark-primary"
                    placeholder="مثال: غدًا، 10:00 صباحًا"
                    required
                />
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <button type="submit" className="w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors">
                    إضافة المهمة
                </button>
            </div>
        </form>
    );
};
