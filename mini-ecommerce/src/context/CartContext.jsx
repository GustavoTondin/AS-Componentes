import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Adicionar item
  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);

      // Regra 1: Se estoque for 0, ignora
      if (product.stock === 0) return prevCart;

      if (itemExists) {
        // Regra 2: Se já tem no carrinho e atingiu o limite do estoque
        if (itemExists.quantity >= product.stock) {
          alert("Estoque máximo atingido para este produto!");
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remover item
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Alterar quantidade
  const updateQuantity = (id, amount) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          // Não deixa passar do estoque nem ser menor que 1
          if (newQty > item.stock) {
            alert("Limite de estoque atingido!");
            return item;
          }
          if (newQty < 1) return item;
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, total, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);