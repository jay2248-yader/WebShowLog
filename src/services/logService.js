
/**
 * Fetches and parses log data from the given source URL.
 * @param {string} sourceUrl - The URL to fetch logs from.
 * @returns {Promise<Array>} - A promise that resolves to an array of parsed log objects.
 */
export const fetchLogs = async (sourceUrl) => {
  const response = await fetch(sourceUrl);
  if (!response.ok) {
      throw new Error(`Failed to fetch logs: ${response.statusText}`);
  }
  const text = await response.text();

  

  const lines = text.trim().split("\n");
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
      fullText: `USER: ${userMatch ? userMatch[1] : "N/A"}, ${actionMatch ? actionMatch[1].trim() : "N/A"}, Data: ${dataMatch ? dataMatch[1] : "{}"}, Date: ${dateMatch ? dateMatch[1] : "N/A"}`,
      status: "True",
    };
  });

  return parsedData;
};
