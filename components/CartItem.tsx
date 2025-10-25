import React from 'react';
import type { CartItem as CartItemType } from '../types';
import { PlusIcon, MinusIcon, TrashIcon } from './Icons';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="flex items-center space-x-4 bg-secondary p-3 rounded-lg border border-border">
      <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
      <div className="flex-grow">
        <h4 className="font-semibold text-text-primary">{item.name}</h4>
        <p className="text-sm text-highlight">R${item.price.toFixed(2).replace('.', ',')}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button 
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="p-1 rounded-full bg-primary text-text-secondary hover:bg-border"
        >
          <MinusIcon className="h-4 w-4"/>
        </button>
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        <button 
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="p-1 rounded-full bg-primary text-text-secondary hover:bg-border"
        >
          <PlusIcon className="h-4 w-4"/>
        </button>
      </div>
      <button onClick={() => onRemove(item.id)} className="text-text-secondary hover:text-red-500 transition-colors p-1" aria-label={`Remover ${item.name}`}>
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CartItem;
