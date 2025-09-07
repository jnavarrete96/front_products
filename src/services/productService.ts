import { type Product } from '../interfaces/product';
import { type ApiResponse } from '../interfaces/ApiResponse';

const API_URL = import.meta.env.VITE_API_URL;

// Obtener todos los productos
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) {
    throw new Error('Error al obtener los productos');
  }
  const data = await res.json();
  return data.data;
};

// Crear un producto
export const createProduct = async (
  product: Omit<Product, 'id' | 'created_at'>
): Promise<ApiResponse<Product>> => {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });

  const result = await res.json();

  if (!res.ok) {
    // Aquí usamos el mensaje que viene del backend
    throw new Error(result.message || 'Error al crear el producto');
  }

  return result;
};

// Eliminar un producto
export const deleteProduct = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Error al eliminar el producto');
  }
};
