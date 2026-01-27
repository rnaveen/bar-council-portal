'use client';

import { EnrollmentRecord } from '@/lib/searchUtils';

interface VoterSuccessProps {
  record: EnrollmentRecord;
}

export default function VoterSuccess({ record }: VoterSuccessProps) {
  // Helper to get field value by various possible key names
  const getField = (possibleKeys: string[]): string | number | undefined => {
    for (const key of possibleKeys) {
      if (record[key] !== undefined && record[key] !== null && record[key] !== '') {
        return record[key];
      }
    }
    return undefined;
  };

  // Get fields with fallbacks
  const serialNumber = getField(['S.No', 'Serial Number', 'SNo', 'S.No.']);
  const enrollmentNumber = getField(['Entro.No', 'enrollmentNumber', 'Enrollment Number', 'Enrolment No', 'Enrolment Number']);
  const name = getField(['AdvocateName', 'name', 'Name', 'Full Name', 'Name of the Advocate']);
  const address = getField(['Address', 'address']);
  const barAssociation = getField(['BarAssociation', 'Bar Association', 'barAssociation']);
  const phoneNumber = getField(['Mobile', 'phoneNumber', 'Phone', 'Contact Number', 'Mobile Number', 'Phone No', 'Phone Number']);

  return (
    <div className="px-4 py-4">
      {/* Information Card - 3 rows layout with bold labels and proper overflow handling */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden max-w-3xl mx-auto border border-gray-200 dark:border-gray-700">
        {/* Row 1: S.No. and Enrolment No */}
        {(serialNumber || enrollmentNumber) && (
          <div className="flex flex-col sm:flex-row border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            {serialNumber && (
              <div className="flex-1 px-4 py-3 sm:py-4 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700">
                <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">S.No.:</span>{' '}
                <span className="text-sm sm:text-base text-gray-900 dark:text-gray-100 break-words">{String(serialNumber)}</span>
              </div>
            )}
            {enrollmentNumber && (
              <div className="flex-1 px-4 py-3 sm:py-4">
                <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">Enrolment No:</span>{' '}
                <span className="text-sm sm:text-base text-gray-900 dark:text-gray-100 break-words">{String(enrollmentNumber)}</span>
              </div>
            )}
          </div>
        )}

        {/* Row 2: Name of the Advocate */}
        {name && (
          <div className="px-4 py-3 sm:py-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
            <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">Name of the Advocate:</span>{' '}
            <span className="text-sm sm:text-base text-gray-900 dark:text-gray-100 break-words">{String(name)}</span>
          </div>
        )}

        {/* Row 3: Address, Bar Association, Phone No */}
        {(address || barAssociation || phoneNumber) && (
          <div className="flex flex-col sm:flex-row bg-gray-50 dark:bg-gray-800/50">
            {address && (
              <div className="flex-1 px-4 py-3 sm:py-4 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700">
                <div className="mb-1">
                  <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">Address:</span>
                </div>
                <div className="text-sm sm:text-base text-gray-900 dark:text-gray-100 break-words leading-relaxed">
                  {String(address)}
                </div>
              </div>
            )}
            {barAssociation && (
              <div className="flex-1 px-4 py-3 sm:py-4 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700">
                <div className="mb-1">
                  <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">Bar Association:</span>
                </div>
                <div className="text-sm sm:text-base text-gray-900 dark:text-gray-100 break-words">
                  {String(barAssociation)}
                </div>
              </div>
            )}
            {phoneNumber && (
              <div className="flex-1 px-4 py-3 sm:py-4">
                <div className="mb-1">
                  <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">Phone No:</span>
                </div>
                <div className="text-sm sm:text-base text-gray-900 dark:text-gray-100 break-words">
                  {String(phoneNumber)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
