import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onDateChange: (range: { start: string; end: string }) => void;
}

const DateRangePicker = ({ startDate, endDate, onDateChange }: DateRangePickerProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          type="date"
          value={startDate}
          onChange={(e) => onDateChange({ start: e.target.value, end: endDate })}
          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <span className="text-gray-500">to</span>
      <div className="relative">
        <input
          type="date"
          value={endDate}
          onChange={(e) => onDateChange({ start: startDate, end: e.target.value })}
          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default DateRangePicker;