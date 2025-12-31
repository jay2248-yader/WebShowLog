export const formatJSONData = (dataString) => {
  try {
    const parsed = JSON.parse(dataString);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return dataString;
  }
};
