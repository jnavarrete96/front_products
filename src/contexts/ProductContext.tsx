import { createContext, useState, useMemo, type ReactNode } from 'react';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type ProductContextType = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
  const removeProduct = (id: number) => setProducts(prev => prev.filter(p => p.id !== id));
  const value: ProductContextType = useMemo(
    () => ({ products, setProducts, addProduct, removeProduct }),
    [products]
  );

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
