'use client';

import { useState, useEffect } from 'react';
import SearchPortal from '@/components/SearchPortal';
import SearchResults from '@/components/SearchResults';
import CandidateProfile from '@/components/CandidateProfile';
import CandidateFloater from '@/components/CandidateFloater';
import { EnrollmentRecord } from '@/lib/searchUtils';

// Candidate data for B. Konda Reddy
const sampleCandidateData = {
  name: 'KONDA REDDY. B', // Name as shown in voting table
  fullName: 'B. KONDA REDDY', // Full name displayed prominently
  serialNumber: '58', // Serial number for voting
  imageUrl: undefined, // Candidate photo - will use basePath dynamically
  slogan: 'Practical help, not slogan. Advocate welfare before everything else.',
  credentials: [
    'MEMBER, BAR COUNCIL OF TELANGANA',
    'PRESIDENT (2015) & GENERAL SECRETARY (2002) – MCCBA',
    'FOUNDER PRESIDENT - FEDERATION OF BAR ASSOCIATIONS, TELANGANA',
  ],
  contact: {
    phone: '9848884443', // Contact number
    email: 'b.kondareddy@gmail.com',
  },
  pollingDate: 'Friday, 30 January 2026', // Voting day
  bio: `B. Konda Reddy is a proven bar leader with a distinguished record of service to the legal community. 
As an advocate and former member of the Bar Council of Telangana, he has consistently worked for the 
welfare and advancement of advocates across the state.`,
  achievements: [
    'Played a key role in proposing a Supreme Court bench in South India',
    'Represented advocates before the Advocates\' Welfare Trust',
    'Secured insurance & welfare support for practicing advocates',
    'United advocates across Telangana on common platforms',
    'Personally operated a dedicated emergency medical vehicle for advocates during COVID',
    'Conducted various health initiatives: CPR, Eye, ENT & Cardiac camps',
    'Led initiatives that resulted in over 17 eye donations by advocates',
    'Hosted Shaheed Bhagat Singh Advocates Volleyball Tournament',
  ],
  manifesto: [
    'Legal Benefit Fund for Telangana Advocates',
    'Kerala Model Implementation',
    'Amendment of Court Fees & Suit Valuation Act',
    'Could generate ₹30 Crore per year which enables strong financial & social security for advocates',
    'Practical help, not slogans. Advocate welfare before everything else.',
  ],
};

export default function Home() {
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [advocateName, setAdvocateName] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<EnrollmentRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load enrollment data from JSON file
    // Handle basePath for GitHub Pages (username.github.io/repo-name)
    const getBasePath = () => {
      if (typeof window === 'undefined') return '';
      const pathname = window.location.pathname;
      // Extract repo name from URL path (first segment after domain)
      // For GitHub Pages: username.github.io/repo-name/...
      const pathParts = pathname.split('/').filter(Boolean);
      return pathParts.length > 0 ? `/${pathParts[0]}` : '';
    };
    
    const basePath = getBasePath();
    const dataPath = `${basePath}/data/enrollment.json`;
    
    fetch(dataPath)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load enrollment data: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEnrollmentData(data);
        } else {
          console.warn('Enrollment data is empty or invalid');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading enrollment data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Search Portal Section - 15% of screen */}
      <section id="search" className="h-[15vh] min-h-[120px] max-h-[200px] bg-white dark:bg-gray-800 flex items-center overflow-hidden relative">
        {loading ? (
          <div className="text-center w-full">
            <div className="text-gray-500 dark:text-gray-400 text-sm">Loading enrollment data...</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              If this persists, please run: npm run convert-excel
            </div>
          </div>
        ) : enrollmentData.length === 0 ? (
          <div className="text-center w-full">
            <div className="text-gray-500 dark:text-gray-400 mb-2 text-sm">
              Enrollment data not found. Please convert Excel file first.
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              Run: npm run convert-excel
            </div>
          </div>
        ) : (
          <SearchPortal 
            data={enrollmentData} 
            onAdvocateFound={setAdvocateName}
            onResultsChange={(results, query) => {
              setSearchResults(results);
              setSearchQuery(query);
            }}
          />
        )}
      </section>

      {/* Search Results Section - Overlay or below search */}
      {searchResults.length > 0 && (
        <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="w-full max-w-6xl mx-auto px-4">
            <SearchResults results={searchResults} query={searchQuery} />
          </div>
        </section>
      )}

      {/* Candidate Campaign Section - Starts immediately below search */}
      <section id="candidate" className="bg-gray-50 dark:bg-gray-900">
        <CandidateProfile candidate={sampleCandidateData} advocateName={advocateName} />
      </section>

      {/* Floating Candidate Image */}
      <CandidateFloater />
    </main>
  );
}
