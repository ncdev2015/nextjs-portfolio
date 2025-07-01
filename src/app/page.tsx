'use client';

import Link from 'next/link';
import NavBar from '@/app/components/NavBar'
import TechStack from '@/app/components/TechStack';
import { faker } from '@faker-js/faker'
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import './Debug.css'

export default function HomePage() {  
  faker.seed(10);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const title = faker.person.jobTitle();
  const profileDescription1 = faker.lorem.paragraph(5);  
  const profileDescription2 = faker.lorem.paragraph(5); 

  const desc1 = faker.lorem.paragraph();
  const desc2 = faker.lorem.paragraph();
  const desc3 = faker.lorem.paragraph();

  return (   
    <>
      <NavBar/>
      <main className="px-4 py-12 max-w-4xl mx-auto text-gray-900">
      <header id="home" className="mb-12 text-center">
        <h1 className="text-4xl font-bold">Nelson C.</h1>
        <h2 className="text-2xl text-gray-600 mt-2">Software Engineer & IT Instructor </h2>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">About me</h2>
        <p className="mb-4">{profileDescription1}</p>
        <p className="mb-4">{profileDescription2}</p>

        <div className="mt-6">
          <a
            href="#history"
            className="inline-flex items-center text-blue-600 hover:underline font-medium"
          >
            My history →
          </a>
        </div>
      </section>

      <section id="services" className="py-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Main services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow bg-white">
            <h3 className="text-xl font-semibold mb-2">Web Development</h3>
            <p>
              {desc1}
            </p>
          </div>

          <div className="p-6 border rounded-lg shadow bg-white">
            <h3 className="text-xl font-semibold mb-2">Mobile Development</h3>
            <p>
              {desc2}
            </p>
          </div>

          <div className="p-6 border rounded-lg shadow bg-white">
            <h3 className="text-xl font-semibold mb-2">Instructoring</h3>
            <p>
              {desc3}
            </p>
          </div>
        </div>
      </section>

      <TechStack/>

      <section id="companies" className="py-12 px-4 max-w-4xl mx-auto">     
        <h2 className="text-2xl font-semibold mb-8 text-center">Top clients</h2>

        <div className="flex flex-wrap justify-center items-center gap-8">
          <img
            src="/assets/icons/telefonica.png"
            alt="Telefonica Logo"
            className="w-32 max-w-full object-contain grayscale hover:grayscale-0 transition duration-300
             sm:w-25"
          />                              
          <img
            src="/assets/icons/indra.jpg"
            alt="Logo Initech"
            className="w-32 max-w-full object-contain grayscale hover:grayscale-0 transition duration-300
             sm:w-35"
          />          
          <img
            src="/assets/icons/ba.png"
            alt="Logo Globex Solutions"
            className="w-32 max-w-full object-contain grayscale hover:grayscale-0 transition duration-300
             sm:w-20"
          />
        <img
            src="/assets/icons/workana.jpeg"
            alt="Logo Initech"
            className="w-32 max-w-full object-contain grayscale hover:grayscale-0 transition duration-300
             sm:w-10"
          />
          <img
            src="/assets/icons/freelancer.png"
            alt="Logo Initech"
            className="w-32 max-w-full object-contain grayscale hover:grayscale-0 transition duration-300
             sm:w-30"
          />          
        </div>
      </section>

      <section id="contact" className="py-4 px-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Contact</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Send message
          </button>
        </form>        
      </section>      
      </main>

      <footer className="bg-gray-900 text-white py-8 px-4 mt-16">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          <div className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} Nelson C. All rights reserved
          </div>

          <div className="flex space-x-6 text-xl">
            <a href="mailto:tuemail@example.com"><FaEnvelope /></a>
            <a href="https://github.com/tuusuario"><FaGithub /></a>
            <a href="https://linkedin.com/in/tuusuario"><FaLinkedin /></a>
          </div>

        </div>
      </footer>

    </> 
  );
}