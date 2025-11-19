
import React from 'react';
import Modal from '../ui/Modal';
import { GhostIcon } from '../ui/Icons';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const handleLoginClick = () => {
    onLogin();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join The Investigation">
      <div className="text-center p-4">
        <GhostIcon className="w-16 h-16 text-theme-primary mx-auto mb-4 animate-pulse" />
        <p className="text-gray-300 mb-6 leading-relaxed">
          Create a free account to upload your own evidence, create case files, and contribute to the community. Your next discovery could be the key to solving a mystery.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-700 text-white py-2 px-6 rounded-md border border-gray-600 hover:bg-gray-600 transition-all duration-300"
          >
            Maybe Later
          </button>
          <button
            onClick={handleLoginClick}
            className="bg-theme-primary/50 text-white py-2 px-6 rounded-md border border-theme-primary hover:bg-theme-primary/70 transition-all duration-300 font-bold"
          >
            Sign Up & Continue
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
