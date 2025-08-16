"use client";

import Image from "next/image";

export default function Companies() {
  const logos = [
    {
      src: "/assets/icons/workana.png",
      alt: "Workana",
      className: "w-34",
      width: 136,
      height: 40,
    },
    {
      src: "/assets/icons/telefonica.png",
      alt: "Telefonica",
      className: "w-34",
      width: 136,
      height: 40,
    },
    {
      src: "/assets/icons/indra.jpg",
      alt: "Indra",
      className: "w-34",
      width: 136,
      height: 40,
    },
    {
      src: "/assets/icons/ba.png",
      alt: "BA",
      className: "w-32",
      width: 128,
      height: 40,
    },
    {
      src: "/assets/icons/freelancer.png",
      alt: "Freelancer",
      className: "w-35",
      width: 140,
      height: 40,
    },
    {
      src: "/assets/icons/alten.png",
      alt: "Alten Italy",
      className: "w-35",
      width: 140,
      height: 40,
    },
    {
      src: "/assets/icons/godot.png",
      alt: "Godot Engine",
      className: "w-32",
      width: 140,
      height: 40,
    },
  ];

  return (
    <section id="experience" className="py-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-center">Experience</h2>

      <div className="overflow-hidden">
        <div className="flex animate-scroll gap-8 w-max">
          {[...logos, ...logos].map((logo, i) => (
            <Image
              key={i}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className={`${logo.className} max-w-full object-contain grayscale hover:grayscale-0 transition duration-300 select-none`}
              unoptimized
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
