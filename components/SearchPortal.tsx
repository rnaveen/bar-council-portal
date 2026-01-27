'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { EnrollmentRecord, searchEnrollments } from '@/lib/searchUtils';

interface SearchPortalProps {
  data: EnrollmentRecord[];
  onAdvocateFound?: (advocateName: string | null) => void;
  onResultsChange?: (results: EnrollmentRecord[], query: string) => void;
}

export default function SearchPortal({ data, onAdvocateFound, onResultsChange }: SearchPortalProps) {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use refs to store callbacks to avoid infinite loops
  const onAdvocateFoundRef = useRef(onAdvocateFound);
  const onResultsChangeRef = useRef(onResultsChange);
  
  useEffect(() => {
    onAdvocateFoundRef.current = onAdvocateFound;
    onResultsChangeRef.current = onResultsChange;
  }, [onAdvocateFound, onResultsChange]);

  // Debounce search to avoid excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const results = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    return searchEnrollments(data, searchQuery);
  }, [data, searchQuery]);

  // Update parent component when results change (using refs to avoid infinite loops)
  useEffect(() => {
    if (!searchQuery.trim()) {
      onAdvocateFoundRef.current?.(null);
      onResultsChangeRef.current?.([], '');
      return;
    }
    
    // Extract advocate name if single result found
    if (results.length === 1) {
      const record = results[0];
      const name = record['AdvocateName'] || record['name'] || record['Name'] || record['Name of the Advocate'];
      onAdvocateFoundRef.current?.(name ? String(name) : null);
    } else {
      onAdvocateFoundRef.current?.(null);
    }
    onResultsChangeRef.current?.(results, searchQuery);
  }, [results, searchQuery]);

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4 h-full flex flex-col justify-center">
        <div className="text-center mb-2">
          <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
            Telangana Bar Council Election 2026
          </h1>
        </div>

        <div className="relative">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Voter search by name, enrollment number, phone, address, bar association..."
              className="w-full px-4 py-2 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all"
              autoFocus
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setSearchQuery('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Clear search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {query && !searchQuery && (
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center">
              Searching...
            </div>
          )}
        </div>
      </div>

    </>
  );
}
