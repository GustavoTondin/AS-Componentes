import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import ProductForm from './pages/ProductForm';
import NotFound from './pages/NotFound';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produto/:id" element={<ProductDetails />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/cadastro" element={<ProductForm />} />
              <Route path="/editar/:id" element={<ProductForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="bg-gray-800 text-white text-center p-4 mt-8">
            <p>Mini E-commerce © 2024 - Avaliação AS</p>
          </footer>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;