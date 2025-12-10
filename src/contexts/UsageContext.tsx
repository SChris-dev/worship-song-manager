import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { UsageData, SlotType } from '../types';
import { useUsage } from '../hooks/useUsage';

interface UsageContextType {
  usage: UsageData;
  loading: boolean;
  setSongForSlot: (month: string, week: string, slot: SlotType, songId: string) => void;
  removeSongFromSlot: (month: string, week: string, slot: SlotType) => void;
  getSongForSlot: (month: string, week: string, slot: SlotType) => string | undefined;
  getSongUsageCount: (songId: string) => number;
  loadData: () => void;
  saveData: (usage: UsageData) => void;
}

const UsageContext = createContext<UsageContextType | undefined>(undefined);

export const UsageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const usageData = useUsage();

  return (
    <UsageContext.Provider value={usageData}>
      {children}
    </UsageContext.Provider>
  );
};

export const useUsageContext = () => {
  const context = useContext(UsageContext);
  if (!context) {
    throw new Error('useUsageContext must be used within UsageProvider');
  }
  return context;
};
