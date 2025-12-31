export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const formatTimestamp = (timestamp) => {
  if (!timestamp || timestamp === "N/A") return "N/A";

  try {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  } catch {
    return timestamp;
  }
};


export const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
export const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

export const isDateInRange = (timestamp, startDate, endDate) => {
  if (!timestamp || timestamp === "N/A") return true; // Keep true to match original logic "matchesDateRange = true" on error/missing

  try {
    const rowDate = new Date(timestamp);
    const rowDateOnly = new Date(rowDate.getFullYear(), rowDate.getMonth(), rowDate.getDate());
    const startDateOnly = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    return rowDateOnly >= startDateOnly && rowDateOnly <= endDateOnly;
  } catch {
    return true;
  }
};
