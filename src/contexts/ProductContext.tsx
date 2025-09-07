import { createContext, useState, useMemo, useCallback, useEffect, type ReactNode } from 'react';
import toast from 'react-hot-toast'
import { type Product } from '../interfaces/product';
import { type ApiResponse } from '../interfaces/ApiResponse';
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
      const res: ApiResponse<Product> = await productService.createProduct(product);
      setProducts(prev => [...prev, res.data]);
      toast.success('Producto creado correctamente')
    } catch (err) {
      console.error('Error al crear producto', err);
      const message = err instanceof Error ? err.message : String(err)
      if (message?.includes('ya existe')) {
        toast.error('El producto ya existe')
      } else if (message?.includes('Validation')) {
        toast.error('Campos inválidos o incompletos')
      } else {
        toast.error('Error al crear producto')
      }
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
