'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-md sticky top-0 z-50">      
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Icon */}
        <div className="text-2xl font-extrabold text-gray-100 select-none">
          Nelson C.
        </div>

        {/* Hamburguer menu button */}
        <button
          type="button"
          className="sm:hidden text-gray-100 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded p-1"
          aria-label="Open nav menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div
            animate={isOpen ? 'open' : 'closed'}
            variants={{
              open: { rotate: 90 },
              closed: { rotate: 0 }
            }}
            transition={{ duration: 0.3 }}
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
              <motion.path
                variants={{
                  closed: { d: "M4 6h16M4 12h16M4 18h16" },
                  open: { d: "M6 18L18 6M6 6l12 12" }
                }}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </motion.div>
        </button>

        {/* Menu for desktop */}
        <ul className="hidden sm:flex sm:space-x-8 text-sm font-semibold text-gray-100">
          <li>
            <Link href="#" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
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
      <AnimatePresence>
        {isOpen && (
          <motion.ul 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden sm:hidden text-sm font-semibold text-gray-100"
          >
            <motion.li 
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.1 }}
              className="px-6 py-2 hover:bg-gray-600"
            >
              <Link href="#" className="hover:text-blue-400 transition-colors block">Home</Link>
            </motion.li>
            <motion.li 
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.12 }}
              className="px-6 py-2 hover:bg-gray-600"
            >
              <Link href="#" className="hover:text-blue-400 transition-colors block">Services</Link>
            </motion.li>
            <motion.li 
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.14 }}
              className="px-6 py-2 hover:bg-gray-600"
            >
              <Link href="#" className="hover:text-blue-400 transition-colors block">Works</Link>
            </motion.li>
            <motion.li 
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.16 }}
              className="px-6 py-2 hover:bg-gray-600"
            >
              <Link href="#" className="hover:text-blue-400 transition-colors block">Contact</Link>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}