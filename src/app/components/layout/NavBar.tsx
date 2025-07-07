'use client';

import { useState } from 'react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  // Smooth scroll handler for links
  const handleSmoothScroll = (e, target) => {
    // If target is empty or '#', scroll to top
    if (target === '#' || target === '') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsOpen(false);
      return;
    }

    // If target is a section id
    if (target.startsWith('#')) {
      e.preventDefault();
      const id = target.substring(1);
      const el = document.getElementById(id.toLowerCase());
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-800 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <a href="#" className="text-2xl font-extrabold text-gray-100 select-none cursor-pointer">
          Nelson C.
        </a>

        {/* Hamburger menu button */}
        <button
          type="button"
          className="sm:hidden text-gray-100 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded p-1"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path
                className="transition-all duration-300"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </div>
        </button>

        {/* Desktop menu */}
        <ul className="hidden sm:flex sm:space-x-8 text-sm font-semibold text-gray-100">
          {[
            { label: 'Home', href: '#' },
            { label: 'Services', href: '#services' },
            { label: 'Technologies', href: '#technologies' },
            { label: 'Experience', href: '#experience' },
            { label: 'Contact', href: '#contact' }
          ].map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={(e) => handleSmoothScroll(e, href)}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <ul className="text-sm font-semibold text-gray-100">
          {[
            { label: 'Home', href: '#' },
            { label: 'Services', href: '#services' },
            { label: 'Technologies', href: '#technologies' },
            { label: 'Experience', href: '#experience' },
            { label: 'Contact', href: '#contact' }
          ].map(({ label, href }, i) => (
            <li
              key={label}
              className={`transform transition-all duration-300 px-6 py-2 hover:bg-gray-600 ${
                isOpen ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? `${100 + i * 20}ms` : '0ms' }}
            >
              <a
                href={href}
                onClick={(e) => handleSmoothScroll(e, href)}
                className="hover:text-blue-400 transition-colors block cursor-pointer"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}