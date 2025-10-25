import React, { useState } from 'react';
import type { CartItem as CartItemType } from '../types';
import CartItem from './CartItem';
import CheckoutModal from './CheckoutModal';
import { XIcon } from './Icons';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  onPlaceOrder: (customer: {name: string, address: string}, items: CartItemType[], total: number, paymentMethod: 'Cartão' | 'PIX') => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, removeItem, updateQuantity, clearCart, total, onPlaceOrder }) => {
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  
  const handleCheckoutSuccess = () => {
    clearCart();
    setCheckoutOpen(false);
    onClose();
  }

  const handleConfirmOrder = (customer: {name: string, address: string}, paymentMethod: 'Cartão' | 'PIX') => {
    onPlaceOrder(customer, items, total, paymentMethod);
  }

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
      <aside className={`fixed top-0 right-0 h-full w-full max-w-md bg-secondary shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-xl font-bold text-text-primary">Seu Pedido</h2>
            <button onClick={onClose} className="p-1 text-text-secondary hover:text-accent transition-colors" aria-label="Fechar carrinho">
              <XIcon className="h-6 w-6" />
            </button>
          </header>
          
          {items.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-text-secondary p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-lg">Seu carrinho está vazio.</p>
              <p className="text-sm">Adicione alguns itens deliciosos do cardápio!</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {items.map(item => (
                <CartItem key={item.id} item={item} onRemove={removeItem} onUpdateQuantity={updateQuantity} />
              ))}
            </div>
          )}
          
          {items.length > 0 && (
            <footer className="p-4 border-t border-border bg-secondary">
              <div className="flex justify-between items-center text-lg mb-4">
                <span className="font-semibold text-text-secondary">Total:</span>
                <span className="font-bold text-2xl text-highlight">R${total.toFixed(2).replace('.', ',')}</span>
              </div>
              <button 
                onClick={() => setCheckoutOpen(true)}
                className="w-full bg-accent text-white font-bold py-3 rounded-lg text-lg hover:bg-highlight transition-all duration-300 transform hover:scale-105"
              >
                Ir para o Pagamento
              </button>
            </footer>
          )}
        </div>
      </aside>
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
        onConfirmOrder={handleConfirmOrder}
        total={total}
      />
    </>
  );
};

export default Cart;