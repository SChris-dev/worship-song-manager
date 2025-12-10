import React, { useState, useMemo } from 'react';
import { useSongsContext } from '../contexts/SongsContext';
import { SearchBar } from '../components/SearchBar';
import { FilterSidebar } from '../components/FilterSidebar';
import { SongTable } from '../components/SongTable';
import { SongFormModal } from '../components/SongFormModal';
import { filterSongs } from '../utils/helpers';
import type { Song } from '../types';

export const SongBank: React.FC = () => {
  const { songs, addSong, updateSong, deleteSong } = useSongsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedKey, setSelectedKey] = useState('');
  const [selectedTempo, setSelectedTempo] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);

  const filteredSongs = useMemo(() => {
    return filterSongs(songs, searchTerm, selectedCategory, selectedKey, selectedTempo);
  }, [songs, searchTerm, selectedCategory, selectedKey, selectedTempo]);

  const handleEdit = (song: Song) => {
    setEditingSong(song);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      deleteSong(id);
    }
  };

  const handleSave = (songData: Omit<Song, 'id'>) => {
    if (editingSong) {
      updateSong(editingSong.id, songData);
    } else {
      addSong(songData);
    }
    setEditingSong(null);
  };

  const handleAddNew = () => {
    setEditingSong(null);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-full min-h-screen">
      <FilterSidebar
        selectedCategory={selectedCategory}
        selectedKey={selectedKey}
        selectedTempo={selectedTempo}
        onCategoryChange={setSelectedCategory}
        onKeyChange={setSelectedKey}
        onTempoChange={setSelectedTempo}
      />
      
      <div className="flex-1 p-6 lg:p-8 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Song Bank</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage and organize your worship songs</p>
              </div>
              <button
                onClick={handleAddNew}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 font-semibold flex items-center justify-center gap-2 group"
              >
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Song
              </button>
            </div>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-primary-600 dark:text-primary-400">{filteredSongs.length}</span> of <span className="font-semibold">{songs.length}</span> songs
            </p>
          </div>

          <SongTable songs={filteredSongs} onEdit={handleEdit} onDelete={handleDelete} />

          <SongFormModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingSong(null);
            }}
            onSave={handleSave}
            song={editingSong}
          />
        </div>
      </div>
    </div>
  );
};
