import React, { useState } from 'react';
import { ClubEvent, EventCategory } from '../types';

interface EventsPageProps {
  events: ClubEvent[];
  onOpenRegisterModal: (event: ClubEvent) => void;
  onOpenAddEvent?: () => void;
  isPstUser: boolean;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  events,
  onOpenRegisterModal,
  onOpenAddEvent,
  isPstUser
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'calendar'>('cards');
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date(2026, 9, 1)); // Oct 2026

  const categories: (EventCategory | 'all')[] = [
    'all',
    'Community Service',
    'Professional Development',
    'Club Service',
    'International Service',
    'Youth & Sports'
  ];

  const filteredEvents = events.filter((e) => {
    if (selectedCategory !== 'all' && e.category !== selectedCategory) return false;
    return true;
  });

  // Calendar calculations
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    setCalendarMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCalendarMonth(new Date(year, month + 1, 1));
  };

  const [selectedDayEvents, setSelectedDayEvents] = useState<ClubEvent[] | null>(null);
  const [selectedDayNumber, setSelectedDayNumber] = useState<number | null>(null);

  const getEventsForDay = (day: number) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === formattedDate);
  };

  const handleDayClick = (day: number) => {
    const dayEvs = getEventsForDay(day);
    setSelectedDayNumber(day);
    setSelectedDayEvents(dayEvs);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      {/* Top Header */}
      <div className="bg-[#0A1931] text-white rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-pink-400 uppercase tracking-wider block">
            Official Club Gatherings & Service
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Events & Integrated Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time public calendar updated directly by the Executive PST Board.
          </p>
        </div>

        {/* View Switcher & PST Quick Action */}
        <div className="flex flex-wrap items-center gap-2">
          {isPstUser && onOpenAddEvent && (
            <button
              onClick={onOpenAddEvent}
              className="px-4 py-2 bg-[#D91B5C] hover:bg-[#BE123C] text-white rounded-lg text-xs font-bold transition-colors"
            >
              + Add Event (PST)
            </button>
          )}

          <div className="bg-white/10 p-1 rounded-lg flex items-center border border-white/10">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                viewMode === 'cards'
                  ? 'bg-white text-slate-900'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Grid Cards
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                viewMode === 'calendar'
                  ? 'bg-white text-slate-900'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Calendar View
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Avenue:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#D91B5C] text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'All Avenues' : cat}
          </button>
        ))}
      </div>

      {/* --- VIEW MODE: GRID / CARDS --- */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 text-sm">
              No events found in this category. PST executives can publish events from the portal.
            </div>
          ) : (
            filteredEvents.map((event) => {
              const isPast = new Date(event.date) < new Date('2026-09-01') || event.status === 'completed';
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Event Cover Image */}
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span className="px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-white text-slate-800">
                          {event.category}
                        </span>
                        {isPast && (
                          <span className="px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-slate-800 text-white">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2.5">
                      <div className="text-xs font-semibold text-[#D91B5C]">
                        <span>
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="mx-1.5 text-slate-300">•</span>
                        <span className="text-slate-500">{event.time.split('NPT')[0]}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {event.title}
                      </h3>

                      {event.theme && (
                        <p className="text-xs font-medium text-[#D91B5C] bg-pink-50 px-2 py-0.5 rounded border border-pink-100">
                          Theme: {event.theme}
                        </p>
                      )}

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="space-y-1 text-xs text-slate-500 pt-2 border-t border-slate-100">
                        <p className="truncate">Venue: {event.location}</p>
                        <p className="truncate">Chairperson: {event.chairperson}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-slate-500 font-semibold">
                        {event.registeredMembers.length} Registered
                      </span>

                      {!isPast ? (
                        <button
                          onClick={() => onOpenRegisterModal(event)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#D91B5C] hover:bg-[#BE123C] text-white text-xs font-bold transition-all"
                        >
                          Register Now
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400">
                          Concluded
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* --- VIEW MODE: INTEGRATED CALENDAR --- */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {monthNames[month]} {year}
              </h2>
              <p className="text-xs text-slate-500">
                Select any highlighted date with dots to view scheduled events.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevMonth}
                className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
              >
                &larr; Prev
              </button>
              <button
                onClick={() => setCalendarMonth(new Date(2026, 9, 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
              >
                Today
              </button>
              <button
                onClick={nextMonth}
                className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
              >
                Next &rarr;
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            {/* Weekday labels */}
            <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200 text-center text-xs font-bold text-slate-600 py-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 bg-white">
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[80px] p-2 bg-slate-50/50"></div>
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayEvents = getEventsForDay(day);
                const hasEvents = dayEvents.length > 0;
                const isSelected = selectedDayNumber === day;

                return (
                  <div
                    key={`day-${day}`}
                    onClick={() => handleDayClick(day)}
                    className={`min-h-[80px] p-2 transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-pink-50 ring-2 ring-[#D91B5C]'
                        : hasEvents
                        ? 'bg-pink-50/30 hover:bg-pink-50'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${hasEvents ? 'text-[#D91B5C]' : 'text-slate-700'}`}>
                        {day}
                      </span>
                      {hasEvents && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D91B5C]"></span>
                      )}
                    </div>

                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 2).map((ev) => (
                        <div
                          key={ev.id}
                          className="px-1 py-0.5 rounded text-[10px] font-bold bg-[#D91B5C] text-white truncate"
                        >
                          {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="text-[9px] text-slate-500 font-semibold block">
                          +{dayEvents.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Day Details */}
          {selectedDayNumber && (
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-800">
                  Events on {monthNames[month]} {selectedDayNumber}, {year}
                </h3>
                <button
                  onClick={() => {
                    setSelectedDayNumber(null);
                    setSelectedDayEvents(null);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                >
                  Close Day View
                </button>
              </div>

              {!selectedDayEvents || selectedDayEvents.length === 0 ? (
                <p className="text-xs text-slate-500">No scheduled events on this date.</p>
              ) : (
                <div className="space-y-2">
                  {selectedDayEvents.map((ev) => (
                    <div key={ev.id} className="p-3 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#D91B5C] uppercase">{ev.category}</span>
                        <h4 className="text-sm font-bold text-slate-900">{ev.title}</h4>
                        <p className="text-xs text-slate-500">{ev.time} • {ev.location}</p>
                      </div>
                      <button
                        onClick={() => onOpenRegisterModal(ev)}
                        className="px-3 py-1 bg-[#D91B5C] hover:bg-[#BE123C] text-white text-xs font-bold rounded transition-colors"
                      >
                        Register
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
