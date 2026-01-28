'use client';

import { useState, useEffect } from 'react';

export default function CandidateFloater() {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Force visibility
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="candidate-floater-container fixed bottom-4 right-4 z-[9999] animate-fade-in pointer-events-auto"
      style={{ 
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 9999,
        visibility: 'visible',
        display: 'block',
        opacity: imageLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in',
      }}
    >
      {!imageError ? (
        <img
          src="/candidate-floater.png"
          alt="Candidate Konda Reddy. B - Vote ONE at S.No. 58"
          className="w-32 h-auto sm:w-40 md:w-48 lg:w-56 shadow-2xl rounded-lg hover:scale-105 transition-transform duration-300"
          style={{ 
            maxHeight: '80vh', 
            maxWidth: '90vw',
            display: 'block',
            opacity: 1,
            visibility: 'visible',
            position: 'relative',
          }}
          onError={(e) => {
            console.error('Failed to load candidate-floater.png');
            console.error('Image src:', e.currentTarget.src);
            setImageError(true);
          }}
          onLoad={() => {
            console.log('Candidate floater image loaded successfully');
            setImageLoaded(true);
          }}
        />
      ) : (
        <div 
          className="bg-blue-600 text-white p-4 rounded-lg shadow-lg"
          style={{ minWidth: '200px' }}
        >
          <p className="text-sm font-bold">KONDA REDDY. B</p>
          <p className="text-xs">Vote ONE at S.No. 58</p>
          <p className="text-xs mt-2 opacity-75">Image failed to load</p>
        </div>
      )}
    </div>
  );
}
