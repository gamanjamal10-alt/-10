
import React, { useState } from 'react';
import type { Shepherd } from '../types';

interface AddShepherdFormProps {
    onAddShepherd: (shepherd: Omit<Shepherd, 'id'>) => void;
}

export const AddShepherdForm: React.FC<AddShepherdFormProps> = ({ onAddShepherd }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [specialty, setSpecialty] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && phone.trim() && specialty.trim()) {
            onAddShepherd({ 
                name, 
                phone,
                specialty,
                // Using a placeholder image for new shepherds
                imageUrl: `https://i.pravatar.cc/150?u=${name}` 
            });
            // Reset form
            setName('');
            setPhone('');
            setSpecialty('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="shepherd-name" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">
                    الاسم
                </label>
                <input
                    id="shepherd-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark"
                    placeholder="مثال: أحمد عبدالله"
                    required
                />
            </div>
             <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">
                    رقم الجوال
                </label>
                <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark"
                    placeholder="05xxxxxxxx"
                    required
                />
            </div>
            <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">
                    التخصص
                </label>
                 <input
                    id="specialty"
                    type="text"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark"
                    placeholder="مثال: طبيب بيطري"
                    required
                />
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <button type="submit" className="w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors">
                    إضافة راعي
                </button>
            </div>
        </form>
    );
};
