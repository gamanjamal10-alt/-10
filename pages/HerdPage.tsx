import React, { useState, useMemo } from 'react';
import { AnimalCard } from '../components/AnimalCard';
import { Modal } from '../components/Modal';
import type { Animal, FarmEvent, AnimalType } from '../types';

interface HerdPageProps {
    herd: Animal[];
    events: FarmEvent[];
    onEditImage: (animal: Animal) => void;
}

const FilterButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            isActive ? 'bg-primary text-white' : 'bg-background-light dark:bg-background-dark text-text-light-secondary dark:text-dark-secondary'
        }`}
    >
        {label}
    </button>
);

export const HerdPage: React.FC<HerdPageProps> = ({ herd, events, onEditImage }) => {
    const [filter, setFilter] = useState<'all' | AnimalType>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

    const filteredHerd = useMemo(() => {
        return herd
            .filter(animal => filter === 'all' || animal.type === filter)
            .filter(animal =>
                animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                animal.id.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [herd, filter, searchTerm]);

    const handleAnimalClick = (animal: Animal) => {
        setSelectedAnimal(animal);
    };

    const closeModal = () => {
        setSelectedAnimal(null);
    };
    
    const animalEvents = useMemo(() => {
        if (!selectedAnimal) return [];
        return events.filter(event => event.animalId === selectedAnimal.id)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [selectedAnimal, events]);

    return (
        <div className="p-4 space-y-4">
            {/* Search and Filter */}
            <div className="sticky top-16 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm py-3 z-10">
                 <div className="relative">
                    <input
                        type="text"
                        placeholder="ابحث بالاسم أو الرقم التعريفي..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-10 rounded-md bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark focus:ring-primary focus:border-primary text-text-light-primary dark:text-dark-primary"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-light-secondary dark:text-dark-secondary">
                        search
                    </span>
                </div>
                <div className="flex justify-center gap-2 mt-3">
                    <FilterButton label="الكل" isActive={filter === 'all'} onClick={() => setFilter('all')} />
                    <FilterButton label="الأبقار" isActive={filter === 'cattle'} onClick={() => setFilter('cattle')} />
                    <FilterButton label="الأغنام" isActive={filter === 'sheep'} onClick={() => setFilter('sheep')} />
                </div>
            </div>

            {/* Herd List */}
            <div className="flex flex-col gap-3 pb-4">
                {filteredHerd.length > 0 ? (
                    filteredHerd.map(animal => (
                        <AnimalCard key={animal.id} animal={animal} onClick={handleAnimalClick} />
                    ))
                ) : (
                    <p className="text-center text-text-light-secondary dark:text-dark-secondary mt-8">
                       لم يتم العثور على حيوانات تطابق بحثك.
                    </p>
                )}
            </div>

            {/* Animal Details Modal */}
            <Modal isOpen={!!selectedAnimal} onClose={closeModal} title={`تفاصيل ${selectedAnimal?.name || ''}`}>
                {selectedAnimal && (
                    <div className="space-y-4">
                        <img src={selectedAnimal.imageUrl} alt={selectedAnimal.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <p><strong className="font-semibold">الرقم التعريفي:</strong> #{selectedAnimal.id}</p>
                        <p><strong className="font-semibold">السلالة:</strong> {selectedAnimal.breed}</p>
                        <p><strong className="font-semibold">العمر:</strong> {selectedAnimal.age} سنوات</p>
                        <p><strong className="font-semibold">الحالة الصحية:</strong> {selectedAnimal.healthStatus}</p>
                        
                         <button 
                            onClick={() => {
                                onEditImage(selectedAnimal);
                                closeModal();
                            }}
                            className="w-full flex items-center justify-center gap-2 mt-2 px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary/10 transition-colors"
                        >
                             <span className="material-symbols-outlined">edit</span>
                            تعديل الصورة بالذكاء الاصطناعي
                        </button>

                        <div className="border-t border-border-light dark:border-border-dark pt-4 mt-4">
                             <h4 className="font-bold mb-2">السجل الصحي</h4>
                             {animalEvents.length > 0 ? (
                                <ul className="space-y-2">
                                    {animalEvents.map(event => (
                                        <li key={event.id} className="text-sm p-2 bg-background-light dark:bg-background-dark rounded-md">
                                            <p className="font-semibold">{event.date}: <span className="font-normal">{event.description}</span></p>
                                        </li>
                                    ))}
                                </ul>
                             ) : (
                                <p className="text-sm text-text-light-secondary dark:text-dark-secondary">لا توجد سجلات.</p>
                             )}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};
