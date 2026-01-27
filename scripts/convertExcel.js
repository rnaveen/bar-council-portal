const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Path to the Excel file
const excelFilePath = path.join(__dirname, '../../Enrolment List.xlsx');
const outputPath = path.join(__dirname, '../public/data/enrollment.json');

// Ensure data directory exists
const dataDir = path.dirname(outputPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log('Reading Excel file:', excelFilePath);

// Read the Excel file
const workbook = XLSX.readFile(excelFilePath);

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

console.log('Sheet name:', sheetName);
console.log('Total sheets:', workbook.SheetNames.length);

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet, { defval: null });

console.log('Total rows:', data.length);
console.log('\nFirst row (sample):', data[0]);
console.log('\nColumn names:', Object.keys(data[0] || {}));

// Normalize column names (case-insensitive mapping)
const normalizedData = data.map((row) => {
  const normalized = {};
  
  // Find columns (case-insensitive)
  const columns = Object.keys(row);
  const columnMap = {};
  
  columns.forEach(col => {
    const lowerCol = col.toLowerCase().trim();
    columnMap[lowerCol] = col;
  });
  
  // Map standard fields
  const enrollmentKeys = ['enrolment number', 'enrollment number', 'enrolment no', 'enrollment no', 'enroll no', 'enroll number'];
  const nameKeys = ['name', 'advocate name', 'full name', 'candidate name', 'advocate'];
  const phoneKeys = ['phone', 'phone number', 'mobile', 'mobile number', 'contact number', 'contact'];
  const yearKeys = ['year', 'enrollment year', 'enrolment year', 'enrol year'];
  
  // Find and map enrollment number
  enrollmentKeys.forEach(key => {
    if (columnMap[key]) {
      normalized.enrollmentNumber = row[columnMap[key]];
    }
  });
  
  // Find and map name
  nameKeys.forEach(key => {
    if (columnMap[key] && !normalized.name) {
      normalized.name = row[columnMap[key]];
    }
  });
  
  // Find and map phone
  phoneKeys.forEach(key => {
    if (columnMap[key] && !normalized.phoneNumber) {
      normalized.phoneNumber = row[columnMap[key]];
    }
  });
  
  // Find and map year
  yearKeys.forEach(key => {
    if (columnMap[key] && !normalized.year) {
      normalized.year = row[columnMap[key]];
    }
  });
  
  // Preserve all original columns
  columns.forEach(col => {
    if (!normalized[col]) {
      normalized[col] = row[col];
    }
  });
  
  return normalized;
});

// Save to JSON file
fs.writeFileSync(outputPath, JSON.stringify(normalizedData, null, 2), 'utf8');

console.log('\n✅ Conversion complete!');
console.log('Output saved to:', outputPath);
console.log('Total records:', normalizedData.length);

// Show sample of normalized data
if (normalizedData.length > 0) {
  console.log('\nSample normalized record:');
  console.log(JSON.stringify(normalizedData[0], null, 2));
}
