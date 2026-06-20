import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import { createSeoMetadata } from '@/lib/seo';

const services = {
  'pasaport-tercumesi': {
    title: 'Pasaport Tercümesi',
    description: 'Vize, ikamet, seyahat ve resmi başvurular için pasaport çevirisi.',
    image: '/beyvip/passport.png',
    points: ['Vize ve ikamet dosyaları', 'Hızlı belge inceleme', 'Resmi başvuruya uygun teslim'],
  },
  'yeminli-tercume': {
    title: 'Yeminli Tercüme',
    description: 'Resmi kurumlarda kullanılacak evraklar için yeminli tercüman kaşeli çeviri.',
    image: '/beyvip/legal.png',
    points: ['Kaşeli tercüme', 'Belge türüne uygun format', 'Kontrollü teslim süreci'],
  },
  'noter-onayli-tercume': {
    title: 'Noter Onaylı Tercüme',
    description: 'Noter onayı gerektiren belgelerde doğru hazırlık ve süreç yönlendirmesi.',
    image: '/beyvip/legal.png',
    points: ['Noter uygunluğu', 'Onay öncesi belge kontrolü', 'Resmi işlemler için yönlendirme'],
  },
  'diploma-transkript-tercumesi': {
    title: 'Diploma ve Transkript Tercümesi',
    description: 'Eğitim, denklik, iş ve yurt dışı başvuruları için akademik belge tercümeleri.',
    image: '/beyvip/about.png',
    points: ['Diploma ve transkript', 'Denklik dosyaları', 'Akademik terminoloji'],
  },
  'vize-evraklari-tercumesi': {
    title: 'Vize Evrakları Tercümesi',
    description: 'Konsolosluk dosyaları için nüfus, banka, iş ve destek evrakı tercümeleri.',
    image: '/beyvip/passport.png',
    points: ['Konsolosluk dosyası', 'Kimlik ve nüfus evrakları', 'Başvuru amacına uygun hazırlık'],
  },
  'hukuki-tercume': {
    title: 'Hukuki Tercüme',
    description: 'Sözleşme, vekaletname, mahkeme ve şirket evraklarında titiz terminoloji.',
    image: '/beyvip/legal.png',
    points: ['Sözleşme ve vekaletname', 'Şirket evrakları', 'Hukuki terminoloji dikkati'],
  },
} as const;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];

  if (!service) {
    return createSeoMetadata({
      title: 'Hizmet Bulunamadı',
      description: 'BEYVIP Translation Office hizmet detayı bulunamadı.',
      path: '/hizmetlerimiz',
    });
  }

  return createSeoMetadata({
    title: service.title,
    description: service.description,
    path: `/hizmetlerimiz/${slug}`,
    image: service.image,
    keywords: [service.title.toLocaleLowerCase('tr-TR')],
  });
}

const ServiceDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];

  if (!service) {
    notFound();
  }

  return (
    <main className="page-flow min-h-screen">
      <PageHero
        eyebrow="BEYVIP Hizmeti"
        title={service.title}
        description={service.description}
        image={service.image}
        imageAlt={service.title}
      />

      <section className="lale-light-section py-24 sm:py-28">
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 sm:px-7 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
          <div className="relative min-h-[420px] overflow-hidden rounded-[18px] border border-[rgba(195,149,58,0.18)] bg-white shadow-[0_24px_70px_rgba(17,17,17,0.10)]">
            <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
          </div>

          <div className="self-center">
            <div className="lale-kicker">SÜREÇ</div>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-[var(--dream-dark)]">
              Belgeniz için net, hızlı ve kontrollü tercüme akışı
            </h2>
            <p className="mt-5 text-sm leading-8 text-[var(--dream-text)] sm:text-base">
              Belgenizi WhatsApp veya e-posta ile ilettiğinizde evrak türü, hedef dil,
              onay ihtiyacı ve teslim beklentisi birlikte değerlendirilir.
            </p>

            <div className="mt-8 space-y-4">
              {service.points.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-[14px] border border-[rgba(195,149,58,0.16)] bg-white/80 px-4 py-4">
                  <FiCheckCircle className="h-5 w-5 shrink-0 text-[var(--lale-gold)]" />
                  <span className="text-sm text-[var(--dream-dark)]">{point}</span>
                </div>
              ))}
            </div>

            <Link href="/iletisim" className="lale-gold-button mt-8 gap-3">
              Teklif Al
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetailPage;
