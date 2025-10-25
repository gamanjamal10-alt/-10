// FIX: Replaced placeholder content with a full implementation for the HerdPage component.
import React, { useState } from 'react';
import { AnimalCard } from '../components/AnimalCard';
import { Modal } from '../components/Modal';
import { HERD_DATA } from '../constants';
import type { Animal } from '../types';

export const HerdPage: React.FC = () => {
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAnimalClick = (animal: Animal) => {
        setSelectedAnimal(animal);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAnimal(null);
    };

    return (
        <div className="p-4 space-y-3">
            <h2 className="text-lg font-bold text-text-light-primary dark:text-dark-primary px-2">قائمة القطيع ({HERD_DATA.length})</h2>
            {HERD_DATA.map(animal => (
                <AnimalCard key={animal.id} animal={animal} onClick={handleAnimalClick} />
            ))}

            <Modal isOpen={isModalOpen} onClose={closeModal} title={`تفاصيل: ${selectedAnimal?.name ?? ''}`}>
                {selectedAnimal && (
                    <div className="space-y-2">
                        <img src={selectedAnimal.imageUrl} alt={selectedAnimal.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <p><strong className="font-semibold">الرقم التعريفي:</strong> #{selectedAnimal.id}</p>
                        <p><strong className="font-semibold">السلالة:</strong> {selectedAnimal.breed}</p>
                        <p><strong className="font-semibold">العمر:</strong> {selectedAnimal.age} سنوات</p>
                        <p><strong className="font-semibold">الحالة الصحية:</strong> {selectedAnimal.healthStatus}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};
