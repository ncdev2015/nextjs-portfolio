'use client';

import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Icon */}
        <div className="text-2xl font-extrabold text-gray-900 select-none">
          Nelson C.
        </div>

        {/* Navigating */}
        <ul className="hidden sm:flex space-x-8 text-sm font-semibold text-gray-700">
          <li>
            <Link
              href="#home"
              className="hover:text-blue-600 transition-colors duration-300 ease-in-out"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#services"
              className="hover:text-blue-600 transition-colors duration-300 ease-in-out"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="#works"
              className="hover:text-blue-600 transition-colors duration-300 ease-in-out"
            >
              Works
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="hover:text-blue-600 transition-colors duration-300 ease-in-out"
            >
              Contact
            </Link>
          </li>
        </ul>
        
        <button
          type="button"
          className="sm:hidden text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
          aria-label="Open nav menu"
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
      </div>
    </nav>
  );
}
