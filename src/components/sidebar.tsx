// components/Sidebar.tsx
import React from "react";
import Link from "next/link";

interface SidebarProps {
  theme: string | undefined;
  closeSidebar?: () => void;
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  theme = "w-64 bg-white h-full shadow-md",
  closeSidebar,
  role,
}) => {
  return (
    <div className={`${theme}`}>
      <ul>
        <li className="p-4 hover:bg-gray-200 cursor-pointer">Dashboard</li>

        {role === "admin" && (
          <Link href={"/profile/categories"}>
            <li className="p-4 hover:bg-gray-200 cursor-pointer">Categories</li>
          </Link>
        )}

        {role === "admin" && (
          <Link href={"/profile/meals"}>
            <li className="p-4 hover:bg-gray-200 cursor-pointer">Meals</li>
          </Link>
        )}

        <Link href={"/profile/orders"}>
          <li className="p-4 hover:bg-gray-200 cursor-pointer">Orders</li>
        </Link>

        <Link href={"/"}>
          <li
            onClick={closeSidebar}
            className="p-4 hover:bg-gray-200 cursor-pointer"
          >
            Back
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
