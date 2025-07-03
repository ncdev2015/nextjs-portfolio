'use client';

import { faker } from '@faker-js/faker';

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
		    <div
		    	key={i}
		    	className="flip-card h-82"
		    >
		     	<div className="flip-inner border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-200 shadow-sm hover:shadow-md transition-all duration-300 w-full h-full relative min-h-0">
		        
			        {/* Front face */}
			        <div className="flip-front p-6 h-full overflow-hidden flex flex-col select-none text-gray-800">
			        	<h3 className="text-xl font-semibold mb-2 text-blue-700">
			            	{i === 1 ? "Web Development" : i === 2 ? "Mobile Development" : "IT Training"}
			        	</h3>
			        	<p className="text-base overflow-auto">
			        		{i === 1 ? desc1 : i === 2 ? desc2 : desc3}
			        	</p>
			        </div>

		        	{/* Back face */}
		        	<div className="flip-back bg-gray-800 text-gray-100 p-6 h-full overflow-hidden flex flex-col rounded-lg select-none">
		          	<h4 className="text-lg text-blue-500 font-semibold mb-2 select-none">More Info</h4>
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