import React, { useState } from 'react';
import { Search, Star, Clock, Plus } from 'lucide-react';

const CATEGORY_MAP = {
  'Fast Food': ['Meals'],
  Drinks: ['Coffee', 'Tea'],
  Snacks: ['Snacks'],
  Desserts: ['Bakery']
};

const CATEGORIES = ['All', 'Fast Food', 'Drinks', 'Snacks', 'Desserts'];

export default function MenuPage({ menuItems, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch =
      selectedCategory === 'All' ||
      CATEGORY_MAP[selectedCategory]?.includes(item.category);

    const searchMatch =
      !normalizedQuery ||
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery);

    return categoryMatch && searchMatch;
  });

  const handleAdd = (item) => {
    if (!item.available) return;

    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      customizations: {}
    });
  };

  return (
    <div className="container section-padding menu-page">
      <div className="menu-hero">
        <div>
          <span className="menu-hero-label">University Cafeteria</span>
          <h1>Fresh picks for students, staff, and guests.</h1>
          <p>Browse the menu, filter by category, and add items to your cart in one smooth flow.</p>
        </div>
        <div className="menu-hero-summary">
          <div>
            <strong>{filteredItems.length}</strong>
            <span>menu items</span>
          </div>
          <div>
            <strong>Fast orders</strong>
            <span>Ready in minutes</span>
          </div>
        </div>
      </div>

      <div className="menu-controls">
        <div className="menu-categories">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="menu-search">
          <Search size={18} className="menu-search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fast food, drinks, snacks, desserts..."
            className="menu-search-input"
          />
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <article className="menu-card" key={item.id}>
              <div className="menu-card-img-wrapper">
                <img src={item.image} alt={item.name} className="menu-card-img" />
                <span className={`menu-card-status ${item.available ? 'available' : 'unavailable'}`}>
                  {item.available ? 'Available' : 'Sold Out'}
                </span>
                <span className="menu-card-label">
                  <Clock size={14} /> {item.prepTime}
                </span>
              </div>

              <div className="menu-card-body">
                <div className="menu-card-header">
                  <div>
                    <h3 className="menu-card-title">{item.name}</h3>
                    <p className="menu-card-category">{item.category}</p>
                  </div>
                  <span className="menu-card-price">Rs. {item.price}</span>
                </div>

                <p className="menu-card-desc">{item.description}</p>

                <div className="menu-card-meta">
                  <div className="menu-card-rating">
                    <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                    <strong>{item.rating}</strong>
                    <span>({item.reviews})</span>
                  </div>
                  <button
                    type="button"
                    className={`btn btn-primary btn-sm ${!item.available ? 'btn-disabled' : ''}`}
                    onClick={() => handleAdd(item)}
                    disabled={!item.available}
                  >
                    <Plus size={16} />
                    {item.available ? 'Add to Cart' : 'Unavailable'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No menu items match your search or selected category.</p>
        </div>
      )}
    </div>
  );
}
