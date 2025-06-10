// src/pages/Recommendations.jsx
import React from 'react';
import RECOMMENDED_BUNDLES from '../data/recommendedBundles';
import '../styles/Recommendations.css';

const Recommendations = () => {
  return (
    <div className="recommendations-container">
      <h2>Recommended Event Bundles</h2>
      {RECOMMENDED_BUNDLES.map((bundle, index) => (
        <div key={index} className="bundle-card">
          <h3>{bundle.name}</h3>
          <ul>
            {bundle.items.map((item, idx) => (
              <li key={idx}>
                {item.name} – ${item.price}{' '}
                <a href={item.affiliateLink} target="_blank" rel="noopener noreferrer">
                  🔗 Buy
                </a>
              </li>
            ))}
          </ul>
          <p className="bundle-total">Total: ${bundle.items.reduce((sum, i) => sum + i.price, 0)}</p>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
