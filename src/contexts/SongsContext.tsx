import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Song } from '../types';
import { useSongs } from '../hooks/useSongs';

interface SongsContextType {
  songs: Song[];
  loading: boolean;
  addSong: (song: Omit<Song, 'id'>) => Song;
  updateSong: (id: string, updates: Partial<Song>) => void;
  deleteSong: (id: string) => void;
  getSongById: (id: string) => Song | undefined;
  loadData: () => void;
  saveData: (songs: Song[]) => void;
}

const SongsContext = createContext<SongsContextType | undefined>(undefined);

export const SongsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const songsData = useSongs();

  return (
    <SongsContext.Provider value={songsData}>
      {children}
    </SongsContext.Provider>
  );
};

export const useSongsContext = () => {
  const context = useContext(SongsContext);
  if (!context) {
    throw new Error('useSongsContext must be used within SongsProvider');
  }
  return context;
};
