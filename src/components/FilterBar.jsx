import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import CalendarPicker from "./CalendarPicker";
import DatePickerButton from "./DatePickerButton";

function FilterBar({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange,
  searchQuery,
  onSearchChange 
}) {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startMonth, setStartMonth] = useState(new Date(startDate.getFullYear(), startDate.getMonth(), 1));
  const [endMonth, setEndMonth] = useState(new Date(endDate.getFullYear(), endDate.getMonth(), 1));
  const startPickerRef = useRef(null);
  const endPickerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (startPickerRef.current && !startPickerRef.current.contains(event.target)) {
        setShowStartPicker(false);
      }
      if (endPickerRef.current && !endPickerRef.current.contains(event.target)) {
        setShowEndPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStartDateClick = (date) => {
    onStartDateChange(date);
    if (date > endDate) {
      onEndDateChange(date);
    }
  };

  const handleEndDateClick = (date) => {
    if (date >= startDate) {
      onEndDateChange(date);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
          <label className="text-sm text-black-600 font-medium">ເລືອກວັນທີ</label>
          
          <div className="relative" ref={startPickerRef}>
            <DatePickerButton 
              date={startDate}
              onClick={() => {
                setShowStartPicker(!showStartPicker);
                setShowEndPicker(false);
              }}
            />
            {showStartPicker && (
              <div className="absolute top-full left-0 mt-2 z-50">
                <CalendarPicker
                  currentMonth={startMonth}
                  setCurrentMonth={setStartMonth}
                  selectedDate={startDate}
                  onDateClick={handleStartDateClick}
                  onClose={() => setShowStartPicker(false)}
                  isEndPicker={false}
                  startDate={startDate}
                />
              </div>
            )}
          </div>

          <span className="text-black-500 font-medium">ຫາ</span>

          <div className="relative" ref={endPickerRef}>
            <DatePickerButton 
              date={endDate}
              onClick={() => {
                setShowEndPicker(!showEndPicker);
                setShowStartPicker(false);
              }}
            />
            {showEndPicker && (
              <div className="absolute top-full left-0 mt-2 z-50">
                <CalendarPicker
                  currentMonth={endMonth}
                  setCurrentMonth={setEndMonth}
                  selectedDate={endDate}
                  onDateClick={handleEndDateClick}
                  onClose={() => setShowEndPicker(false)}
                  isEndPicker={true}
                  startDate={startDate}
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-full sm:flex-1 sm:min-w-50 sm:max-w-md sm:ml-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="ຄົ້ນຫາ..."
              value={searchQuery}
                maxLength={20}  
              onChange={(e) => onSearchChange(e.target.value)}
              className="
                w-full
                bg-white
                border border-[#0F75BC]
                rounded-full
                px-4 py-2 pr-10
                text-sm
                text-[#0F75BC]
                placeholder-[#0F75BC]
                focus:outline-none
                focus:ring-2
                focus:ring-[#0F75BC]
              "

            />
            <Search className="w-5 h-5 text-[#0F75BC] absolute right-3 top-1/2 -translate-y-1/2" />

          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;