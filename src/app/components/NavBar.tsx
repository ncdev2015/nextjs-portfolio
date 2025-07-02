'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Icon */}
        <div className="text-2xl font-extrabold text-gray-100 select-none">
          Nelson C.
        </div>

        {/* Hamburguer menu button */}
        <button
          type="button"
          className="sm:hidden text-gray-100 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
          aria-label="Open nav menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Menu for desktop */}
        <ul className="hidden sm:flex sm:space-x-8 text-sm font-semibold text-gray-100">
          <li>
            <Link href="#home" className="hover:text-blue-400 transition-colors">Home</Link>
          </li>
          <li>
            <Link href="#" className="hover:text-blue-400 transition-colors">Services</Link>
          </li>
          <li>
            <Link href="#" className="hover:text-blue-400 transition-colors">Works</Link>
          </li>
          <li>
            <Link href="#" className="hover:text-blue-400 transition-colors">Contact</Link>
          </li>
        </ul>
      </div>

      {/* Menu for mobile */}
      {isOpen && (
        <ul className="flex flex-col space-y-4 px-6 pb-4 sm:hidden text-sm font-semibold text-gray-100">
          <li>
            <Link href="#home" className="hover:text-blue-400 transition-colors">Home</Link>
          </li>
          <li>
            <Link href="#" className="hover:text-blue-400 transition-colors">Services</Link>
          </li>
          <li>
            <Link href="#" className="hover:text-blue-400 transition-colors">Works</Link>
          </li>
          <li>
            <Link href="#" className="hover:text-blue-400 transition-colors">Contact</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
