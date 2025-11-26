import React, { useState, useEffect } from 'react';
import { MOCK_USER } from '../../constants';
import type { AppTheme } from '../../services/locationService';
import { GhostIcon, AlienIcon } from '../ui/Icons';

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  theme: AppTheme;
  onThemeToggle: () => void;
}

interface UserData {
  firstName: string;
  lastName: string;
  userName: string;
  profileImage?: string;
}

const themeConfig = {
  ghost: {
    title: "The Ghost Link",
    colorClass: 'text-pink-400',
    shadowFilter: 'drop-shadow(0 0 5px #FF69B4)',
  },
  alien: {
    title: "The Rift Tracker",
    colorClass: 'text-green-400',
    shadowFilter: 'drop-shadow(0 0 5px #00FF00)',
  }
};

const switcherIconConfig = {
  ghost: { // When theme is ghost, show the alien icon
    Icon: AlienIcon,
    colorClass: 'text-green-400',
    shadowFilter: 'drop-shadow(0 0 5px #00FF00)',
  },
  alien: { // When theme is alien, show the ghost icon
    Icon: GhostIcon,
    colorClass: 'text-pink-400',
    shadowFilter: 'drop-shadow(0 0 5px #FF69B4)',
  }
};

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginClick, onLogoutClick, theme, onThemeToggle }) => {
  const currentThemeDetails = themeConfig[theme];
  const switcherDetails = switcherIconConfig[theme];
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      const savedUser = localStorage.getItem('ghostLinkUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setUserData(user);
      }
    }
  }, [isLoggedIn]);

  const Title = currentThemeDetails.title;
  const MainLogoIcon = GhostIcon; // Always display GhostIcon for the main logo
  const mainLogoColor = currentThemeDetails.colorClass;
  const mainLogoShadow = currentThemeDetails.shadowFilter;

  const SwitcherIcon = switcherDetails.Icon;

  const displayName = userData ? userData.userName : MOCK_USER.username;
  const displayAvatar = userData?.profileImage || MOCK_USER.avatarUrl;

  return (
    <header className="absolute top-0 left-0 right-0 z-[1000] p-4 bg-gradient-to-b from-black/80 to-transparent">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-theme-primary flex items-center gap-3" style={{ textShadow: '0 0 8px var(--theme-primary)' }}>
          <MainLogoIcon 
            className={`w-8 h-8 ${mainLogoColor}`} 
            style={{ filter: mainLogoShadow }}
          />
          {Title}
        </h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={onThemeToggle}
            title="Switch Feed"
            className="bg-black/50 p-2.5 rounded-md border border-gray-600 group transition-all duration-300"
          >
            <SwitcherIcon 
              className={`w-5 h-5 ${switcherDetails.colorClass} group-hover:scale-110 transition-transform`}
              style={{ filter: switcherDetails.shadowFilter }}
            />
          </button>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-gray-300">Welcome, {displayName}</span>
              <img src={displayAvatar} alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-theme-primary object-cover" />
               <button 
                onClick={onLogoutClick}
                className="bg-theme-primary/20 text-white py-2 px-4 rounded-md border border-theme-primary hover:bg-theme-primary/40 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="bg-theme-primary/20 text-white py-2 px-4 rounded-md border border-theme-primary hover:bg-theme-primary/40 transition-all duration-300"
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
