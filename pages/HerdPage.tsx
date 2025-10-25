import React from 'react';
import { AnimalCard } from '../components/AnimalCard';
import { HERD_DATA } from '../constants';
import type { Animal } from '../types';

interface HerdPageProps {
    onAnimalClick: (animal: Animal) => void;
}

export const HerdPage: React.FC<HerdPageProps> = ({ onAnimalClick }) => {
    return (
        <div className="p-4 space-y-4">
            <h2 className="text-text-light-primary dark:text-dark-primary text-xl font-bold">سجل القطيع</h2>
            <div className="flex flex-col gap-3">
                {HERD_DATA.map(animal => (
                    <AnimalCard key={animal.id} animal={animal} onClick={onAnimalClick} />
                ))}
            </div>
        </div>
    );
};
