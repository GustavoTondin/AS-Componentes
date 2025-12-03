import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <p className="text-xl text-gray-600 mt-2">Página não encontrada</p>
      <Link to="/" className="mt-4 text-blue-600 underline">Voltar para a Home</Link>
    </div>
  );
}