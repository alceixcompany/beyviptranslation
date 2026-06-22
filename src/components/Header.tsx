'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import { LanguageSelect, useLanguage } from '@/components/LanguageProvider';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
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
              src="/beyvip/logo-horizontal-transparent-v2.png"
              alt="BEYVIP Translation Office"
              width={224}
              height={60}
              className="h-11 w-auto mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.02] sm:h-12"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-[var(--lale-gold)] ${desktopLinkColor}`}>
                {t(item.label)}
              </Link>
            ))}
            <a
              href="https://wa.me/905330923476"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center rounded-full bg-[var(--dream-dark)] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--lale-gold)]"
            >
              {t('WhatsApp')}
            </a>
            <div className="ml-2">
              <LanguageSelect />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden rounded-full border p-2 transition-colors duration-200 ${
              isScrolled
                ? 'border-[rgba(223,167,69,0.24)] text-[var(--dream-dark)] hover:bg-[rgba(223,167,69,0.08)]'
                : 'border-[rgba(223,167,69,0.24)] text-[var(--dream-dark)] hover:bg-[rgba(223,167,69,0.08)]'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t('Menüyü aç/kapat')}
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
          <div className="lg:hidden fixed inset-0 z-[9999] bg-[var(--lale-cream)] text-[var(--dream-dark)]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[rgba(195,149,58,0.16)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,241,229,0.78))] px-6 py-5 shadow-[0_12px_34px_rgba(95,89,108,0.05)] backdrop-blur">
              <Link
                href="/"
                className="flex h-16 items-center rounded-[18px] border border-[rgba(195,149,58,0.14)] bg-white/86 px-4 shadow-[0_16px_36px_rgba(95,89,108,0.08)] transition-transform duration-300 active:scale-[0.98]"
                onClick={() => setIsMenuOpen(false)}
              >
                <Image 
                  src="/beyvip/logo-horizontal-transparent-v2.png"
                  alt="BEYVIP Translation Office"
                  width={190}
                  height={51}
                  className="h-11 w-auto object-contain"
                  priority
                />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(195,149,58,0.22)] bg-white/78 text-[var(--lale-gold)] shadow-[0_14px_30px_rgba(95,89,108,0.07)] transition-colors duration-200 hover:bg-[rgba(195,149,58,0.10)]"
                aria-label={t('Menüyü kapat')}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-6">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-[14px] border border-[rgba(195,149,58,0.12)] bg-white/58 px-5 py-4 text-sm font-medium tracking-[0.10em] text-[var(--dream-dark)] shadow-[0_10px_26px_rgba(95,89,108,0.04)] transition-colors duration-200 hover:border-[rgba(195,149,58,0.24)] hover:bg-white/82 hover:text-[var(--lale-gold)]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(item.label)}
                  </Link>
                ))}
                <a
                  href="https://wa.me/905330923476"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block rounded-full bg-[var(--dream-dark)] px-5 py-4 text-center text-sm font-semibold tracking-[0.10em] text-white shadow-[0_18px_42px_rgba(95,89,108,0.14)] transition-colors hover:bg-[var(--lale-gold)] hover:text-black"
                >
                  {t('WhatsApp')}
                </a>
                <div className="mt-5 px-1">
                  <LanguageSelect compact />
                </div>
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
