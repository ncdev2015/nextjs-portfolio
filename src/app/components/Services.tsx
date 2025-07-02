'use client';

import { faker } from '@faker-js/faker'

export default function Services() {
	faker.seed(10);

	const desc1 = faker.lorem.paragraph();
  	const desc2 = faker.lorem.paragraph();
  	const desc3 = faker.lorem.paragraph();

	return (
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
            <h3 className="text-xl font-semibold mb-2">IT Training</h3>
            <p>
              {desc3}
            </p>
          </div>
        </div>
      </section>
	);
}