import { createContext, useState, useMemo, useCallback, useEffect, type ReactNode } from 'react';
import { type Product } from '../interfaces/product';
import * as productService from '../services/productService';

type ProductContextType = {
  products: Product[];
  loadProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'created_at'>) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Cargar productos desde la API
  const loadProducts = useCallback(async () => {
    try {
      const data = await productService.fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error al cargar productos', err);
    }
  }, []);

  // Crear producto y actualizar estado
  const addProduct = useCallback(async (product: Omit<Product, 'id' | 'created_at'>) => {
    try {
      const newProduct = await productService.createProduct(product);
      setProducts(prev => [...prev, newProduct]);
    } catch (err) {
      console.error('Error al crear producto', err);
    }
  }, []);

  // Eliminar producto y actualizar estado
  const removeProduct = useCallback(async (id: number) => {
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error al eliminar producto', err);
    }
  }, []);

  //cargar productos automáticamente al montar
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const value = useMemo(
    () => ({ products, loadProducts, addProduct, removeProduct }),
    [products, loadProducts, addProduct, removeProduct]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
