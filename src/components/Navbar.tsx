import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import AddProductModal from './AddProductModal'

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold tracking-wide">Product Manager</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white text-indigo-600 font-medium px-4 py-2 rounded-xl shadow hover:bg-indigo-100 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Nuevo Producto
          </button>
        </div>
      </header>

      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Navbar