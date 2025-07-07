'use client'

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="bg-gray-800  text-white py-8 px-4 mt-6">
	        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
	          
	          <div className="text-sm text-center md:text-left">
	            © {new Date().getFullYear()} Nelson C. All rights reserved
	          </div>

	          <div className="flex space-x-6 text-xl">
	            <a href="mailto:ncde2015@gmail.com"><FaEnvelope /></a>
	            <a href="https://github.com/ncdev2015"><FaGithub /></a>
	            <a href="https://linkedin.com/in/ncdev2015"><FaLinkedin /></a>
	          </div>

	        </div>
	      </footer>
	);
}