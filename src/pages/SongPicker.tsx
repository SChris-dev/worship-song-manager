import React, { useState } from 'react';
import { useUsageContext } from '../contexts/UsageContext';
import { PickerWeekCard } from '../components/PickerWeekCard';
import { SongSelectModal } from '../components/SongSelectModal';
import type { SlotType } from '../types';

const WEEKS = ['week1', 'week2', 'week3', 'week4', 'week5'];

export const SongPicker: React.FC = () => {
  const { setSongForSlot } = useUsageContext();
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlot, setCurrentSlot] = useState<{
    week: string;
    slot: SlotType;
  } | null>(null);

  const handleSlotClick = (week: string, slot: SlotType) => {
    setCurrentSlot({ week, slot });
    setIsModalOpen(true);
  };

  const handleSongSelect = (songId: string) => {
    if (currentSlot) {
      setSongForSlot(selectedMonth, currentSlot.week, currentSlot.slot, songId);
      setCurrentSlot(null);
    }
  };

  const generateMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    
    // Generate options for 6 months back and 12 months forward
    for (let i = -6; i <= 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      options.push({ value, label });
    }
    
    return options;
  };

  return (
    <div className="p-6 lg:p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Song Picker</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Plan and schedule worship songs for each week</p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <label className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Select Month:
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-gray-900 dark:text-white font-medium"
            >
              {generateMonthOptions().map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WEEKS.map((week, index) => (
            <div key={week} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <PickerWeekCard
                month={selectedMonth}
                week={week}
                onSlotClick={(slot) => handleSlotClick(week, slot)}
              />
            </div>
          ))}
        </div>

        <SongSelectModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentSlot(null);
          }}
          onSelect={handleSongSelect}
          slot={currentSlot?.slot || 'opening'}
        />
      </div>
    </div>
  );
};
