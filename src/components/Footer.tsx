'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FiInstagram, FiMail, FiMapPin, FiMessageCircle, FiPhone } from 'react-icons/fi';
import { siteConfig } from '@/lib/seo';

const Footer = () => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || false;

  if (isAdminPage) {
    return null;
  }

  return (
    <footer className="lale-light-section text-[var(--dream-dark)]">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="border-t border-[rgba(223,167,69,0.18)] py-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.78fr_1.22fr_1fr] lg:gap-12">
            <div>
              <Link href="/" className="inline-flex">
                <Image src="/beyvip/logo.svg" alt="BEYVIP Translation Office" width={176} height={48} className="h-12 w-auto" />
              </Link>
              <p className="mt-6 max-w-sm text-sm leading-7 text-[var(--dream-text)]">
                Pasaport, vize, ikamet, diploma, sözleşme ve resmi evraklar için
                hızlı, dikkatli ve kabul odaklı tercüme hizmeti sunuyoruz.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(223,167,69,0.24)] bg-white/88 text-[var(--lale-gold)] transition-colors hover:bg-[rgba(223,167,69,0.10)]"
                  title="Instagram"
                >
                  <FiInstagram className="h-4 w-4" />
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(223,167,69,0.24)] bg-white/88 text-[var(--lale-gold)] transition-colors hover:bg-[rgba(223,167,69,0.10)]"
                  title="WhatsApp"
                >
                  <FiMessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(223,167,69,0.24)] bg-white/88 text-[var(--lale-gold)] transition-colors hover:bg-[rgba(223,167,69,0.10)]"
                  title="E-posta"
                >
                  <FiMail className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-[var(--lale-gold)]">Sayfalar</h3>
              <ul className="mt-5 space-y-3 text-sm text-[var(--dream-text)]">
                <li><Link href="/" className="transition-colors hover:text-[var(--lale-gold)]">Ana Sayfa</Link></li>
                <li><Link href="/hakkimizda" className="transition-colors hover:text-[var(--lale-gold)]">Hakkımızda</Link></li>
                <li><Link href="/hizmetlerimiz" className="transition-colors hover:text-[var(--lale-gold)]">Hizmetlerimiz</Link></li>
                <li><Link href="/galeri" className="transition-colors hover:text-[var(--lale-gold)]">Galeri</Link></li>
                <li><Link href="/iletisim" className="transition-colors hover:text-[var(--lale-gold)]">İletişim</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-[var(--lale-gold)]">Hizmetler</h3>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-[var(--dream-text)]">
                <li>Pasaport Tercümesi</li>
                <li>Yeminli Tercüme</li>
                <li>Noter Onaylı Tercüme</li>
                <li>Diploma Tercümesi</li>
                <li>Vize Evrakları</li>
                <li>Hukuki Tercüme</li>
                <li>Arapça Tercüme</li>
                <li>İngilizce Tercüme</li>
                <li>Rusça Tercüme</li>
                <li>Farsça Tercüme</li>
                <li>Fransızca Tercüme</li>
                <li>Apostil Süreci</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-[var(--lale-gold)]">İletişim</h3>
              <ul className="mt-5 space-y-4 text-sm text-[var(--dream-text)]">
                <li className="flex items-start gap-3">
                  <FiMapPin className="mt-1 h-4 w-4 text-[var(--lale-gold)]" />
                  <span>{siteConfig.address.display}</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiPhone className="h-4 w-4 text-[var(--lale-gold)]" />
                  <a href={`tel:${siteConfig.phone}`} className="transition-colors hover:text-[var(--lale-gold)]">
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FiMessageCircle className="h-4 w-4 text-[var(--lale-gold)]" />
                  <a href={`https://wa.me/${siteConfig.whatsapp.replace('+', '')}`} className="transition-colors hover:text-[var(--lale-gold)]">
                    {siteConfig.whatsappDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FiMail className="h-4 w-4 text-[var(--lale-gold)]" />
                  <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-[var(--lale-gold)]">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FiInstagram className="h-4 w-4 text-[var(--lale-gold)]" />
                  <a
                    href={siteConfig.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[var(--lale-gold)]"
                  >
                    {siteConfig.instagramHandle}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(223,167,69,0.18)] py-6">
          <div className="flex flex-col gap-3 text-center text-sm text-[var(--dream-text)] md:flex-row md:items-center md:justify-between md:text-left">
            <p>
              © 2026 <span className="font-medium text-[var(--lale-gold)]">BEYVIP Translation Office</span>. Tüm hakları saklıdır.
            </p>

            <div className="flex items-center justify-center gap-5 md:justify-end">
              <a
                href="https://www.alceix.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--lale-gold)]"
              >
                Hakları Alceix tarafından saklıdır
              </a>
              <Link href="/hakkimizda" className="transition-colors hover:text-[var(--lale-gold)]">
                Gizlilik Politikası
              </Link>
              <Link href="/iletisim" className="transition-colors hover:text-[var(--lale-gold)]">
                İletişim
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
