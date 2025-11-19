import React from 'react';

export const GhostIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 10h.01" />
    <path d="M15 10h.01" />
    <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" />
  </svg>
);

export const CrimeIcon = (props: React.SVGProps<SVGSVGElement>) => ( // Detective Badge
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.78l1.06 1.06a1 1 0 0 0 1.41 0l1.06-1.06a4 4 0 0 1 4.78 4.78l-1.06 1.06a1 1 0 0 0 0 1.41l1.06 1.06a4 4 0 0 1-4.78 4.78l-1.06-1.06a1 1 0 0 0-1.41 0l-1.06 1.06a4 4 0 0 1-4.78-4.78l1.06-1.06a1 1 0 0 0 0-1.41z"/>
  </svg>
);

export const MysteryIcon = (props: React.SVGProps<SVGSVGElement>) => ( // Puzzle Piece
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 7V4.5a2.5 2.5 0 0 0-5 0V7h-.5a2.5 2.5 0 0 0 0 5H9v2.5a2.5 2.5 0 0 0 5 0V12h.5a2.5 2.5 0 0 0 0-5H14z"/>
  </svg>
);

export const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const GpsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
  </svg>
);

export const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

export const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

export const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

export const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
);

export const StopIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="6" y="6" width="12" height="12"></rect>
    </svg>
);

export const UploadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

export const AlienIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 12c0-3 2-5 2-5s2 2 2 5c0 1.66-1.34 3-3 3s-3-1.34-3-3Z" />
    <path d="M12 12c0-3-2-5-2-5S8 9 8 12c0 1.66 1.34 3 3 3s3-1.34 3-3Z" />
    <path d="M12 14v.01" />
    <path d="M12 2a10 10 0 1 0 10 10" />
    <path d="M18 8c0 4.42-3.58 8-8 8" />
  </svg>
);

export const CryptidIcon = (props: React.SVGProps<SVGSVGElement>) => ( // Bigfoot
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M13.3 22H11l-2.4-4.8c-.5-1-1.5-2.2-1.5-2.2s-1-1.3-1-3.2c0-2.2 1.3-4.8 1.3-4.8s1.4-2.2 3.3-2.2h.2c2.2 0 3.8 2.2 3.8 2.2s1.3 2.6 1.3 4.8c0 2-1 3.2-1 3.2s-1 1.2-1.5 2.2L13.3 22Z"/>
    <path d="M10.3 11.8c-.3-.2-.5-.5-.6-.8s-.1-.7.1-1c.2-.3.5-.5.8-.6s.7-.1 1 .1"/>
  </svg>
);

export const VortexIcon = (props: React.SVGProps<SVGSVGElement>) => ( // Spiral
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10.08 3.22c3.4-1.21 7.41.48 8.62 3.89s.48 7.41-3.89 8.62-7.41-.48-8.62-3.89c-1.1-3.1.05-6.55 2.94-8.1"/>
    <path d="M6.6 6.6c-3 3-3 7.8 0 10.8s7.8 3 10.8 0"/>
  </svg>
);
