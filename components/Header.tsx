import React from 'react';
import { ShoppingCartIcon, HamburgerIcon, AdjustmentsIcon } from './Icons';

interface HeaderProps {
  onCartClick: () => void;
  cartItemCount: number;
  onSwitchToAdmin: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, cartItemCount, onSwitchToAdmin }) => {
  return (
    <header className="sticky top-0 bg-secondary/80 backdrop-blur-lg z-30 border-b border-border">
      <div className="container mx-auto px-4 h-16 md:h-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-logo tracking-wider flex items-center gap-2">
            <HamburgerIcon className="h-7 w-7 md:h-8 md:w-8"/>
            <span className="text-text-primary dark:text-text-primary-dark">gastrô<span className="text-accent">.</span></span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onSwitchToAdmin}
            className="text-text-secondary hover:text-accent transition-colors p-2"
            aria-label="Acessar painel de administração"
          >
            <AdjustmentsIcon className="h-6 w-6 md:h-7 md:w-7" />
          </button>
          <button
            onClick={onCartClick}
            className="relative text-text-secondary hover:text-accent transition-colors p-2"
            aria-label="Abrir carrinho"
          >
            <ShoppingCartIcon className="h-6 w-6 md:h-7 md:w-7" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;