import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const CropCalendar = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  // Generate calendar days
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Sample events
  const events = [
    { date: 5, title: 'Plant Corn', type: 'planting', color: 'green' },
    { date: 12, title: 'Harvest Wheat', type: 'harvest', color: 'yellow' },
    { date: 15, title: 'Fertilize Fields', type: 'maintenance', color: 'blue' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              {currentMonth} {currentYear}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="bg-gray-50 px-2 py-3">
              <div className="text-xs font-medium text-gray-500 text-center">
                {day}
              </div>
            </div>
          ))}
          {days.map((day, index) => (
            <div key={index} className="bg-white px-2 py-3 h-32">
              {day && (
                <>
                  <div className="text-sm text-gray-500">{day}</div>
                  <div className="mt-1 space-y-1">
                    {events
                      .filter((event) => event.date === day)
                      .map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`px-2 py-1 rounded text-xs font-medium bg-${event.color}-100 text-${event.color}-800`}
                        >
                          {event.title}
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CropCalendar;