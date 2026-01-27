'use client';

interface CandidateHeroProps {
  name: string;
  serialNumber: string;
  imageUrl?: string;
  advocateName?: string;
}

export default function CandidateHero({ name, serialNumber, imageUrl, advocateName }: CandidateHeroProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-3 sm:p-4 md:p-5">
        <div className="mb-2">
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            {advocateName ? (
              <>Dear <span className="font-semibold">{advocateName}</span>, </>
            ) : (
              <>Dear Advocate, </>
            )}
            Kindly consider me for your first/next best preferential vote in the Telangana State Bar Council elections.
          </p>
        </div>

        {/* Prominent Voting Instruction Box */}
        <div className="border-l-4 border-blue-600 bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 mb-4 sm:mb-6 rounded-r">
          <p className="text-gray-800 dark:text-gray-200 font-medium text-sm sm:text-base">
            WRITE <span className="font-bold text-orange-600 dark:text-orange-400">ONE</span> AT S.NO.{' '}
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-600 dark:text-orange-400 block sm:inline">
              {serialNumber}
            </span>
          </p>
        </div>

          {/* Voting Details Table - Mobile responsive */}
          <div className="border-2 border-gray-800 dark:border-gray-600 rounded overflow-x-auto">
          <table className="w-full min-w-[300px]">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-3 sm:px-4 py-2 text-left border-r border-gray-300 dark:border-gray-600 font-semibold text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                  S.No
                </th>
                <th className="px-3 sm:px-4 py-2 text-left border-r border-gray-300 dark:border-gray-600 font-semibold text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                  Name
                </th>
                <th className="px-3 sm:px-4 py-2 text-left font-semibold text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                  Preferential Vote
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-800">
                <td className="px-3 sm:px-4 py-2 sm:py-3 border-r border-gray-300 dark:border-gray-600 font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                  {serialNumber}
                </td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 border-r border-gray-300 dark:border-gray-600 font-bold text-xs sm:text-sm uppercase text-gray-900 dark:text-gray-100">
                  {name}
                </td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 flex items-center">
                  <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100 mr-2">ONE</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
