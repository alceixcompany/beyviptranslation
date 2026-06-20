import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCheck, FiFileText, FiGlobe, FiShield } from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import JsonLd from '@/components/JsonLd';
import { absoluteUrl, createSeoMetadata, siteConfig } from '@/lib/seo';

export const metadata = createSeoMetadata({
  title: 'Hizmetlerimiz',
  description:
    'BEYVIP Translation Office pasaport, yeminli tercüme, noter onaylı tercüme, diploma, vize evrakı ve hukuki belge tercümesi hizmetleri.',
  path: '/hizmetlerimiz',
  image: '/beyvip/hero.png',
  keywords: ['pasaport tercumesi', 'noter onayli tercume', 'yeminli tercume'],
});

const services = [
  {
    slug: 'pasaport-tercumesi',
    icon: FiGlobe,
    title: 'Pasaport Tercümesi',
    description: 'Vize, ikamet, seyahat ve resmi başvuru süreçleri için pasaport çevirisi.',
    highlights: ['Vize başvuruları', 'İkamet işlemleri', 'Hızlı teslim'],
    image: '/beyvip/passport.png',
  },
  {
    slug: 'yeminli-tercume',
    icon: FiShield,
    title: 'Yeminli Tercüme',
    description: 'Resmi kurumlarda kullanılacak belgeler için yeminli tercüman kaşeli çeviri.',
    highlights: ['Resmi format', 'Kaşeli teslim', 'Belge kontrolü'],
    image: '/beyvip/legal.png',
  },
  {
    slug: 'noter-onayli-tercume',
    icon: FiFileText,
    title: 'Noter Onaylı Tercüme',
    description: 'Noter onayı gerektiren belgelerde doğru hazırlık ve süreç yönlendirmesi.',
    highlights: ['Noter uygunluğu', 'Onay süreci', 'Eksiksiz dosya'],
    image: '/beyvip/legal.png',
  },
  {
    slug: 'diploma-transkript-tercumesi',
    icon: FiFileText,
    title: 'Diploma ve Transkript',
    description: 'Eğitim, denklik, iş ve yurt dışı başvuruları için akademik belge tercümeleri.',
    highlights: ['Akademik belgeler', 'Denklik dosyası', 'Başvuru formatı'],
    image: '/beyvip/about.png',
  },
  {
    slug: 'vize-evraklari-tercumesi',
    icon: FiGlobe,
    title: 'Vize Evrakları',
    description: 'Konsolosluk dosyaları için nüfus, banka, iş ve destek evrakı tercümeleri.',
    highlights: ['Konsolosluk dosyası', 'Başvuru evrakları', 'Kontrollü teslim'],
    image: '/beyvip/passport.png',
  },
  {
    slug: 'hukuki-tercume',
    icon: FiShield,
    title: 'Hukuki Tercüme',
    description: 'Sözleşme, vekaletname, mahkeme ve şirket evraklarında titiz terminoloji.',
    highlights: ['Sözleşmeler', 'Vekaletnameler', 'Şirket evrakları'],
    image: '/beyvip/legal.png',
  },
] as const;

const ServicesPage = () => {
  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'BEYVIP Translation Office Hizmetleri',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        url: absoluteUrl(`/hizmetlerimiz/${service.slug}`),
        image: absoluteUrl(service.image),
        provider: {
          '@type': 'ProfessionalService',
          name: siteConfig.name,
          url: siteConfig.url,
        },
        areaServed: 'Turkey',
      },
    })),
  };

  return (
    <main className="page-flow min-h-screen">
      <JsonLd data={servicesJsonLd} />
      <PageHero
        eyebrow="Profesyonel Tercüme"
        title={<>Resmi belge<br />çözümleri</>}
        description="Pasaport, diploma, vize, noter onaylı ve hukuki evrak tercümelerinde hızlı ve düzenli süreç."
        image="/beyvip/hero.png"
        imageAlt="BEYVIP tercüme hizmetleri"
      />

      <section className="lale-dark-section py-24 sm:py-28">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="lale-kicker">HİZMETLER</div>
            <h2 className="mt-8 font-serif text-4xl leading-tight text-[var(--dream-dark)] sm:text-5xl">
              Evrak türüne göre planlanan
              <span className="block text-[var(--lale-gold)]">tercüme hizmetleri</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--dream-text)]">
              Belgenizin kullanım amacını netleştirir, hedef dili ve onay ihtiyacını
              değerlendirir, teslim planını baştan paylaşırız.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article key={service.slug} className="lale-card-light overflow-hidden rounded-[14px] transition-all duration-300 hover:-translate-y-1">
                  <div className="grid md:grid-cols-[0.92fr_1.08fr]">
                    <div className="relative min-h-[280px] overflow-hidden">
                      <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-700 hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 40vw" />
                      <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/86 text-[var(--lale-gold)] shadow-sm backdrop-blur">
                        <Icon className="h-7 w-7" />
                      </div>
                    </div>

                    <div className="p-7 sm:p-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lale-gold)]">BEYVIP</p>
                      <h3 className="mt-3 font-serif text-3xl text-[var(--dream-dark)]">{service.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-[var(--dream-text)] sm:text-base">{service.description}</p>

                      <div className="mt-6 space-y-3">
                        {service.highlights.map((highlight) => (
                          <div key={highlight} className="flex items-center gap-3 text-sm text-[var(--dream-text)]">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(212,175,55,0.12)]">
                              <FiCheck className="h-4 w-4 text-[var(--lale-gold)]" />
                            </div>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      <Link href="/iletisim" className="lale-gold-button mt-8 gap-3 text-xs">
                        Teklif Al
                        <FiArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
