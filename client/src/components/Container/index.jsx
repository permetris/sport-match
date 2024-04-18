import React from 'react';

export default function Container ({ children }) {
  return <div className="overflow-hidden rounded-lg bg-gray-50">
    <div className="px-4 py-5 sm:p-6">{children}</div>
  </div>;
}
