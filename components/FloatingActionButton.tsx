
import React from 'react';

export const FloatingActionButton: React.FC = () => {
    return (
        <div className="fixed bottom-24 right-4 z-20">
            <button className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:bg-blue-800 transition-colors">
                <span className="material-symbols-outlined text-3xl">add</span>
            </button>
        </div>
    );
};
