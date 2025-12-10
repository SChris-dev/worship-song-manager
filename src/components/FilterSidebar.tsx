import React from 'react';
import { useCategoriesContext } from '../contexts/CategoriesContext';

interface FilterSidebarProps {
  selectedCategory: string;
  selectedKey: string;
  selectedTempo: string;
  onCategoryChange: (category: string) => void;
  onKeyChange: (key: string) => void;
  onTempoChange: (tempo: string) => void;
}

const KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const TEMPOS = ['60', '70', '80', '90', '95', '100', '110', '120', '130', '140'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  selectedKey,
  selectedTempo,
  onCategoryChange,
  onKeyChange,
  onTempoChange,
}) => {
  const { categories } = useCategoriesContext();
  const activeFiltersCount = [selectedCategory, selectedKey, selectedTempo].filter(Boolean).length;

  return (
    <div className="w-64 bg-white dark:bg-gray-800 p-6 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </h2>
        {activeFiltersCount > 0 && (
          <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 text-xs font-semibold rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </div>
      
      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-gray-900 dark:text-white"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Key Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Key
        </label>
        <select
          value={selectedKey}
          onChange={(e) => onKeyChange(e.target.value)}
          className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-gray-900 dark:text-white"
        >
          <option value="">All Keys</option>
          {KEYS.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      {/* Tempo Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Tempo (BPM)
        </label>
        <select
          value={selectedTempo}
          onChange={(e) => onTempoChange(e.target.value)}
          className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-gray-900 dark:text-white"
        >
          <option value="">All Tempos</option>
          {TEMPOS.map((tempo) => (
            <option key={tempo} value={tempo}>
              {tempo} BPM
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => {
          onCategoryChange('');
          onKeyChange('');
          onTempoChange('');
        }}
        disabled={activeFiltersCount === 0}
        className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Clear Filters
      </button>
    </div>
  );
};
