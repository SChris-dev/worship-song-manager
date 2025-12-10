import React from 'react';
import type { SlotType } from '../types';
import { useSongsContext } from '../contexts/SongsContext';
import { useUsageContext } from '../contexts/UsageContext';

interface PickerWeekCardProps {
  month: string;
  week: string;
  onSlotClick: (slot: SlotType) => void;
}

const SLOTS: { key: SlotType; label: string }[] = [
  { key: 'opening', label: 'Opening' },
  { key: 'praise', label: 'Praise' },
  { key: 'worship', label: 'Worship' },
  { key: 'persembahan', label: 'Persembahan' },
  { key: 'penutup', label: 'Penutup' },
];

export const PickerWeekCard: React.FC<PickerWeekCardProps> = ({ month, week, onSlotClick }) => {
  const { getSongById } = useSongsContext();
  const { getSongForSlot } = useUsageContext();

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-lg card-shadow hover:shadow-xl transition-all">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/30">
          <span className="text-white font-bold text-sm">{week.replace('week', 'W')}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize">
          {week.replace('week', 'Week ')}
        </h3>
      </div>
      <div className="space-y-2">
        {SLOTS.map(({ key, label }) => {
          const songId = getSongForSlot(month, week, key);
          const song = songId ? getSongById(songId) : null;

          return (
            <button
              key={key}
              onClick={() => onSlotClick(key)}
              className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-600 transition-all group"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  {label}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                  {song ? song.title : (
                    <span className="text-gray-400 dark:text-gray-500 italic">Click to select</span>
                  )}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
