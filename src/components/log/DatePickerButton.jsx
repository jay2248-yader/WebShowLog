import React from "react";
import { Calendar } from "lucide-react";

function DatePickerButton({ date, onClick }) {
  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year} / ${month} / ${day}`;
  };

  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-2
        border border-[#0F75BC]
        bg-white
        rounded px-3 py-2 text-sm
        hover:border-[#0C5AA7]
        focus:outline-none
        focus:ring-2 focus:ring-[#0F75BC]
       min-w-37.5
      "
    >
      <span className="text-[#0F75BC]">{formatDate(date)}</span>
      <Calendar className="w-4 h-4 text-[#0F75BC] ml-auto" />
    </button>
  );
}

export default DatePickerButton;
