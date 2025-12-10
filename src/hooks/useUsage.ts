import { useState, useEffect } from 'react';
import type { UsageData, SlotType } from '../types';
import { loadFromStorage, saveToLocalStorage } from '../utils/storage';
import usageData from '../data/usage.json';

const STORAGE_KEY = 'worship-usage';

export const useUsage = () => {
  const [usage, setUsage] = useState<UsageData>({});
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const loaded = loadFromStorage<UsageData>(STORAGE_KEY, usageData as UsageData);
    setUsage(loaded);
    setLoading(false);
  };

  const saveData = (updatedUsage: UsageData) => {
    setUsage(updatedUsage);
    saveToLocalStorage(STORAGE_KEY, updatedUsage);
  };

  const setSongForSlot = (month: string, week: string, slot: SlotType, songId: string) => {
    const updatedUsage = { ...usage };
    
    if (!updatedUsage[month]) {
      updatedUsage[month] = {};
    }
    
    if (!updatedUsage[month][week]) {
      updatedUsage[month][week] = {};
    }
    
    updatedUsage[month][week][slot] = songId;
    saveData(updatedUsage);
  };

  const removeSongFromSlot = (month: string, week: string, slot: SlotType) => {
    const updatedUsage = { ...usage };
    
    if (updatedUsage[month]?.[week]) {
      delete updatedUsage[month][week][slot];
      saveData(updatedUsage);
    }
  };

  const getSongForSlot = (month: string, week: string, slot: SlotType): string | undefined => {
    return usage[month]?.[week]?.[slot];
  };

  const getSongUsageCount = (songId: string): number => {
    let count = 0;
    Object.values(usage).forEach((monthData) => {
      Object.values(monthData).forEach((weekData) => {
        if (weekData) {
          Object.values(weekData).forEach((id) => {
            if (id === songId) count++;
          });
        }
      });
    });
    return count;
  };

  return {
    usage,
    loading,
    setSongForSlot,
    removeSongFromSlot,
    getSongForSlot,
    getSongUsageCount,
    loadData,
    saveData,
  };
};
