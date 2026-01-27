export interface EnrollmentRecord {
  enrollmentNumber?: string;
  name?: string;
  phoneNumber?: string;
  year?: string | number;
  [key: string]: any; // Allow other fields from Excel
}

/**
 * Search enrollment records by query string
 * Searches across ALL fields in the record
 */
export function searchEnrollments(
  records: EnrollmentRecord[],
  query: string
): EnrollmentRecord[] {
  if (!query || query.trim() === '') {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const normalizedSearchTerm = searchTerm.replace(/\s+/g, '');

  return records.filter((record) => {
    // Search across ALL fields dynamically
    for (const key in record) {
      if (record.hasOwnProperty(key)) {
        const value = record[key];
        
        // Skip null, undefined, or empty values
        if (value === null || value === undefined || value === '') {
          continue;
        }

        // Convert value to string and normalize
        const stringValue = String(value).toLowerCase();
        const normalizedValue = stringValue.replace(/\s+/g, '');

        // Check if search term matches (with or without spaces)
        if (stringValue.includes(searchTerm) || normalizedValue.includes(normalizedSearchTerm)) {
          return true;
        }
      }
    }

    return false;
  });
}

/**
 * Highlight matching text in a string
 */
export function highlightMatch(text: string, query: string): string {
  if (!query || !text) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}
