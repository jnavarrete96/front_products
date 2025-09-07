import { Toaster } from 'react-hot-toast'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ProductProvider } from './contexts/ProductContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductProvider>
      <App />
      <Toaster position="bottom-right" />
    </ProductProvider>
  </React.StrictMode>
);
