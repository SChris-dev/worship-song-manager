import type { Song } from '../types';

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Sort songs by usage count
export const sortSongsByUses = (songs: Song[], usageData: Record<string, any>): Song[] => {
  const usageCount: Record<string, number> = {};

  // Count usage across all months
  Object.values(usageData).forEach((monthData: any) => {
    Object.values(monthData).forEach((weekData: any) => {
      Object.values(weekData).forEach((songId: any) => {
        if (typeof songId === 'string') {
          usageCount[songId] = (usageCount[songId] || 0) + 1;
        }
      });
    });
  });

  return [...songs].sort((a, b) => {
    const countA = usageCount[a.id] || 0;
    const countB = usageCount[b.id] || 0;
    return countB - countA;
  });
};

// Filter songs based on criteria
export const filterSongs = (
  songs: Song[],
  searchTerm: string,
  category?: string,
  key?: string,
  tempo?: string
): Song[] => {
  return songs.filter((song) => {
    const matchesSearch = searchTerm
      ? song.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesCategory = category ? song.category === category : true;
    const matchesKey = key ? song.key === key : true;
    const matchesTempo = tempo ? song.tempo.toString() === tempo : true;

    return matchesSearch && matchesCategory && matchesKey && matchesTempo;
  });
};
