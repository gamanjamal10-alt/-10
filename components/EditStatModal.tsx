import React, { useState, useEffect } from 'react';
import type { Stat } from '../types';
import { Modal } from './Modal';

interface EditStatModalProps {
    isOpen: boolean;
    onClose: () => void;
    stat: Stat | null;
    onUpdate: (statId: string, newValue: string) => void;
}

export const EditStatModal: React.FC<EditStatModalProps> = ({ isOpen, onClose, stat, onUpdate }) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        if (stat) {
            setValue(stat.value.replace(/,/g, '')); // Remove commas for editing
        }
    }, [stat]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (stat && stat.id) {
            onUpdate(stat.id, value);
        }
    };

    if (!isOpen || !stat) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`تعديل ${stat.title}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="stat-value" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">
                        القيمة الجديدة
                    </label>
                    <input
                        id="stat-value"
                        type="number"
                        step="any"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-primary focus:border-primary"
                        required
                        autoFocus
                    />
                </div>
                <div className="flex justify-end pt-4">
                    <button type="submit" className="w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors">
                        حفظ التغييرات
                    </button>
                </div>
            </form>
        </Modal>
    );
};
