import React from 'react';

interface FloatingActionButtonProps {
    onClick: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-24 right-4 bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-20"
            aria-label="إضافة عنصر جديد"
        >
            <span className="material-symbols-outlined text-3xl">add</span>
        </button>
    );
};
