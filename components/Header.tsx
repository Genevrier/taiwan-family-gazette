'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">台灣家庭月報</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="hover:text-primary transition">功能介紹</Link>
            <Link href="#pricing" className="hover:text-primary transition">方案價格</Link>
            <Link href="#testimonials" className="hover:text-primary transition">用戶見證</Link>
            <Link href="#faq" className="hover:text-primary transition">常見問題</Link>
            <Link href="/login" className="btn-primary">登入</Link>
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <Link href="#features" className="block py-2 hover:text-primary">功能介紹</Link>
            <Link href="#pricing" className="block py-2 hover:text-primary">方案價格</Link>
            <Link href="#testimonials" className="block py-2 hover:text-primary">用戶見證</Link>
            <Link href="#faq" className="block py-2 hover:text-primary">常見問題</Link>
            <Link href="/login" className="block py-2 text-primary font-semibold">登入</Link>
          </nav>
        )}
      </div>
    </header>
  );
} 