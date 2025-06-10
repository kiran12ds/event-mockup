import React, { useState } from 'react';
import decorMetadata from '../data/decorMetadata.json';

const DecorDropdown = ({ onSelect }) => {
  const [category, setCategory] = useState('all');

  const categories = ['all', 'balloon', 'cake', 'arch'];

  const filteredItems = category === 'all'
    ? decorMetadata
    : decorMetadata.filter(item => item.category === category);

  return (
    <div className="decor-dropdown">
      <select
        className="dropdown"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat.toUpperCase()}</option>
        ))}
      </select>

      <div className="decor-list">
        {filteredItems.map(item => (
          <img
            key={item.id}
            src={item.src}
            alt={item.name}
            className="item-image"
            onClick={() => onSelect(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default DecorDropdown;
