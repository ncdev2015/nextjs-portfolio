"use client";

import { useState } from "react";
import { faker } from "@faker-js/faker";

export default function Services() {
  faker.seed(10);

  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>(
    {}
  );

  const toggleFlip = (i: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [i]: !prev[i],
    }));
  };

  const desc1 =
    "I build fast and scalable websites and web apps using technologies like Next.js, Tailwind CSS, and REST APIs. I work across both frontend and backend, focusing on performance and user experience.";
  const moreInfo1 =
    "HTML, CSS, JavaScript, React, Next.js, Tailwind CSS, Node.js, Express, REST APIs, Vercel, SEO best practices, responsive design.";

  const desc2 =
    "I develop cross-platform mobile apps with React Native or Flutter, ensuring smooth performance and intuitive design for both Android and iOS.";
  const moreInfo2 =
    "React Native, Flutter, Expo, Firebase, push notifications, native modules, performance optimization, Play Store and App Store publishing.";

  const desc3 =
    "I offer customized training in programming and IT for individuals and teams. I have experience teaching C++, web development, data structures, and modern JavaScript tools.";
  const moreInfo3 =
    "C/C++, JavaScript, Python, Java, Elixir, web development, algorithms and data structures, software engineering fundamentals, 1:1 coaching, group workshops, bootcamp-style training.";

  return (
    <section id="services" className="py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flip-card h-82 ${flippedCards[i] ? "flipped" : ""}`}
            onClick={() => toggleFlip(i)}
          >
            <div
              className={`flip-inner border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-200 shadow-sm transition-all duration-800 w-full h-full relative min-h-0 cursor-pointer ${
                flippedCards[i] ? "flipped" : ""
              }`}
            >
              {/* Front face */}
              <div className="flip-front p-6 flex flex-col select-none text-gray-800">
                <h3 className="text-xl font-semibold mb-2 text-blue-700">
                  {i === 1
                    ? "Web Development"
                    : i === 2
                    ? "Mobile Development"
                    : "IT Training"}
                </h3>
                <p className="text-base flex-grow">
                  {i === 1 ? desc1 : i === 2 ? desc2 : desc3}
                </p>
                <p className="mt-auto self-end text-right font-semibold text-blue-600 cursor-pointer select-none transition duration-300 ease-in-out hover:underline">
                  More info
                </p>
              </div>

              {/* Back face */}
              <div className="flip-back bg-gray-800 text-gray-100 p-6 h-full overflow-hidden flex flex-col rounded-lg select-none">
                <h4 className="text-lg text-blue-500 font-semibold mb-2 select-none">
                  More Info
                </h4>
                <p className="text-base overflow-auto">
                  {i === 1 ? moreInfo1 : i === 2 ? moreInfo2 : moreInfo3}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
