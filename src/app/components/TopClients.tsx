'use client'

export default function Companies() {
  const logos = [
    { src: "/assets/icons/telefonica.png", alt: "Telefonica", className: "w-32" },
    { src: "/assets/icons/indra.jpg", alt: "Indra", className: "w-40" },
    { src: "/assets/icons/ba.png", alt: "BA", className: "w-32" },
    { src: "/assets/icons/workana.png", alt: "Workana", className: "w-24" },
    { src: "/assets/icons/freelancer.png", alt: "Freelancer", className: "w-40" },
  ];

  return (
    <section id="companies" className="py-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-8 text-center">Top clients</h2>

      <div className="overflow-hidden">
        <div className="flex animate-scroll gap-8 w-max">
          {[...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className={`${logo.className} max-w-full object-contain grayscale hover:grayscale-0 transition duration-300 select-none`}
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
