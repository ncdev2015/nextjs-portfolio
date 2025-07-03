'use client';

import Link from 'next/link';
import { faker } from '@faker-js/faker';

import NavBar from '@/app/components/layout/NavBar';
import Hero from '@/app/components/Hero';
import Services from '@/app/components/Services';
import TechStack from '@/app/components/TechStack';
import Contact from '@/app/components/contact/Contact';
import Footer from '@/app/components/layout/Footer';
import TopClients from '@/app/components/TopClients';
import ParticleBackground from '@/app/components/ParticleBackground'; // Asegúrate de que el nombre del archivo esté bien escrito

export default function HomePage() {    
  return (
    <div className="min-h-screen bg-black"> {/* Fondo oscuro para contraste */}
      <ParticleBackground />
      
      {/* Contenido con z-index mayor */}
      <div className="relative z-10"> 
        <header>
          <NavBar />
        </header>
        
        <main className="px-4 py-12 max-w-4xl mx-auto text-gray-100"> {/* Texto claro */}
          <Hero />
          <Services />
          <TechStack />
          <TopClients />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </div>
  );
}