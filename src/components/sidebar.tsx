// components/Sidebar.tsx
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white h-full shadow-md">
      <ul>
        <li className="p-4 hover:bg-gray-200 cursor-pointer">Dashboard</li>
        <li className="p-4 hover:bg-gray-200 cursor-pointer">Products</li>
        <li className="p-4 hover:bg-gray-200 cursor-pointer">Orders</li>
      </ul>
    </div>
  );
};

export default Sidebar;