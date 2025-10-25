import React from 'react';
import type { MenuItem } from '../types';
import { PlusIcon } from './Icons';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
  return (
    <div className="bg-secondary rounded-lg overflow-hidden border border-border flex flex-col group transition-all duration-300 hover:shadow-2xl hover:border-accent hover:-translate-y-1">
      <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-text-primary">{item.name}</h3>
        <p className="text-sm text-text-secondary mt-1 flex-grow">{item.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-semibold text-highlight">R${item.price.toFixed(2).replace('.', ',')}</span>
          <button 
            onClick={onAddToCart}
            className="bg-accent text-white rounded-full p-2 hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-highlight transition-all duration-300 transform group-hover:scale-110"
            aria-label={`Adicionar ${item.name} ao carrinho`}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
