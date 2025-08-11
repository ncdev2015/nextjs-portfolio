"use client";

import NavBar from "@/app/components/layout/NavBar";
import Hero from "@/app/components/Hero";
import Services from "@/app/components/Services";
import Technologies from "@/app/components/Technologies";
import Contact from "@/app/components/contact/Contact";
import Footer from "@/app/components/layout/Footer";
import Experience from "@/app/components/Experience";
import ParticlesBackground from "@/app/components/ParticlesBackground";

export default function HomePage() {
  return (
    <section className="pt-16 min-h-screen bg-gray-900 text-gray-100">
      {" "}
      {/* Dark background + light text */}
      <ParticlesBackground />
      {/* Content with higher z-index */}
      <div className="relative z-10">
        <header>
          <NavBar />
        </header>

        <main className="px-4 py-12 max-w-4xl mx-auto text-gray-100">
          {" "}
          {/* Light text */}
          <Hero />
          <Services />
          <Technologies />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </section>
  );
}
