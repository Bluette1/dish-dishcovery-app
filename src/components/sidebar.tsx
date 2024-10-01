// components/Sidebar.tsx
import React from 'react';

interface SidebarProps {
  theme: string | undefined ;
  closeSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> =({theme = 'w-64 bg-white h-full shadow-md', closeSidebar}) => {
  return (
    <div className={`${theme}`}>
      <ul>
        <li className="p-4 hover:bg-gray-200 cursor-pointer">Dashboard</li>
        <li className="p-4 hover:bg-gray-200 cursor-pointer">Products</li>
        <li className="p-4 hover:bg-gray-200 cursor-pointer">Orders</li>
        <li onClick={closeSidebar} className="p-4 hover:bg-gray-200 cursor-pointer">Back</li>
      </ul>
    </div>
  );
};

export default Sidebar;