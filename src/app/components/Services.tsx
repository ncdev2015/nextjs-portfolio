'use client';

import { faker } from '@faker-js/faker'

export default function Services() {
	faker.seed(10);

	const desc1 = faker.lorem.paragraph();
  	const desc2 = faker.lorem.paragraph();
  	const desc3 = faker.lorem.paragraph();

	return (
		<section id="services" className="py-10 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Main services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
		  {[1, 2, 3].map((i) => (
		    <div key={i} className="flip-card h-82">
		      <div className="flip-inner border rounded-lg shadow bg-white w-full h-full relative">
		        
		        {/* Front face */}
		        <div className="flip-front p-6 h-full overflow-hidden flex flex-col">
		          <h3 className="text-xl font-semibold mb-2">
		            {i === 1 ? "Web Development" : i === 2 ? "Mobile Development" : "IT Training"}
		          </h3>
		          <p className="text-base overflow-auto">
		            {i === 1 ? desc1 : i === 2 ? desc2 : desc3}
		          </p>
		        </div>

		        {/* Back face */}
		        <div className="flip-back bg-gray-100 p-6 h-full overflow-hidden flex flex-col rounded-lg">
		          <h4 className="text-lg font-semibold mb-2">More Info</h4>
		          <p className="text-base overflow-auto">
		            {i === 1
		              ? "HTML, CSS, JS, React, Next.js, Tailwind..."
		              : i === 2
		              ? "React Native, Flutter, deployment tips..."
		              : "Workshops, programming bootcamps, 1:1 training..."}
		          </p>
		        </div>
		        
		      </div>
		    </div>
		  ))}
		</div>
      </section>
	);
}