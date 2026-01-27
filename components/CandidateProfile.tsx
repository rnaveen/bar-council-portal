'use client';

import CandidateHero from './CandidateHero';

interface CandidateProfileProps {
  candidate: {
    name: string;
    fullName: string; // Full name like "G. JITHENDER REDDY"
    serialNumber: string; // Serial number like "49"
    imageUrl?: string;
    credentials: string[]; // Ex. Member, Ex. President, etc.
    contact: {
      phone?: string;
      email?: string;
    };
    pollingDate?: string; // Format: "Friday, 30 January 2026"
    slogan?: string; // Campaign slogan
    bio?: string;
    achievements?: string[];
    manifesto?: string[];
  };
  advocateName?: string | null; // Name of the advocate from search result
}

export default function CandidateProfile({ candidate, advocateName }: CandidateProfileProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-2 pb-8 space-y-4">
      {/* Hero Section with Voting Instructions */}
      <CandidateHero
        name={candidate.name}
        serialNumber={candidate.serialNumber}
        imageUrl={candidate.imageUrl}
        advocateName={advocateName ? String(advocateName) : undefined}
      />

      {/* Full Name Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          {candidate.fullName}
        </h2>
        
        {/* Campaign Slogan */}
        {candidate.slogan && (
          <p className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6 italic border-l-4 border-blue-600 dark:border-blue-400 pl-4">
            {candidate.slogan}
          </p>
        )}

        {/* Credentials */}
        {candidate.credentials && candidate.credentials.length > 0 && (
          <div className="space-y-2 mb-6">
            {candidate.credentials.map((credential, index) => (
              <p key={index} className="text-lg text-gray-700 dark:text-gray-300">
                {credential}
              </p>
            ))}
          </div>
        )}

        {/* Contact and Polling Date */}
        <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {candidate.contact.phone && (
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-pink-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href={`tel:${candidate.contact.phone.replace(/\s+/g, '')}`}
                  className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {candidate.contact.phone}
                </a>
              </div>
            )}
            
            {candidate.pollingDate && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-600 dark:text-gray-400 mb-1">VOTING DAY</span>
                <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  {candidate.pollingDate}
                </span>
              </div>
            )}
          </div>

          {candidate.contact.email && (
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href={`mailto:${candidate.contact.email}`}
                className="text-lg text-blue-600 dark:text-blue-400 hover:underline"
              >
                {candidate.contact.email}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Additional Sections (Bio, Achievements, Manifesto) - Optional */}
      {candidate.bio && (
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            About
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {candidate.bio}
          </p>
        </section>
      )}

      {candidate.achievements && candidate.achievements.length > 0 && (
        <section className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Key Achievements
          </h2>
          <ul className="space-y-2">
            {candidate.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-lg text-gray-700 dark:text-gray-300">
                  {achievement}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {candidate.manifesto && candidate.manifesto.length > 0 && (
        <section className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Vision & Manifesto
          </h2>
          <div className="space-y-2">
            {candidate.manifesto.map((point, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                  {index + 1}
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 flex-1">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
