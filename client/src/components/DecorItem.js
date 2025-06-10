// src/components/DecorItem.js
import React from 'react';

const DecorItem = ({ name, src, affiliateLink, onClick }) => {
  return (
    <div className="p-2 mb-4 bg-white rounded shadow hover:shadow-md">
      <p className="font-medium mb-1 text-gray-800 text-sm">{name}</p>
      <img
        src={src}
        alt={name}
        className="w-24 h-auto cursor-pointer border border-gray-200"
        onClick={onClick}
      />
      {affiliateLink && (
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-1 text-xs text-blue-600 underline"
        >
          Buy on Amazon
        </a>
      )}
    </div>
  );
};

export default DecorItem;
