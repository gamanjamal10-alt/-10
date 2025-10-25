// FIX: Replaced placeholder content with a full implementation for the AddItemForm component.
import React, { useState } from 'react';

interface AddItemFormProps {
    onAddItem: (item: { type: string; content: string }) => void;
    onClose: () => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem, onClose }) => {
    const [itemType, setItemType] = useState('task');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            onAddItem({ type: itemType, content });
            setContent('');
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="itemType" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">
                    نوع العنصر
                </label>
                <select
                    id="itemType"
                    value={itemType}
                    onChange={(e) => setItemType(e.target.value)}
                    className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-primary focus:border-primary"
                >
                    <option value="task">مهمة جديدة</option>
                    <option value="note">ملاحظة</option>
                    <option value="animal">حيوان جديد</option>
                </select>
            </div>
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">
                    التفاصيل
                </label>
                <textarea
                    id="content"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-primary focus:border-primary"
                    placeholder="أدخل تفاصيل العنصر هنا..."
                />
            </div>
            <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-text-light-primary dark:text-dark-primary bg-background-light dark:bg-background-dark hover:bg-gray-200 dark:hover:bg-gray-700">
                    إلغاء
                </button>
                <button type="submit" className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90">
                    إضافة
                </button>
            </div>
        </form>
    );
};
