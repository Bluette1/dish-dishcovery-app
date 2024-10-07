import React from 'react';

interface ProfileMenuIconProps {
  toggleSidebar: () => void;
}

const ProfileMenuIcon: React.FC<ProfileMenuIconProps> = ({ toggleSidebar }) => {
  return (
    <button
      className="md:hidden p-4 focus:outline-none hover:bg-gray-200 rounded flex items-center space-x-2"
      onClick={toggleSidebar}
    >
      <svg
        className="w-8 h-8 text-gray-700 hover:text-gray-900"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.86 0-7 3.14-7 7h14c0-3.86-3.14-7-7-7z"
        />
      </svg>
      <svg
        className="w-8 h-8 text-gray-700 hover:text-gray-900"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>
  );
};

export default ProfileMenuIcon;

