// components/Headers.tsx
import { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, XIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'; // Import Heroicons for menu icons
import Logo from './logo';

const Headers: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  // Mock authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login/logout
  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Perform logout logic here
      setIsLoggedIn(false);
      // Redirect or perform additional actions
    } else {
      // Perform login logic here
      setIsLoggedIn(true);
      // Redirect or perform additional actions
    }
  };

  return (
    <>
      {/* Fixed Thin Header */}
      <header className="bg-gray-800 text-white text-center py-2 fixed top-0 left-0 w-full z-40">
        <div className="container mx-auto px-4">
          <p className="text-sm font-medium">Coming Soon in Summer 2025</p>
        </div>
      </header>

      {/* Main Navigation Header */}
      <header className="text-black md:relative relative mt-12 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold"><Logo /></Link>
          <div className="hidden md:flex space-x-4 items-center">
            <div className="relative">
              <button
                className="flex items-center space-x-2 hover:text-gray-300"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>Categories</span>
                {isDropdownOpen ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
              </button>
              {isDropdownOpen && (
                <div className="absolute text-white bg-[#883D1A] mt-2 rounded-lg shadow-lg w-48">
                  <Link href="/category1" className="block hover:text-black px-4 py-2 hover:bg-[#a84d22]">Soup</Link>
                  <Link href="/category2" className="block hover:text-black px-4 py-2 hover:bg-[#a84d22]">Vegan</Link>
                  <Link href="/category3" className="block hover:text-black px-4 py-2 hover:bg-[#a84d22]">Dessert</Link>
                </div>
              )}
            </div>
            <Link href="/about" className="hover:text-gray-300">About</Link>
            <Link href="/contact" className="hover:text-gray-300">Contact</Link>
            <Link href="/track-order">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Track Order
            </button>
          </Link>

            <button
              onClick={handleAuthClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-blue-700`}>
          <div className="relative">
            <button
              className="block px-4 py-2 w-full text-left hover:bg-blue-600"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Categories
              {isDropdownOpen ? <ChevronUpIcon className="w-5 h-5 inline ml-2" /> : <ChevronDownIcon className="w-5 h-5 inline ml-2" />}
            </button>
            {isDropdownOpen && (
              <div className="bg-blue-800">
                <Link href="/category1" className="block px-4 py-2 hover:bg-blue-600">Category 1</Link>
                <Link href="/category2" className="block px-4 py-2 hover:bg-blue-600">Category 2</Link>
                <Link href="/category3" className="block px-4 py-2 hover:bg-blue-600">Category 3</Link>
              </div>
            )}
          </div>
          <Link href="/about" className="block px-4 py-2 hover:bg-blue-600">About</Link>
          <Link href="/contact" className="block px-4 py-2 hover:bg-blue-600">Contact</Link>
          <Link href="/track-order">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Track Order
            </button>
          </Link>

          <button
            onClick={handleAuthClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
      </header>
    </>
  );
};

export default Headers;
