'use client';

import { useState, useEffect } from 'react';

export default function CandidateFloater() {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [attemptedPaths, setAttemptedPaths] = useState<string[]>([]);

  useEffect(() => {
    // Handle basePath for GitHub Pages and local development
    const getBasePath = () => {
      if (typeof window === 'undefined') return '';
      const pathname = window.location.pathname;
      const origin = window.location.origin;
      
      // Check if pathname starts with /bar-council-portal (works for both local and GitHub Pages)
      if (pathname.startsWith('/bar-council-portal')) {
        return '/bar-council-portal';
      }
      
      // Check if we're on GitHub Pages (contains github.io)
      if (origin.includes('github.io')) {
        // Extract repo name from URL path (first segment after domain)
        // For GitHub Pages: username.github.io/repo-name/...
        const pathParts = pathname.split('/').filter(Boolean);
        if (pathParts.length > 0) {
          return `/${pathParts[0]}`;
        }
      }
      
      return '';
    };
    
    const basePath = getBasePath();
    // Try multiple paths: with basePath, then without
    const pathsToTry = basePath 
      ? [`${basePath}/candidate-floater-2.png`, '/candidate-floater-2.png', './candidate-floater-2.png']
      : ['/candidate-floater-2.png', './candidate-floater-2.png'];
    
    setImageSrc(pathsToTry[0]);
    setAttemptedPaths(pathsToTry);
    
    console.log('Floater image paths to try:', pathsToTry);
    console.log('Base path:', basePath);
    console.log('Current URL:', typeof window !== 'undefined' ? window.location.href : '');
    console.log('Pathname:', typeof window !== 'undefined' ? window.location.pathname : '');
    
    // Force visibility
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const currentSrc = e.currentTarget.src;
    // Extract just the pathname part for comparison
    const currentPath = new URL(currentSrc, window.location.origin).pathname;
    const currentIndex = attemptedPaths.findIndex(path => {
      const fullPath = path.startsWith('http') ? new URL(path).pathname : path;
      return currentPath.includes(fullPath) || currentPath.endsWith(fullPath);
    });
    
    console.error('Failed to load image:', currentSrc);
    console.error('Current path:', currentPath);
    console.error('Attempted paths:', attemptedPaths);
    console.error('Current index:', currentIndex);
    
    // Try next path if available
    if (currentIndex >= 0 && currentIndex < attemptedPaths.length - 1) {
      const nextPath = attemptedPaths[currentIndex + 1];
      console.log('Trying fallback path:', nextPath);
      setImageError(false); // Reset error state when trying new path
      setImageSrc(nextPath);
    } else if (currentIndex === -1 && attemptedPaths.length > 1) {
      // If we couldn't match the current path, try the first fallback
      const nextPath = attemptedPaths[1];
      console.log('Trying first fallback path:', nextPath);
      setImageError(false);
      setImageSrc(nextPath);
    } else {
      // All paths failed
      console.error('All image paths failed. Tried:', attemptedPaths);
      setImageError(true);
    }
  };

  return (
    <div 
      className="candidate-floater-container"
      style={{ 
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 99999,
        visibility: 'visible',
        display: 'block',
        opacity: imageLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in',
        pointerEvents: 'auto',
        isolation: 'isolate',
        contain: 'layout style paint',
      }}
    >
      {!imageError && imageSrc ? (
        <img
          src={imageSrc}
          alt="Candidate Konda Reddy. B - Vote ONE at S.No. 58"
          className="shadow-2xl rounded-lg hover:scale-105 transition-transform duration-300"
          style={{ 
            width: '8rem',
            height: 'auto',
            maxHeight: '80vh', 
            maxWidth: '90vw',
            display: 'block',
            opacity: 1,
            visibility: 'visible',
            position: 'relative',
            objectFit: 'contain',
          }}
          onError={handleImageError}
          onLoad={() => {
            console.log('Candidate floater image loaded successfully');
            setImageLoaded(true);
          }}
        />
      ) : imageError ? (
        <div 
          className="bg-blue-600 text-white p-4 rounded-lg shadow-lg"
          style={{ minWidth: '200px' }}
        >
          <p className="text-sm font-bold">KONDA REDDY. B</p>
          <p className="text-xs">Vote ONE at S.No. 58</p>
          <p className="text-xs mt-2 opacity-75">Image failed to load</p>
        </div>
      ) : null}
    </div>
  );
}
