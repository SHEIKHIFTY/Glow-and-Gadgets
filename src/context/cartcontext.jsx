"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add product or increment quantity
  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product._id || item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === (product._id || product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: product._id || product.id,
            name: product.title,
            price: product.price,
            quantity: 1,
            image: product.images?.[0] || product.image || "/placeholder.png",
          },
        ];
      }
    });
  };

  // Increment quantity by ID
  const incrementCart = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement quantity
  const decrementCart = (id) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Remove item completely
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, incrementCart, decrementCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
