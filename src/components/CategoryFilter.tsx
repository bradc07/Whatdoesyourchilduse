import { categories } from '../data/platforms';
import type { Category } from '../data/platforms';

interface CategoryFilterProps {
  activeCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="category-filter">
      <button
        className={`category-button ${activeCategory === 'all' ? 'active' : ''}`}
        onClick={() => onCategoryChange('all')}
      >
        <span className="category-icon">📋</span>
        <span>All</span>
      </button>
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          <span className="category-icon">{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}
