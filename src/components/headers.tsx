import React, { useContext } from 'react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import {
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import Logo from './logo';
import Header from './header';
import { DataContext } from '../context/data';

interface Category {
  name: string;
  imageUrl: string;
  _id: string;
}

const Navbar: React.FC = () => {
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const { categories } = useContext(DataContext);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <Header />
      {/* Main Navbar */}
      <nav className="text-black mt-16 md:mt-14 ">
        <div className="container mx-auto px-4 pt-5 md:pt-1 flex items-center justify-between">
          {/* Left Side: Logo and Categories */}
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold flex-shrink-0">
              <Logo />
            </Link>
            {/* Desktop Categories Dropdown */}
            <div className="relative hidden lg:flex items-center ml-6">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="flex items-center hover:text-gray-400"
                >
                  Categories
                  {isCategoriesOpen ? (
                    <ChevronUpIcon className="ml-2 w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="ml-2 w-4 h-4" />
                  )}
                </MenuButton>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 mt-2 w-48 bg-gray-700 text-white rounded shadow-lg z-40">
                    {categories &&
                      categories.map((category: Category) => (
                        <Menu.Item key={`${category._id}-desktop`}>
                          {({ active }) => (
                            <Link
                              href={`/browse/categories/${encodeURIComponent(
                                category.name.toLowerCase(),
                              )}`}
                              className={`block px-4 py-2 ${
                                active ? 'bg-gray-600' : ''
                              }`}
                              onClick={() => setIsCategoriesOpen(false)}
                            >
                              {category.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="relative px-12">
              <ShoppingCartIcon className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden focus:outline-none z-50"
          >
            {isMenuOpen ? (
              <XIcon className="w-6 h-6 cursor-pointer" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>

          {/* Right Side: Navigation Links and Buttons */}
          <div className="hidden lg:flex items-center space-x-6 flex-grow justify-end">
            <Link href="/" className="hover:text-gray-400">
              Home
            </Link>
            <Link href="/#about" className="hover:text-gray-400">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-400">
              Contact
            </Link>
            <Link href="/track-order">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Track Order
              </button>
            </Link>
            {!session ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => signIn()}
              >
                Login
              </button>
            ) : (
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center bg-gray-700 text-white rounded px-4 py-2 hover:bg-gray-600 focus:outline-none">
                  <UserIcon className="w-5 h-5 mr-2" />
                  Profile
                  <ChevronDownIcon className="ml-2 w-4 h-4" />
                </MenuButton>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 mt-2 w-48 bg-gray-700 text-white rounded shadow-lg z-10">
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          href="/profile"
                          className={`block px-4 py-2 ${
                            active ? 'bg-gray-600' : ''
                          }`}
                        >
                          Dashboard
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            signOut();
                          }}
                          className={`block w-full text-left px-4 py-2 ${
                            active ? 'bg-gray-600' : ''
                          }`}
                        >
                          Logout
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            )}
          </div>

          {/* Mobile Menu Items */}
          <div
            ref={menuRef}
            className={`lg:hidden fixed inset-0 bg-gray-800 text-white bg-opacity-75 z-40 transition-transform transform ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex flex-col h-full p-4">
              {/* Mobile Categories */}
              <div className="relative mt-6 pt-2">
                <Menu
                  as="div"
                  className="relative inline-block text-left w-full"
                >
                  <MenuButton
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    className="flex items-center text-xl px-4 py-2 w-full mt-5"
                  >
                    Categories
                    {isCategoriesOpen ? (
                      <ChevronUpIcon className="ml-2 w-4 h-4" />
                    ) : (
                      <ChevronDownIcon className="ml-2 w-4 h-4" />
                    )}
                  </MenuButton>
                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute bg-gray-700 text-white left-0 mt-2 w-full rounded shadow-lg">
                      {categories &&
                        categories.map((category: Category) => (
                          <Menu.Item key={`${category._id}-mobile`}>
                            {({ active }) => (
                              <Link
                                href={`/browse/categories/${encodeURIComponent(
                                  category.name.toLowerCase(),
                                )}`}
                                className={`block px-4 py-2 ${
                                  active ? 'bg-gray-600' : ''
                                }`}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setIsCategoriesOpen(false);
                                }}
                              >
                                {category.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col mt-4 space-y-4">
                <Link
                  href="/"
                  className="text-xl py-2 hover:bg-gray-700 px-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/#about"
                  className="text-xl py-2 hover:bg-gray-700 px-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-xl py-2 hover:bg-gray-700 px-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link href="/track-order">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                  >
                    Track Order
                  </button>
                </Link>

                {!session ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    onClick={() => signIn()}
                  >
                    Login
                  </button>
                ) : (
                  <div>
                    <Link
                      href="/profile"
                      className="block text-xl py-2 hover:bg-gray-700 px-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
