export function generateCSV(data, columns) {
  if (!data || !data.length) return '';
  
  const header = columns.map(col => `"${col.label.replace(/"/g, '""')}"`).join(',');
  
  const rows = data.map(row => {
    return columns.map(col => {
      let val = row[col.key];
      
      // Handle nested properties if needed, or nulls
      if (val === null || val === undefined) val = '';
      
      // Escape quotes
      const stringVal = String(val).replace(/"/g, '""');
      return `"${stringVal}"`;
    }).join(',');
  });
  
  return [header, ...rows].join('\n');
}
