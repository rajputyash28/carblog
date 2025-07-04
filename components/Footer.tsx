'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with email: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-[#232536] text-white">
      <div className="max-w-[1280px] mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4">
            Subscribe to our newsletter to get latest updates and news
          </h3>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
            >
              Subscribe ✓
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <span className="text-[#232536] font-bold text-sm">LOGO</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Finstreet 118 2561 abctown<br />
              example@email.com 001 2345 442
            </p>
          </div>
          <div className="flex justify-end">
            <nav className="flex flex-col sm:flex-row gap-6">
              <Link href="/" className="hover:text-gray-300 transition-colors">
                Home
              </Link>
              <Link href="/blogs" className="hover:text-gray-300 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="hover:text-gray-300 transition-colors">
                About us
              </Link>
              <Link href="/contact" className="hover:text-gray-300 transition-colors">
                Contact us
              </Link>
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-end space-x-4 pt-8 border-t border-gray-600">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}