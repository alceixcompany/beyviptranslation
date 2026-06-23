import Hero from '@/components/Hero';
import Services from '@/components/Services';
import News from '@/components/News';
import Gallery from '@/components/Gallery';
import WhyChooseUs from '@/components/WhyChooseUs';
import References from '@/components/References';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import JsonLd from '@/components/JsonLd';
import CountryFlagSlider from '@/components/CountryFlagSlider';
import ServicePerks from '@/components/ServicePerks';
import { localBusinessJsonLd, websiteJsonLd } from '@/lib/seo';
import { getRequestSiteConfig } from '@/lib/server-seo';

export default async function Home() {
  const site = await getRequestSiteConfig();

  return (
    <main className="home-flow min-h-screen">
      <JsonLd data={[localBusinessJsonLd(site), websiteJsonLd(site)]} />
      <Hero />
      <CountryFlagSlider compact />
      <WhyChooseUs />
      <Services />
      <ServicePerks />
      <Gallery />
      <References />
      <FAQ />
      <News />
      <Contact />
    </main>
  );
}
