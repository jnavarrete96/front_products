import { useContext } from 'react';
import { ProductContext } from './ProductContext';

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext debe usarse dentro de ProductProvider');
  }
  return context;
};