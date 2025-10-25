import React from 'react';
import type { Animal } from '../types';

interface AnimalCardProps {
    animal: Animal;
    onClick: (animal: Animal) => void;
}

const HealthStatusBadge: React.FC<{ status: Animal['healthStatus'] }> = ({ status }) => {
    const statusMap = {
        'Healthy': { text: 'بصحة جيدة', color: 'bg-secondary/10 text-secondary' },
        'Sick': { text: 'مريضة', color: 'bg-danger/10 text-danger' },
        'Under Observation': { text: 'تحت المراقبة', color: 'bg-warning/10 text-warning' }
    };
    const { text, color } = statusMap[status];
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>{text}</span>;
};

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onClick }) => {
    return (
        <div 
            onClick={() => onClick(animal)} 
            className="flex items-center gap-4 p-3 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark cursor-pointer"
        >
            <img 
                src={animal.imageUrl} 
                alt={animal.name} 
                className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <p className="font-bold text-text-light-primary dark:text-dark-primary">{animal.name}</p>
                    <span className="text-sm text-text-light-secondary dark:text-dark-secondary">#{animal.id}</span>
                </div>
                <p className="text-sm text-text-light-secondary dark:text-dark-secondary">{animal.breed}{animal.subType ? ` - ${animal.subType}` : ''} - {animal.age} سنوات</p>
                <div className="mt-2">
                    <HealthStatusBadge status={animal.healthStatus} />
                </div>
            </div>
            <span className="material-symbols-outlined text-text-light-secondary dark:text-dark-secondary">chevron_left</span>
        </div>
    );
};