
import React from 'react';
import type { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex space-x-2 md:space-x-4 overflow-x-auto pb-2 -mb-2">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 whitespace-nowrap ${
            selectedCategory === category
              ? 'bg-accent text-white shadow-lg'
              : 'bg-secondary text-text-secondary hover:bg-border hover:text-text-primary'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;