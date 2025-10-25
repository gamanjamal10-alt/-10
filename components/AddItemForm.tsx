import React, { useState } from 'react';

interface AddItemFormProps {
    onAddItem: (item: { title: string; dueDate: string; priority: 'high' | 'normal' }) => void;
    onClose: () => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem, onClose }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState<'high' | 'normal'>('normal');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !dueDate) return;
        onAddItem({ title, dueDate, priority });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">عنوان المهمة</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark"
                    required
                />
            </div>
            <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">تاريخ الاستحقاق</label>
                <input
                    type="text"
                    id="dueDate"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark"
                    placeholder="مثل: غدًا، 9:00 صباحًا"
                    required
                />
            </div>
            <div>
                 <label className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">الأولوية</label>
                 <select 
                    value={priority} 
                    onChange={e => setPriority(e.target.value as 'high' | 'normal')}
                    className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark"
                >
                    <option value="normal">عادية</option>
                    <option value="high">عالية</option>
                 </select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-text-light-primary dark:text-dark-primary">إلغاء</button>
                <button type="submit" className="px-4 py-2 rounded-md bg-primary text-white">إضافة</button>
            </div>
        </form>
    );
};
