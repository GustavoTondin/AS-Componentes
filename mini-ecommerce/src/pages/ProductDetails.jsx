import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Erro");
        return res.json();
      })
      .then(data => setProduct(data))
      .catch(() => navigate('/404'));
  }, [id, navigate]);

  if (!product) return <div className="text-center mt-10">Carregando...</div>;

  // Lógica para bloquear botão se carrinho estiver cheio
  const cartItem = cart.find(item => item.id === product.id);
  const isMaxStock = cartItem && cartItem.quantity >= product.stock;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 object-cover" />
        <div className="p-8 flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          <div className="flex items-center justify-between mb-6">
            <span className="text-3xl font-bold text-blue-600">R$ {parseFloat(product.price).toFixed(2)}</span>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
              Estoque: {product.stock}
            </span>
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            disabled={isOutOfStock || isMaxStock}
            className={`w-full py-3 rounded font-bold text-lg transition ${
              isOutOfStock || isMaxStock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
            }`}
          >
            {isOutOfStock ? 'Produto Esgotado' : isMaxStock ? 'Máximo no Carrinho' : 'Adicionar ao Carrinho'}
          </button>
        </div>
      </div>
    </div>
  );
}