'use client';

import Link from 'next/link';
import { faker } from '@faker-js/faker'


import NavBar from '@/app/components/layout/NavBar'
import Hero from '@/app/components/Hero';
import Services from '@/app/components/Services';
import TechStack from '@/app/components/TechStack';
import Contact from '@/app/components/contact/Contact';
import Footer from '@/app/components/layout/Footer';

import './Debug.css'

export default function HomePage() {  
  faker.seed(10);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const title = faker.person.jobTitle();

  return (   
    <>
      <NavBar/>

      <main className="px-4 py-12 max-w-4xl mx-auto text-gray-900">
        <Hero/>
        <Services/>
        <TechStack/>
        <Contact/>
      </main>

      <Footer/>
    </> 
  );
}