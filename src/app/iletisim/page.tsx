'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiChevronDown, FiInstagram, FiMail, FiMessageCircle, FiPhone, FiSend } from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import { siteConfig } from '@/lib/seo';

const serviceOptions = [
  'Pasaport Tercümesi',
  'Yeminli Tercüme',
  'Noter Onaylı Tercüme',
  'Diploma / Transkript',
  'Vize Evrakları',
  'Hukuki Tercüme',
  'Diğer',
];

const ContactPage = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <main className="page-flow min-h-screen">
      <PageHero
        eyebrow="İletişim"
        title={<>Belgeniz için<br />teklif alın</>}
        description="Belge türünü, hedef dili ve teslim beklentinizi paylaşın; size hızlıca dönüş yapalım."
        image="/beyvip/hero.png"
        imageAlt="BEYVIP iletişim"
        heightClassName="min-h-[380px] py-20 sm:min-h-[440px] sm:py-24"
      />

      <section className="lale-light-section py-24 sm:py-28">
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-7 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[18px] border border-[rgba(195,149,58,0.24)] bg-[linear-gradient(145deg,#121212_0%,#211d18_100%)] p-6 text-white shadow-[0_28px_80px_rgba(17,17,17,0.18)] sm:p-8 lg:p-10"
          >
            <h2 className="font-serif text-3xl sm:text-4xl">Mesaj Gönderin</h2>
            <p className="mt-3 text-sm leading-7 text-white/68">
              Formu doldurduktan sonra en hızlı dönüş için belgenizi WhatsApp veya e-posta ile de iletebilirsiniz.
            </p>

            {success && (
              <div className="mt-6 flex items-center gap-3 rounded-[14px] border border-green-400/30 bg-green-400/10 p-4 text-sm text-green-100">
                <FiCheckCircle className="h-5 w-5" />
                Mesajınız hazırlandı. Hızlı dönüş için WhatsApp üzerinden belge gönderebilirsiniz.
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input required name="name" className="rounded-full border border-white/12 bg-white/94 px-5 py-4 text-sm text-[var(--dream-dark)] outline-none transition placeholder:text-[rgba(109,102,93,0.58)] focus:border-[var(--lale-gold)]" placeholder="Ad Soyad" />
                <input required name="phone" type="tel" className="rounded-full border border-white/12 bg-white/94 px-5 py-4 text-sm text-[var(--dream-dark)] outline-none transition placeholder:text-[rgba(109,102,93,0.58)] focus:border-[var(--lale-gold)]" placeholder="Telefon" />
              </div>
              <input required name="email" type="email" className="w-full rounded-full border border-white/12 bg-white/94 px-5 py-4 text-sm text-[var(--dream-dark)] outline-none transition placeholder:text-[rgba(109,102,93,0.58)] focus:border-[var(--lale-gold)]" placeholder="E-posta" />
              <div className="relative">
                <select required name="service" className="w-full appearance-none rounded-full border border-white/12 bg-white/94 px-5 py-4 pr-12 text-sm text-[var(--dream-dark)] outline-none transition focus:border-[var(--lale-gold)]">
                  <option value="" className="bg-[#111]">Hizmet seçiniz</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option} className="bg-[#111]">{option}</option>
                  ))}
                </select>
                <FiChevronDown className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--lale-gold)]" />
              </div>
              <textarea required name="message" rows={6} className="w-full resize-none rounded-[18px] border border-white/12 bg-white/94 px-5 py-4 text-sm text-[var(--dream-dark)] outline-none transition placeholder:text-[rgba(109,102,93,0.58)] focus:border-[var(--lale-gold)]" placeholder="Belge türü, hedef dil, teslim beklentisi..." />
              <button type="submit" className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--lale-gold)] px-6 py-4 text-sm font-semibold text-black transition hover:bg-[var(--lale-gold-soft)]">
                <FiSend className="h-4 w-4" />
                MESAJ GÖNDER
              </button>
            </form>
          </motion.div>

          <aside className="space-y-5">
            {[
              { icon: FiMessageCircle, label: 'WhatsApp', value: siteConfig.whatsappDisplay, href: `https://wa.me/${siteConfig.whatsapp.replace('+', '')}` },
              { icon: FiPhone, label: 'Telefon', value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone}` },
              { icon: FiMail, label: 'E-posta', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
              { icon: FiInstagram, label: 'Instagram', value: siteConfig.instagramHandle, href: siteConfig.instagram },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} className="flex items-center gap-4 rounded-[18px] border border-[rgba(195,149,58,0.16)] bg-white/86 p-5 shadow-[0_18px_50px_rgba(17,17,17,0.07)] transition hover:-translate-y-1">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[rgba(195,149,58,0.12)] text-[var(--lale-gold)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lale-gold)]">{item.label}</p>
                    <p className="mt-1 break-all text-sm font-medium text-[var(--dream-dark)]">{item.value}</p>
                  </div>
                </Link>
              );
            })}

            <div className="rounded-[18px] border border-[rgba(195,149,58,0.16)] bg-white/86 p-6 shadow-[0_18px_50px_rgba(17,17,17,0.07)]">
              <h3 className="font-serif text-2xl text-[var(--dream-dark)]">Çalışma Akışı</h3>
              <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--dream-text)]">
                <p>1. Belgenizi gönderin.</p>
                <p>2. Hedef dil ve onay ihtiyacı netleşsin.</p>
                <p>3. Süre ve ücret bilgisi paylaşılsın.</p>
                <p>4. Tercümeniz teslim planına göre hazırlansın.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
