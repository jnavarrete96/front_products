// src/layouts/MainLayout.tsx
import { type ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
