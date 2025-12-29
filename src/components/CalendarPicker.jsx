import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function CalendarPicker({ 
  currentMonth, 
  setCurrentMonth, 
  selectedDate, 
  onDateClick, 
  onClose,
  isEndPicker = false,
  startDate 
}) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const days = [];

  // Previous month days
  for (let i = 0; i < firstDay; i++) {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonthDays = getDaysInMonth(prevYear, prevMonth);
    const day = prevMonthDays - firstDay + i + 1;
    days.push(
      <button
        key={`prev-${i}`}
        onClick={() => {
          setCurrentMonth(new Date(prevYear, prevMonth, 1));
          onDateClick(new Date(prevYear, prevMonth, day));
        }}
        className="h-9 w-9 text-sm text-gray-400 hover:bg-gray-100 rounded flex items-center justify-center"
      >
        {day}
      </button>
    );
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isSelected = date.toDateString() === selectedDate.toDateString();
    const isInRange = !isEndPicker && startDate && date > startDate && date <= selectedDate;
    const isDisabled = isEndPicker && startDate && date < startDate;

    days.push(
      <button
        key={day}
        onClick={() => onDateClick(date)}
        disabled={isDisabled}
        className={`h-9 w-9 text-sm rounded flex items-center justify-center transition-colors
          ${isSelected ? "bg-[#0F75BC] text-white font-semibold" : ""}
          ${isInRange ? "bg-blue-100 text-blue-600" : ""}
          ${!isSelected && !isInRange && !isDisabled ? "hover:bg-gray-100 text-gray-700" : ""}
          ${isDisabled ? "text-gray-300 cursor-not-allowed" : ""}
        `}
      >
        {day}
      </button>
    );
  }

  // Next month days
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  const remainingCells = totalCells - (firstDay + daysInMonth);
  for (let i = 1; i <= remainingCells; i++) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    days.push(
      <button
        key={`next-${i}`}
        onClick={() => {
          setCurrentMonth(new Date(nextYear, nextMonth, 1));
          onDateClick(new Date(nextYear, nextMonth, i));
        }}
        className="h-9 w-9 text-sm text-gray-400 hover:bg-gray-100 rounded flex items-center justify-center"
      >
        {i}
      </button>
    );
  }

  return (
    <div className="w-72 bg-white shadow-xl rounded-lg border border-gray-200">
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-5 h-5 text-[#0F75BC]" />
          </button>
          <div className="font-semibold text-[#0F75BC]">
            {monthNames[month]} - {year}
          </div>
          <button
            onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight className="w-5 h-5 text-[#0F75BC]" />
          </button>
        </div>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="h-9 flex items-center justify-center text-xs font-semibold text-gray-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
      <div className="p-3 border-t border-gray-200 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-1.5 text-sm text-[#0F75BC]  border border-[#0F75BC]  rounded hover:bg-blue-50"
        >
          ຍົກເລີກ
        </button>
        <button
          onClick={onClose}
          className="px-4 py-1.5 text-sm bg-[#0F75BC]  text-white rounded hover:bg-blue-500"
        >
          ເລືອກ
        </button>
      </div>
    </div>
  );
}

export default CalendarPicker;