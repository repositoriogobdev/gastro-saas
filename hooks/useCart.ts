
import { useState, useCallback, useMemo } from 'react';
import type { CartItem, MenuItem } from '../types';

const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((itemToAdd: MenuItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((itemId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  return { items, addItem, removeItem, updateQuantity, clearCart, total };
};

export default useCart;
