'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || false;
  const desktopLinkColor = 'text-[var(--dream-dark)]';
  const navItems = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/hakkimizda', label: 'Hakkımızda' },
    { href: '/hizmetlerimiz', label: 'Hizmetlerimiz' },
    { href: '/haberler', label: 'Blog' },
    { href: '/iletisim', label: 'İletişim' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu on escape key and handle body scroll
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Simple body scroll lock without jumping to top
    if (isMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY.replace('-', '')));
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Admin sayfasında Header'ı gösterme
  if (isAdminPage) {
    return null;
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl shadow-[0_12px_40px_rgba(223,167,69,0.10)] border-b border-[rgba(223,167,69,0.10)]' 
        : 'bg-white/82 backdrop-blur-xl shadow-[0_10px_34px_rgba(223,167,69,0.08)]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center">
            <Image
              src="/beyvip/logo.svg"
              alt="BEYVIP Translation Office"
              width={176}
              height={48}
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-[1.02] sm:h-12"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-[var(--lale-gold)] ${desktopLinkColor}`}>
                {item.label}
              </Link>
            ))}
            <a
              href="https://wa.me/905330923476"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center rounded-full bg-[var(--dream-dark)] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--lale-gold)]"
            >
              WhatsApp
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden rounded-full border p-2 transition-colors duration-200 ${
              isScrolled
                ? 'border-[rgba(223,167,69,0.24)] text-[var(--dream-dark)] hover:bg-[rgba(223,167,69,0.08)]'
                : 'border-[rgba(223,167,69,0.24)] text-[var(--dream-dark)] hover:bg-[rgba(223,167,69,0.08)]'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : 'translate-y-0'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 my-1 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-0'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Portal */}
        {isMenuOpen && typeof window !== 'undefined' && createPortal(
          <div className="lg:hidden fixed inset-0 z-[9999] bg-[var(--lale-emerald-deep)] text-[var(--lale-ivory)]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(212,175,55,0.26)]">
              <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                <Image 
                  src="/beyvip/logo.svg"
                  alt="BEYVIP Translation Office"
                  width={132}
                  height={36}
                  className="h-9 w-auto brightness-0 invert"
                  priority
                />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg text-[var(--lale-gold)] hover:bg-[rgba(212,175,55,0.10)] transition-colors duration-200"
                aria-label="Close mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-6">
              <div className="space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block border-b border-[rgba(212,175,55,0.16)] px-4 py-4 text-sm font-medium tracking-[0.12em] text-[var(--lale-ivory)] transition-colors duration-200 hover:text-[var(--lale-gold)]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href="https://wa.me/905330923476"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block rounded-full bg-[var(--lale-gold)] px-5 py-4 text-center text-sm font-semibold tracking-[0.12em] text-black"
                >
                  WHATSAPP
                </a>
              </div>
            </nav>
          </div>,
          document.body
        )}
      </div>
    </header>
  );
};

export default Header;
