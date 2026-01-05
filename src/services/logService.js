
/**
 * Fetches and parses log data from the given source URL.
 * @param {string} sourceUrl - The URL to fetch logs from.
 * @returns {Promise<Array>} - A promise that resolves to an array of parsed log objects.
 */
export const fetchLogs = async (sourceUrl, options = {}) => {
  const { limit, signal } = options;
  
  const response = await fetch(sourceUrl, { signal });
  if (!response.ok) {
      throw new Error(`Failed to fetch logs: ${response.statusText}`);
  }
  const text = await response.text();

  

  let lines = text.trim().split("\n");
  
  // Optimization: Only process the last N lines
  if (limit && lines.length > limit) {
    lines = lines.slice(-limit);
  }

  const parsedData = lines.map((line, index) => {
    const userMatch = line.match(/USER:\s*(\d+)/);
    const actionMatch = line.match(/,\s*([^,]+),\s*Data:/);
    const dataMatch = line.match(/Data:\s*({[^}]+})/);
    const dateMatch = line.match(/Date:\s*(.+)$/);

    return {
      id: String(index + 1).padStart(3, "0"),
      userCode: userMatch ? userMatch[1] : "N/A",
      action: actionMatch ? actionMatch[1].trim() : "N/A",
      data: dataMatch ? dataMatch[1] : "{}",
      productcode: (() => {
        try {
          const parsed = JSON.parse(dataMatch ? dataMatch[1] : "{}");
          // Check mostly common variations of product code keys if needed, 
          // but strict to original logic: productcode or productCode
          return parsed.productcode || parsed.productCode || "N/A";
        } catch {
          return "N/A";
        }
      })(),
      timestamp: dateMatch ? dateMatch[1] : "N/A",
      // fullText removed to save memory. Reconstruct on demand if needed.
      status: "True",
    };
  });

  return parsedData;
};
