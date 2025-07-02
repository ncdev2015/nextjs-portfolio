'use client'

export default function Companies() {
	return (
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
	);
}