'use client';

import NavBar from '@/app/components/layout/NavBar';
import Hero from '@/app/components/Hero';
import Services from '@/app/components/Services';
import TechStack from '@/app/components/TechStack';
import Contact from '@/app/components/contact/Contact';
import Footer from '@/app/components/layout/Footer';
import TopClients from '@/app/components/TopClients';
import StarSpace from '@/app/components/StarSpace';

export default function HomePage() {
  return (
    <section className="pt-16 min-h-screen bg-gray-900 text-gray-100"> {/* Dark background + light text */}
      <StarSpace />

      {/* Content with higher z-index */}
      <div className="relative z-10">
        <header>
          <NavBar />
        </header>

        <main className="px-4 py-12 max-w-4xl mx-auto text-gray-100"> {/* Light text */}
          <Hero />
          <Services />
          <TechStack />
          <TopClients />
          <Contact />
        </main>

        <Footer />
      </div>
    </section>
  );
}