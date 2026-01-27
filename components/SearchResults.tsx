'use client';

import { EnrollmentRecord } from '@/lib/searchUtils';
import VoterSuccess from './VoterSuccess';

interface SearchResultsProps {
  results: EnrollmentRecord[];
  query: string;
}

export default function SearchResults({ results, query }: SearchResultsProps) {
  if (results.length === 0 && query) {
    return (
      <div className="mt-8 text-center py-12">
        <div className="text-gray-500 text-lg">No results found</div>
        <div className="text-gray-400 text-sm mt-2">
          Try searching with a different term
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  // Show Voter Success format when exactly one result is found
  if (results.length === 1) {
    return <VoterSuccess record={results[0]} />;
  }

  const highlightText = (text: string | number | undefined) => {
    if (!text) return '';
    const str = String(text);
    if (!query) return str;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return str.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>');
  };

  // Helper to get field value by various possible key names
  const getField = (record: EnrollmentRecord, possibleKeys: string[]): string | number | undefined => {
    for (const key of possibleKeys) {
      if (record[key] !== undefined && record[key] !== null && record[key] !== '') {
        return record[key];
      }
    }
    return undefined;
  };

  // Helper to format field name
  const formatFieldName = (key: string): string => {
    // Handle common field name mappings
    const mappings: { [key: string]: string } = {
      'S.No': 'Serial Number',
      'Entro.No': 'Enrollment Number',
      'AdvocateName': 'Name',
      'Mobile': 'Phone Number',
      'phoneNumber': 'Phone Number',
      'BarAssociation': 'Bar Association',
      'Address': 'Address',
    };
    
    if (mappings[key]) return mappings[key];
    
    // Format camelCase and other patterns
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/\./g, ' ')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="mt-8">
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Found {results.length} result{results.length !== 1 ? 's' : ''}
      </div>
      <div className="space-y-2">
        {results.slice(0, 50).map((record, index) => {
          // Get common fields with fallbacks
          const name = getField(record, ['AdvocateName', 'name', 'Name', 'Full Name']);
          const enrollmentNumber = getField(record, ['Entro.No', 'enrollmentNumber', 'Enrollment Number', 'Enrolment Number']);
          const phoneNumber = getField(record, ['Mobile', 'phoneNumber', 'Phone', 'Contact Number', 'Mobile Number']);
          const serialNumber = getField(record, ['S.No', 'Serial Number', 'SNo']);
          const address = getField(record, ['Address', 'address']);
          const barAssociation = getField(record, ['BarAssociation', 'Bar Association', 'barAssociation']);

          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Primary Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {name && (
                  <div>
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                      Name
                    </div>
                    <div
                      className="text-lg font-medium text-gray-900 dark:text-gray-100"
                      dangerouslySetInnerHTML={{ __html: highlightText(String(name)) }}
                    />
                  </div>
                )}
                
                {enrollmentNumber && (
                  <div>
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                      Enrollment Number
                    </div>
                    <div
                      className="text-lg font-mono text-gray-900 dark:text-gray-100"
                      dangerouslySetInnerHTML={{ __html: highlightText(String(enrollmentNumber)) }}
                    />
                  </div>
                )}
                
                {phoneNumber && (
                  <div>
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                      Phone Number
                    </div>
                    <div
                      className="text-base text-gray-900 dark:text-gray-100"
                      dangerouslySetInnerHTML={{ __html: highlightText(String(phoneNumber)) }}
                    />
                  </div>
                )}

                {serialNumber && (
                  <div>
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                      Serial Number
                    </div>
                    <div className="text-base text-gray-900 dark:text-gray-100">
                      {String(serialNumber)}
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Fields - Display ALL remaining fields */}
              {Object.keys(record).some(key => {
                const value = record[key];
                const lowerKey = key.toLowerCase();
                return value !== undefined && 
                       value !== null && 
                       value !== '' &&
                       !['advocatename', 'name', 'entro.no', 'enrollmentnumber', 'mobile', 'phonenumber', 's.no', 'serialnumber'].includes(lowerKey);
              }) && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {Object.entries(record).map(([key, value]) => {
                      const lowerKey = key.toLowerCase();
                      // Skip already displayed fields
                      if (['advocatename', 'name', 'entro.no', 'enrollmentnumber', 'mobile', 'phonenumber', 's.no', 'serialnumber'].includes(lowerKey) || 
                          !value || value === '' || value === null || value === undefined) {
                        return null;
                      }
                      return (
                        <div key={key}>
                          <span className="font-medium text-gray-600 dark:text-gray-400">
                            {formatFieldName(key)}:
                          </span>{' '}
                          <span 
                            className="text-gray-900 dark:text-gray-100"
                            dangerouslySetInnerHTML={{ __html: highlightText(String(value)) }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {results.length > 50 && (
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Showing first 50 results. Refine your search to see more specific results.
        </div>
      )}
    </div>
  );
}
