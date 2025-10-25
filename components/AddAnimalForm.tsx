import React, { useState } from 'react';
import type { Animal, AnimalType } from '../types';

interface AddAnimalFormProps {
    onAddAnimal: (animal: Omit<Animal, 'id'>) => void;
}

export const AddAnimalForm: React.FC<AddAnimalFormProps> = ({ onAddAnimal }) => {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [subType, setSubType] = useState('');
    const [age, setAge] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [type, setType] = useState<AnimalType>('cattle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && breed.trim() && age) {
            onAddAnimal({ 
                name, 
                breed, 
                subType,
                age: parseInt(age), 
                imageUrl, 
                type, 
                healthStatus: 'Healthy' // Default status
            });
            // Reset form
            setName('');
            setBreed('');
            setSubType('');
            setAge('');
            setImageUrl('');
            setType('cattle');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">
                    نوع الحيوان
                </label>
                <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value as AnimalType)}
                    className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-primary focus:border-primary"
                >
                    <option value="cattle">بقرة</option>
                    <option value="sheep">خروف</option>
                </select>
            </div>
             <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">
                    الاسم
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-primary focus:border-primary"
                    placeholder="مثال: نجمة"
                    required
                />
            </div>
             <div>
                <label htmlFor="breed" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">
                    السلالة
                </label>
                <input
                    id="breed"
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-primary focus:border-primary"
                    placeholder="مثال: هولشتاين"
                    required
                />
            </div>
            <div>
                <label htmlFor="subType" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">
                    النوع الفرعي (اختياري)
                </label>
                <input
                    id="subType"
                    type="text"
                    value={subType}
                    onChange={(e) => setSubType(e.target.value)}
                    className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-primary focus:border-primary"
                    placeholder={type === 'cattle' ? "مثال: عجل، بقرة حلوب..." : "مثال: سدسة، رباعي، علوشة..."}
                />
            </div>
            <div>
                <label htmlFor="age" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">
                    العمر (سنوات)
                </label>
                 <input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-primary focus:border-primary"
                    placeholder="مثال: 4"
                    required
                />
            </div>
             <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">
                    رابط الصورة (اختياري)
                </label>
                 <input
                    id="imageUrl"
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-primary focus:border-primary"
                    placeholder="https://..."
                />
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <button type="submit" className="w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors">
                    إضافة الحيوان
                </button>
            </div>
        </form>
    );
};