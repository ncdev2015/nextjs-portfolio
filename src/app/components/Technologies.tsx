"use client";

import { useState } from "react";

type TechItem = {
  name: string;
  icon?: React.ReactNode;
  description: string;
};

type TechCategory = {
  category: string;
  items: TechItem[];
};

const techStack: TechCategory[] = [
  {
    category: "Frontend",
    items: [
      {
        name: "React",
        description: "JavaScript library for building user interfaces.",
      },
      {
        name: "TypeScript",
        description: "Typed superset of JavaScript for safer code.",
      },
      {
        name: "Next.js",
        description: "Full-stack React framework for production-grade apps.",
      },
      {
        name: "Flutter",
        description:
          "UI toolkit for building natively compiled apps with Dart.",
      },
    ],
  },
  {
    category: "Backend",
    items: [
      {
        name: "Node.js",
        description: "JavaScript runtime built on Chrome's V8 engine.",
      },
      { name: "Express", description: "Minimalist web framework for Node.js." },
      {
        name: "Ruby on Rails",
        description: "Opinionated web framework for fast backend development.",
      },
      {
        name: "Flask / FastAPI",
        description: "Lightweight Python frameworks for APIs and web services.",
      },
    ],
  },
  {
    category: "Databases",
    items: [
      {
        name: "MySQL",
        description:
          "Popular open-source relational database known for speed and reliability.",
      },
      {
        name: "PostgreSQL",
        description: "Powerful open-source relational database.",
      },
      {
        name: "MongoDB",
        description: "NoSQL database for flexible document storage.",
      },
      {
        name: "Firebase",
        description: "Google's platform for real-time database and auth.",
      },
    ],
  },
  {
    category: "DevOps / Others",
    items: [
      {
        name: "Docker",
        description: "Container platform for consistent app deployment.",
      },
      {
        name: "CI/CD",
        description: "Automated testing and deployment pipelines.",
      },
      {
        name: "Cloud Platforms",
        description: "AWS, GCP, Azure: cloud infrastructure for apps.",
      },
    ],
  },
  {
    category: "AI / Machine Learning",
    items: [
      {
        name: "TensorFlow",
        description:
          "Open-source library for machine learning and deep learning.",
      },
      {
        name: "scikit-learn",
        description:
          "Machine learning library for classical algorithms in Python.",
      },
      {
        name: "OpenAI API",
        description:
          "Integration of GPT models for text generation, chatbots, and assistants.",
      },
      {
        name: "AI Agents",
        description:
          "Design and implementation of autonomous agents capable of perceiving, reasoning, and acting in dynamic environments.",
      },
    ],
  },
];

export default function TechStack() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <section id="technologies" className="py-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Technologies</h2>

      <div className="space-y-10">
        {techStack.map((group) => (
          <div key={group.category}>
            <h3 className="text-xl font-semibold mb-4 text-gray-200">
              {group.category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {group.items.map((tech) => {
                const id = `${group.category}-${tech.name}`;
                return (
                  <div key={tech.name} className="relative">
                    <div
                      className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 text-center hover:bg-blue-100 hover:border-gray-300 transition-colors duration-200 cursor-pointer select-none"
                      onClick={() => setOpenIndex(openIndex === id ? null : id)}
                    >
                      {tech.icon && <div className="mb-2">{tech.icon}</div>}
                      <p className="text-sm font-medium text-gray-800">
                        {tech.name}
                      </p>
                    </div>

                    {openIndex === id && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-full bg-gray-800 border-gray-300 text-gray-100 p-4 rounded-lg shadow-lg border z-10 select-none">
                        <p className="text-sm">{tech.description}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
