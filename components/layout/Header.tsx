import React from 'react';
import { MOCK_USER } from '../../constants';
import type { User } from '../../types';
import { BrainCircuitIcon, GhostIcon } from '../ui/Icons';

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginToggle: () => void;
  onOpenMainHistorian: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginToggle, onOpenMainHistorian }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-[1000] p-4 bg-gradient-to-b from-black/80 to-transparent">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-pink-400 flex items-center gap-2" style={{ textShadow: '0 0 8px #FF69B4' }}>
              <GhostIcon className="w-8 h-8"/>
              The Ghost Link
            </h1>
            <button onClick={onOpenMainHistorian} title="Ask the AI Historian" className="text-pink-400/70 hover:text-pink-400 transition-colors duration-300" style={{ filter: 'drop-shadow(0 0 5px #FF69B4)'}}>
              <BrainCircuitIcon className="w-7 h-7" />
            </button>
        </div>
        <div>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-gray-300">Welcome, {MOCK_USER.username}</span>
              <img src={MOCK_USER.avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-pink-500" />
               <button 
                onClick={onLoginToggle}
                className="bg-pink-600/50 text-white py-2 px-4 rounded-md border border-pink-500 hover:bg-pink-500/70 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={onLoginToggle}
              className="bg-pink-600/50 text-white py-2 px-4 rounded-md border border-pink-500 hover:bg-pink-500/70 transition-all duration-300"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;