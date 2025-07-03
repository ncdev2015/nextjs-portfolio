'use client';

import { faker } from '@faker-js/faker'

export default function Hero() {
	faker.seed(10);

	const profileDescription1 = faker.lorem.paragraph(5);  
  	const profileDescription2 = faker.lorem.paragraph(5); 

	return (
		<section className="mb-12">

		<header id="home" className="mb-12 text-center">
	    	<h1 className="text-4xl font-bold">Nelson C.</h1>
	    	<h2 className="text-2xl text-gray-200 mt-2">Software Engineer & IT Instructor </h2>
	    </header>

        <h2 className="text-2xl font-semibold mb-4">About me</h2>
        <p className="mb-4">{profileDescription1}</p>
        <p className="mb-4">{profileDescription2}</p>

        <div className="mt-6 text-blue-400 font-bold">
          <a
            href="#history"
            className="inline-flex items-center text-blue-600 hover:underline font-medium"
          >
            My history →
          </a>
        </div>
      </section>
	);
}