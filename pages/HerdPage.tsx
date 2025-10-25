import React, { useState } from 'react';
import { AnimalCard } from '../components/AnimalCard';
import { Modal } from '../components/Modal';
import type { Animal, AnimalType, FarmEvent } from '../types';

interface HerdPageProps {
    herd: Animal[];
    events: FarmEvent[];
}

const EventLog: React.FC<{ events: FarmEvent[] }> = ({ events }) => {
    if (events.length === 0) {
        return <p className="text-sm text-text-light-secondary dark:text-dark-secondary">لا توجد أحداث مسجلة لهذا الحيوان.</p>;
    }

    const eventIcons = {
        birth: 'child_care',
        vet_check: 'vaccines',
        note: 'description'
    };

    return (
        <div className="space-y-3 pt-4 mt-4 border-t border-border-light dark:border-border-dark">
             <h4 className="font-bold">سجل الأحداث</h4>
            {events.map(event => (
                <div key={event.id} className="flex items-start gap-3 p-2 rounded-md bg-background-light dark:bg-background-dark">
                    <span className="material-symbols-outlined text-primary mt-1">{eventIcons[event.type]}</span>
                    <div>
                        <p className="font-semibold text-text-light-primary dark:text-dark-primary">{event.description}</p>
                        <p className="text-xs text-text-light-secondary dark:text-dark-secondary">{event.date}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const NewbornEventCard: React.FC<{ event: FarmEvent, parent?: Animal }> = ({ event, parent }) => (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
         <img 
            src={parent?.imageUrl || 'https://images.unsplash.com/photo-1549470947-3a6a11a8a2a3?q=80&w=1974&auto=format&fit=crop'} 
            alt={parent?.name} 
            className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex-1">
            <p className="font-semibold text-text-light-primary dark:text-dark-primary">{event.description}</p>
            {parent && <p className="text-sm text-text-light-secondary dark:text-dark-secondary">الأم: {parent.name} (#{parent.id})</p>}
            <p className="text-sm text-text-light-secondary dark:text-dark-secondary">التاريخ: {event.date}</p>
        </div>
    </div>
);

export const HerdPage: React.FC<HerdPageProps> = ({ herd, events }) => {
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<AnimalType | 'newborns'>('cattle');

    const handleAnimalClick = (animal: Animal) => {
        setSelectedAnimal(animal);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAnimal(null);
    };
    
    const filteredAnimals = herd.filter(animal => animal.type === activeTab);
    const animalEvents = selectedAnimal ? events.filter(event => event.animalId === selectedAnimal.id) : [];
    const birthEvents = events.filter(event => event.type === 'birth').sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="p-4 space-y-4">
             {/* Tabs */}
            <div className="flex p-1 rounded-lg bg-background-light dark:bg-card-dark border border-border-light dark:border-border-dark">
                <button 
                    onClick={() => setActiveTab('cattle')} 
                    className={`flex-1 p-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'cattle' ? 'bg-primary text-white' : 'text-text-light-secondary dark:text-dark-secondary'}`}
                >
                    الأبقار
                </button>
                <button 
                    onClick={() => setActiveTab('sheep')}
                    className={`flex-1 p-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'sheep' ? 'bg-primary text-white' : 'text-text-light-secondary dark:text-dark-secondary'}`}
                >
                    الأغنام
                </button>
                <button 
                    onClick={() => setActiveTab('newborns')}
                    className={`flex-1 p-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'newborns' ? 'bg-primary text-white' : 'text-text-light-secondary dark:text-dark-secondary'}`}
                >
                    المواليد الجدد
                </button>
            </div>
            
            {activeTab !== 'newborns' ? (
                <div className="space-y-3">
                    <h2 className="text-lg font-bold text-text-light-primary dark:text-dark-primary px-2">
                        قائمة {activeTab === 'cattle' ? 'الأبقار' : 'الأغنام'} ({filteredAnimals.length})
                    </h2>
                    {filteredAnimals.map(animal => (
                        <AnimalCard key={animal.id} animal={animal} onClick={handleAnimalClick} />
                    ))}
                </div>
            ) : (
                 <div className="space-y-3">
                    <h2 className="text-lg font-bold text-text-light-primary dark:text-dark-primary px-2">
                        سجل المواليد الجدد ({birthEvents.length})
                    </h2>
                    {birthEvents.map(event => {
                        const parent = herd.find(animal => animal.id === event.animalId);
                        return <NewbornEventCard key={event.id} event={event} parent={parent} />;
                    })}
                </div>
            )}


            <Modal isOpen={isModalOpen} onClose={closeModal} title={`تفاصيل: ${selectedAnimal?.name ?? ''}`}>
                {selectedAnimal && (
                    <div className="space-y-2">
                        <img src={selectedAnimal.imageUrl} alt={selectedAnimal.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <p><strong className="font-semibold">الرقم التعريفي:</strong> #{selectedAnimal.id}</p>
                        <p><strong className="font-semibold">السلالة:</strong> {selectedAnimal.breed}{selectedAnimal.subType ? ` - ${selectedAnimal.subType}` : ''}</p>
                        <p><strong className="font-semibold">العمر:</strong> {selectedAnimal.age} سنوات</p>
                        <p><strong className="font-semibold">الحالة الصحية:</strong> {selectedAnimal.healthStatus}</p>
                        <EventLog events={animalEvents} />
                    </div>
                )}
            </Modal>
        </div>
    );
};