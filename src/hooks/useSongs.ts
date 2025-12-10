import { useState, useEffect } from 'react';
import type { Song } from '../types';
import { loadFromStorage, saveToLocalStorage } from '../utils/storage';
import { generateId } from '../utils/helpers';
import songsData from '../data/songs.json';

const STORAGE_KEY = 'worship-songs';

export const useSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const loaded = loadFromStorage<Song[]>(STORAGE_KEY, songsData as Song[]);
    setSongs(loaded);
    setLoading(false);
  };

  const saveData = (updatedSongs: Song[]) => {
    setSongs(updatedSongs);
    saveToLocalStorage(STORAGE_KEY, updatedSongs);
  };

  const addSong = (song: Omit<Song, 'id'>) => {
    const newSong: Song = {
      ...song,
      id: generateId(),
    };
    const updatedSongs = [...songs, newSong];
    saveData(updatedSongs);
    return newSong;
  };

  const updateSong = (id: string, updates: Partial<Song>) => {
    const updatedSongs = songs.map((song) =>
      song.id === id ? { ...song, ...updates } : song
    );
    saveData(updatedSongs);
  };

  const deleteSong = (id: string) => {
    const updatedSongs = songs.filter((song) => song.id !== id);
    saveData(updatedSongs);
  };

  const getSongById = (id: string): Song | undefined => {
    return songs.find((song) => song.id === id);
  };

  return {
    songs,
    loading,
    addSong,
    updateSong,
    deleteSong,
    getSongById,
    loadData,
    saveData,
  };
};
