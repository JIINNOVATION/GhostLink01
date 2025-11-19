
import React from 'react';
import { CloseIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[1001]"
      onClick={onClose}
    >
      <div 
        className="bg-black border border-theme-primary/50 rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col"
        style={{ boxShadow: '0 0 20px 0 rgba(var(--theme-primary-rgb), 0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-theme-primary/30">
          <h2 className="text-xl font-bold text-theme-primary tracking-wider">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-theme-primary transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Modal;
