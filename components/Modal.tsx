import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className="bg-card-light dark:bg-card-dark rounded-xl p-6 m-4 w-full max-w-md relative text-text-light-primary dark:text-dark-primary shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b border-border-light dark:border-border-dark pb-3 mb-4">
                    <h2 id="modal-title" className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-text-light-secondary dark:text-dark-secondary hover:text-text-light-primary dark:hover:text-dark-primary" aria-label="إغلاق">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};
