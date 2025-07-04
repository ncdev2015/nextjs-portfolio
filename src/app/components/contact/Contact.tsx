'use client'

import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Contact() {
	const recaptchaRef = useRef<ReCAPTCHA>(null);
		const [status, setStatus] = useState('');

		const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		// Execute invisible captcha and get token
		const token = await recaptchaRef.current?.executeAsync();
		recaptchaRef.current?.reset();

		const res = await fetch('/api/contact', {
		  method: 'POST',
		  body: JSON.stringify({
		    name: formData.get('name'),
		    email: formData.get('email'),
		    message: formData.get('message'),
		    captcha: token,
		  }),
		});

		const data = await res.json();
			setStatus(data.message);
		};

	return (
		<section id="contact" className="py-4 px-4 max-w-2xl mx-auto">
			<h2 className="text-3xl font-semibold mb-6 text-center">Contact form</h2>
	    	<form className="space-y-4" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-gray-100">Name</label>
					<input
					  type="text"
					  id="name"
					  name="name"
					  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-black"
					  required
					/>
				</div>

				<div>
					<label htmlFor="email" className="block text-sm font-medium text-gray-100">Email</label>
					<input
					  type="email"
					  id="email"
					  name="email"
					  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-black"
					  required
					/>
				</div>

				<div>
					<label htmlFor="message" className="block text-sm font-medium text-gray-100">Message</label>
					<textarea
					  id="message"
					  name="message"
					  rows={4}
					  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-black"
					  required
					/>
				</div>

		      	<button
				  type="submit"
				  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
				>
				  Send message
				</button>

				{status && <p className="mt-4 text-center text-white">{status}</p>}
			</form>
		</section>
	);
}