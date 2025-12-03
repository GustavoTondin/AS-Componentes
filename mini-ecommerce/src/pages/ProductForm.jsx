import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Refs para focar no erro
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const stockRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: ''
  });
  const [error, setError] = useState('');

  // Carregar dados se for edição
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/products/${id}`)
        .then(res => res.json())
        .then(data => setFormData(data));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!formData.name) {
      setError("O nome do produto é obrigatório.");
      nameRef.current.focus();
      return;
    }
    if (formData.price === '' || parseFloat(formData.price) < 0) {
      setError("Preço inválido (não pode ser negativo).");
      priceRef.current.focus();
      return;
    }
    if (formData.stock === '' || parseInt(formData.stock) < 0) {
      setError("Estoque inválido.");
      stockRef.current.focus();
      return;
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3000/products/${id}` : 'http://localhost:3000/products';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      })
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{id ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h2>
      
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-bold mb-1">Nome</label>
          <input ref={nameRef} type="text" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-1">Descrição</label>
          <textarea className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Preço</label>
            <input ref={priceRef} type="number" step="0.01" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Estoque</label>
            <input ref={stockRef} type="number" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">URL da Imagem</label>
          <input type="text" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
        </div>

        <button type="submit" className="mt-4 bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition">
          Salvar
        </button>
      </form>
    </div>
  );
}