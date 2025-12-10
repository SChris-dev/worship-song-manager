import React, { useMemo } from 'react';
import { useSongsContext } from '../contexts/SongsContext';
import { useUsageContext } from '../contexts/UsageContext';
import { ChartCard } from '../components/ChartCard';
import { sortSongsByUses } from '../utils/helpers';

export const Analytics: React.FC = () => {
  const { songs } = useSongsContext();
  const { usage, getSongUsageCount } = useUsageContext();

  const sortedSongs = useMemo(() => {
    return sortSongsByUses(songs, usage);
  }, [songs, usage]);

  const mostUsedData = useMemo(() => {
    return sortedSongs
      .slice(0, 10)
      .map((song) => ({
        name: song.title.length > 20 ? song.title.substring(0, 20) + '...' : song.title,
        value: getSongUsageCount(song.id),
      }))
      .filter((item) => item.value > 0);
  }, [sortedSongs, getSongUsageCount]);

  const leastUsedData = useMemo(() => {
    return [...sortedSongs]
      .reverse()
      .slice(0, 10)
      .map((song) => ({
        name: song.title.length > 20 ? song.title.substring(0, 20) + '...' : song.title,
        value: getSongUsageCount(song.id),
      }));
  }, [sortedSongs, getSongUsageCount]);

  const categoryData = useMemo(() => {
    const categoryCount: Record<string, number> = {};
    
    Object.values(usage).forEach((monthData) => {
      Object.values(monthData).forEach((weekData) => {
        if (weekData) {
          Object.values(weekData).forEach((songId) => {
            const song = songs.find((s) => s.id === songId);
            if (song) {
              categoryCount[song.category] = (categoryCount[song.category] || 0) + 1;
            }
          });
        }
      });
    });

    return Object.entries(categoryCount).map(([name, value]) => ({ name, value }));
  }, [songs, usage]);

  return (
    <div className="p-6 lg:p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your worship song usage and trends</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 shadow-lg text-white animate-scale-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium opacity-90 mb-2">Total Songs</h3>
                <p className="text-4xl font-bold">{songs.length}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg text-white animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium opacity-90 mb-2">Total Usage Count</h3>
                <p className="text-4xl font-bold">
                  {songs.reduce((sum, song) => sum + getSongUsageCount(song.id), 0)}
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {mostUsedData.length > 0 && (
            <ChartCard title="Most Used Songs" data={mostUsedData} />
          )}
          
          <ChartCard title="Least Used Songs" data={leastUsedData} />
          
          {categoryData.length > 0 && (
            <ChartCard title="Usage by Category" data={categoryData} />
          )}
        </div>
      </div>
    </div>
  );
};
