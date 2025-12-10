import { useState, useEffect } from 'react';
import { loadFromStorage, saveToLocalStorage } from '../utils/storage';
import categoriesData from '../data/categories.json';

const STORAGE_KEY = 'worship-categories';

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const loaded = loadFromStorage<string[]>(STORAGE_KEY, categoriesData as string[]);
    setCategories(loaded);
    setLoading(false);
  };

  const saveData = (updatedCategories: string[]) => {
    setCategories(updatedCategories);
    saveToLocalStorage(STORAGE_KEY, updatedCategories);
  };

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      const updatedCategories = [...categories, category];
      saveData(updatedCategories);
    }
  };

  const removeCategory = (category: string) => {
    const updatedCategories = categories.filter((cat) => cat !== category);
    saveData(updatedCategories);
  };

  return {
    categories,
    loading,
    addCategory,
    removeCategory,
    loadData,
    saveData,
  };
};
