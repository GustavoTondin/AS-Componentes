import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleDelete = (id) => {
    if (confirm("Deseja realmente excluir este produto?")) {
      fetch(`http://localhost:3000/products/${id}`, { method: 'DELETE' })
        .then(() => setProducts(products.filter(product => product.id !== id)));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Nossos Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-2xl font-bold text-gray-700">R$ {parseFloat(product.price).toFixed(2)}</p>
              
              {product.stock === 0 ? (
                <span className="text-red-500 font-bold bg-red-100 p-1 rounded text-center w-full">Esgotado</span>
              ) : (
                <span className="text-green-600 text-sm">Estoque: {product.stock} un.</span>
              )}

              <div className="flex gap-2 mt-4">
                <Link to={`/produto/${product.id}`} className="flex-1 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700">
                  Ver Detalhes
                </Link>
                <Link to={`/editar/${product.id}`} className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                  Editar
                </Link>
                <button onClick={() => handleDelete(product.id)} className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                  X
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}