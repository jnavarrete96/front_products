import { useProductContext  } from '../contexts/useProductContext'
import { Trash } from 'lucide-react'

const ProductsPage = () => {
  const { products, removeProduct } = useProductContext()

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-600">
        <p className="text-xl font-medium">No hay productos aún 🚀</p>
        <p className="text-sm mt-2">Usa el botón <span className="font-semibold">"Agregar producto"</span> para comenzar</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-500 mt-2 line-clamp-2">{product.description}</p>
            <p className="text-indigo-600 font-bold mt-4">${product.price.toFixed(2)}</p>
          </div>

          <div className="flex items-center justify-between mt-6">
            <span className="text-xs text-gray-400">
              Creado el {new Date(product.created_at).toLocaleDateString()}
            </span>
            <button
              onClick={() => removeProduct(product.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductsPage
