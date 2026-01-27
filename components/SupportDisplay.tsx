'use client';

interface SupportStats {
  firstPriority: number;
  secondPriority: number;
  thirdPriority?: number;
  totalSupporters?: number;
}

interface SupportDisplayProps {
  stats: SupportStats;
}

export default function SupportDisplay({ stats }: SupportDisplayProps) {
  const totalVotes = stats.firstPriority + stats.secondPriority + (stats.thirdPriority || 0);
  const firstPriorityPercent = totalVotes > 0 ? (stats.firstPriority / totalVotes) * 100 : 0;
  const secondPriorityPercent = totalVotes > 0 ? (stats.secondPriority / totalVotes) * 100 : 0;
  const thirdPriorityPercent = stats.thirdPriority && totalVotes > 0 
    ? (stats.thirdPriority / totalVotes) * 100 
    : 0;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Support Statistics
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* 1st Priority */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
            1st Priority Votes
          </div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {stats.firstPriority.toLocaleString()}
          </div>
          {totalVotes > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {firstPriorityPercent.toFixed(1)}% of total
            </div>
          )}
          <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-500"
              style={{ width: `${firstPriorityPercent}%` }}
            />
          </div>
        </div>

        {/* 2nd Priority */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
            2nd Priority Votes
          </div>
          <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
            {stats.secondPriority.toLocaleString()}
          </div>
          {totalVotes > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {secondPriorityPercent.toFixed(1)}% of total
            </div>
          )}
          <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-500"
              style={{ width: `${secondPriorityPercent}%` }}
            />
          </div>
        </div>

        {/* 3rd Priority (if applicable) */}
        {stats.thirdPriority !== undefined && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
              3rd Priority Votes
            </div>
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {stats.thirdPriority.toLocaleString()}
            </div>
            {totalVotes > 0 && (
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {thirdPriorityPercent.toFixed(1)}% of total
              </div>
            )}
            <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 dark:bg-purple-500 transition-all duration-500"
                style={{ width: `${thirdPriorityPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {stats.totalSupporters && (
        <div className="text-center">
          <div className="inline-block bg-white dark:bg-gray-800 rounded-lg px-6 py-3 shadow-md">
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
              Total Supporters
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalSupporters.toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
