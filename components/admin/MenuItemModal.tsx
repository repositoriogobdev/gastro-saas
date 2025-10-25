import React from 'react';
import { XIcon } from '../Icons';

interface MenuItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-secondary dark:bg-secondary-dark rounded-xl shadow-2xl w-full max-w-2xl relative animate-fade-in-up border border-border dark:border-border-dark"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 p-1 text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:text-accent transition-colors z-10"
                >
                    <XIcon className="h-6 w-6" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default MenuItemModal;