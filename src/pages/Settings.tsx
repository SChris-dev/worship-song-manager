import React from 'react';
import { useSongsContext } from '../contexts/SongsContext';
import { useUsageContext } from '../contexts/UsageContext';
import { useCategoriesContext } from '../contexts/CategoriesContext';
import { FileUploadButton } from '../components/FileUploadButton';
import { downloadJSON, parseJSONFile } from '../utils/storage';

export const Settings: React.FC = () => {
  const { songs, saveData: saveSongs } = useSongsContext();
  const { usage, saveData: saveUsage } = useUsageContext();
  const { categories, saveData: saveCategories } = useCategoriesContext();

  const handleBackupAll = () => {
    const backup = {
      songs,
      usage,
      categories,
      exportDate: new Date().toISOString(),
    };
    downloadJSON(backup, `worship-backup-${new Date().toISOString().split('T')[0]}.json`);
  };

  const handleBackupSongs = () => {
    downloadJSON(songs, `songs-backup-${new Date().toISOString().split('T')[0]}.json`);
  };

  const handleBackupUsage = () => {
    downloadJSON(usage, `usage-backup-${new Date().toISOString().split('T')[0]}.json`);
  };

  const handleRestoreAll = async (file: File) => {
    try {
      const data = await parseJSONFile(file);
      if (data.songs) saveSongs(data.songs);
      if (data.usage) saveUsage(data.usage);
      if (data.categories) saveCategories(data.categories);
      alert('Data restored successfully!');
      window.location.reload();
    } catch (error) {
      alert('Error restoring data. Please check the file format.');
      console.error(error);
    }
  };

  const handleRestoreSongs = async (file: File) => {
    try {
      const data = await parseJSONFile(file);
      saveSongs(data);
      alert('Songs restored successfully!');
      window.location.reload();
    } catch (error) {
      alert('Error restoring songs. Please check the file format.');
      console.error(error);
    }
  };

  const handleRestoreUsage = async (file: File) => {
    try {
      const data = await parseJSONFile(file);
      saveUsage(data);
      alert('Usage data restored successfully!');
      window.location.reload();
    } catch (error) {
      alert('Error restoring usage data. Please check the file format.');
      console.error(error);
    }
  };

  const handleResetAll = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all data? This action cannot be undone!'
      )
    ) {
      localStorage.clear();
      alert('All data has been reset. The page will now reload.');
      window.location.reload();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Backup Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4">Backup Data</h2>
        <p className="text-gray-600 mb-4">
          Download your data as JSON files for backup purposes.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleBackupAll}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Backup All Data
          </button>
          <button
            onClick={handleBackupSongs}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Backup Songs Only
          </button>
          <button
            onClick={handleBackupUsage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Backup Usage Only
          </button>
        </div>
      </div>

      {/* Restore Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4">Restore Data</h2>
        <p className="text-gray-600 mb-4">
          Upload previously backed up JSON files to restore your data.
        </p>
        <div className="flex flex-wrap gap-3">
          <FileUploadButton onFileSelect={handleRestoreAll} label="Restore All Data" />
          <FileUploadButton onFileSelect={handleRestoreSongs} label="Restore Songs Only" />
          <FileUploadButton onFileSelect={handleRestoreUsage} label="Restore Usage Only" />
        </div>
      </div>

      {/* Reset Section */}
      <div className="bg-white border border-red-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
        <p className="text-gray-600 mb-4">
          Reset all data to factory defaults. This action cannot be undone!
        </p>
        <button
          onClick={handleResetAll}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Reset All Data
        </button>
      </div>
    </div>
  );
};
