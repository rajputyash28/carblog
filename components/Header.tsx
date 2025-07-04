'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CarLoader from './CarLoader';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
    setIsMenuOpen(false);
  };

  if (isPending) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <CarLoader message="Navigating to your destination..." />
      </div>
    );
  }

  return (
    <header className="bg-[#232536] text-white sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 h-20">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#232536] font-bold text-sm">LOGO</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('/')}
              className="hover:text-gray-300 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('/blogs')}
              className="hover:text-gray-300 transition-colors"
            >
              Blogs
            </button>
            <button 
              onClick={() => handleNavigation('/about')}
              className="hover:text-gray-300 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation('/contact')}
              className="hover:text-gray-300 transition-colors"
            >
              Contact Us
            </button>
            <button className="bg-white text-[#232536] px-6 py-2 rounded-md hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-600">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavigation('/')}
                className="hover:text-gray-300 transition-colors text-left"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('/blogs')}
                className="hover:text-gray-300 transition-colors text-left"
              >
                Blogs
              </button>
              <button 
                onClick={() => handleNavigation('/about')}
                className="hover:text-gray-300 transition-colors text-left"
              >
                About
              </button>
              <button 
                onClick={() => handleNavigation('/contact')}
                className="hover:text-gray-300 transition-colors text-left"
              >
                Contact Us
              </button>
              <button className="bg-white text-[#232536] px-6 py-2 rounded-md hover:bg-gray-100 transition-colors w-fit">
                Subscribe
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}