import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-10 text-center">
        <h2 className="text-2xl font-bold text-gray-600">Seu carrinho está vazio.</h2>
        <Link to="/" className="text-blue-500 underline mt-4 block">Voltar as compras</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Meu Carrinho</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {cart.map(item => (
          <div key={item.id} className="flex items-center p-4 border-b gap-4">
            <img src={item.image} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-gray-500">R$ {parseFloat(item.price).toFixed(2)}</p>
            </div>
            
            <div className="flex items-center border rounded">
              <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200">-</button>
              <span className="px-4 py-1 font-bold">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200">+</button>
            </div>
            
            <div className="text-right w-24">
              <p className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 underline mt-1">Remover</button>
            </div>
          </div>
        ))}
        <div className="p-6 bg-gray-50 flex justify-between items-center">
          <span className="text-gray-600 text-lg">Total Geral:</span>
          <span className="text-3xl font-bold text-green-700">R$ {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}