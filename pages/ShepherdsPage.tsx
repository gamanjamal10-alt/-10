
import React, { useState } from 'react';
import type { Shepherd } from '../types';

interface ShepherdCardProps {
    shepherd: Shepherd;
}

const ShepherdCard: React.FC<ShepherdCardProps> = ({ shepherd }) => (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
        <img 
            src={shepherd.imageUrl} 
            alt={shepherd.name} 
            className="w-16 h-16 object-cover rounded-full"
        />
        <div className="flex-1">
            <p className="font-bold text-text-light-primary dark:text-dark-primary">{shepherd.name}</p>
            <p className="text-sm text-text-light-secondary dark:text-dark-secondary">{shepherd.specialty}</p>
            <p className="text-sm text-text-light-secondary dark:text-dark-secondary mt-1">{shepherd.phone}</p>
        </div>
        <a href={`tel:${shepherd.phone}`} className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors">
            <span className="material-symbols-outlined">call</span>
        </a>
    </div>
);


interface ShepherdsPageProps {
    shepherds: Shepherd[];
}

export const ShepherdsPage: React.FC<ShepherdsPageProps> = ({ shepherds }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredShepherds = shepherds.filter(shepherd =>
        shepherd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shepherd.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 space-y-4">
            <div className="sticky top-16 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm py-3 z-10">
                 <div className="relative">
                    <input
                        type="text"
                        placeholder="ابحث بالاسم أو التخصص..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-10 rounded-md bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark focus:ring-primary focus:border-primary text-text-light-primary dark:text-dark-primary"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-light-secondary dark:text-dark-secondary">
                        search
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-3 pb-4">
                {filteredShepherds.length > 0 ? (
                    filteredShepherds.map(shepherd => (
                        <ShepherdCard key={shepherd.id} shepherd={shepherd} />
                    ))
                ) : (
                    <p className="text-center text-text-light-secondary dark:text-dark-secondary mt-8">
                       لم يتم العثور على رعاة يطابقون بحثك.
                    </p>
                )}
            </div>
        </div>
    );
};
