import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCheckCircle, FiClock, FiFileText, FiGlobe, FiShield } from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import CountryFlagSlider from '@/components/CountryFlagSlider';
import { createSeoMetadata } from '@/lib/seo';
import { getRequestSiteConfig } from '@/lib/server-seo';

export async function generateMetadata() {
  const site = await getRequestSiteConfig();

  return createSeoMetadata({
    title: `${site.locationName} Yeminli Tercüme Ofisi Hakkında`,
    description: `${site.name}; resmi evrak, pasaport, vize, yeminli ve noter onaylı tercüme süreçlerinde profesyonel destek sunar.`,
    path: '/hakkimizda',
    image: '/beyvip/about.png',
    keywords: [`${site.locationName.toLocaleLowerCase('tr-TR')} tercume ofisi`],
    site,
  });
}

const values = [
  { icon: FiShield, title: 'Güven', desc: 'Belgeleriniz gizlilik ve dikkatle ele alınır.' },
  { icon: FiClock, title: 'Hız', desc: 'Teslim süresi baştan netleştirilir.' },
  { icon: FiFileText, title: 'Düzen', desc: 'Evrak formatı kullanım amacına göre hazırlanır.' },
  { icon: FiGlobe, title: 'Dil Desteği', desc: 'İngilizce, Arapça, Farsça, Fransızca ve Rusça.' },
] as const;

const AboutPage = () => {
  return (
    <main className="page-flow min-h-screen">
      <PageHero
        eyebrow="Hakkımızda"
        title={<>BEYVIP<br />Translation Office</>}
        description="Resmi evrak tercümelerinde hızlı, dikkatli ve süreç odaklı çalışma anlayışı."
        image="/beyvip/about.png"
        imageAlt="BEYVIP tercüme ofisi"
      />

      <section className="lale-light-section py-24 sm:py-28">
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-7 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:px-10">
          <div>
            <div className="lale-kicker">KURUMSAL YAKLAŞIM</div>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-[var(--dream-dark)] sm:text-5xl">
              Tercümeyi belgenin kullanılacağı resmi sürecin parçası olarak ele alıyoruz
            </h2>
            <div className="mt-6 space-y-5 text-sm leading-8 text-[var(--dream-text)] sm:text-base">
              <p>
                BEYVIP Translation Office; pasaport, kimlik, diploma, transkript,
                vekaletname, sözleşme, vize ve ikamet evraklarında doğru terminoloji,
                temiz format ve hızlı teslim odağıyla çalışır.
              </p>
              <p>
                Belgenizi gönderdiğinizde hedef dil, noter onayı ihtiyacı, teslim süresi
                ve başvuru amacı birlikte değerlendirilir. Böylece yalnızca çeviri değil,
                daha düzenli bir evrak süreci alırsınız.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Accepted worldwide', 'Accurate details', 'Fast turnaround', 'Official document focus'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-[14px] border border-[rgba(195,149,58,0.16)] bg-white/78 px-4 py-4">
                  <FiCheckCircle className="h-5 w-5 text-[var(--lale-gold)]" />
                  <span className="text-sm text-[var(--dream-dark)]">{item}</span>
                </div>
              ))}
            </div>

            <Link href="/iletisim" className="lale-gold-button mt-8 gap-3">
              Teklif Al
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative min-h-[520px] overflow-hidden rounded-[18px] border border-[rgba(195,149,58,0.18)] bg-white shadow-[0_24px_70px_rgba(17,17,17,0.10)]">
            <Image src="/beyvip/about.png" alt="BEYVIP ofis ve evrak süreci" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
          </div>
        </div>
      </section>

      <CountryFlagSlider />

      <section className="lale-light-section py-20 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article key={value.title} className="rounded-[18px] border border-[rgba(195,149,58,0.16)] bg-white/86 p-7 shadow-[0_18px_50px_rgba(17,17,17,0.07)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(195,149,58,0.12)] text-[var(--lale-gold)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-[var(--dream-dark)]">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--dream-text)]">{value.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
