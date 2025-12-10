import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useCategories } from '../hooks/useCategories';

interface CategoriesContextType {
  categories: string[];
  loading: boolean;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  loadData: () => void;
  saveData: (categories: string[]) => void;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const categoriesData = useCategories();

  return (
    <CategoriesContext.Provider value={categoriesData}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategoriesContext must be used within CategoriesProvider');
  }
  return context;
};
