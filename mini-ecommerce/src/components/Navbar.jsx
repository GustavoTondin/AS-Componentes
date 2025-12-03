import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();
  
  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-300">Minha Loja</Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-300">Produtos</Link>
          <Link to="/cadastro" className="hover:text-blue-300">Cadastrar Produto</Link>
          <Link to="/carrinho" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 font-bold flex items-center gap-2">
            Carrinho 
            <span className="bg-white text-blue-900 text-xs px-2 py-0.5 rounded-full">{cartCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}