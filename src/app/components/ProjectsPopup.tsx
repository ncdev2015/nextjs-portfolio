// components/ProjectsPopup.tsx
import { useState, useEffect } from "react";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  description: string;
  features?: string[];
  imageUrl?: string;
  tags?: string[];
  link?: string;
  github?: string;
};

const ProjectsPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const projectsData: Project[] = [
      {
        id: "1",
        title: "3D Model Editor (Similar to Blender)",
        description:
          "A lightweight browser-based 3D modeling tool with intuitive controls for creators.",
        features: [
          "Browser-based 3D modeling",
          "Intuitive UI similar to Blender",
          "Real-time rendering",
          "Export to common 3D formats",
        ],
        imageUrl: "/assets/images/3d-editor.png",
        tags: [
          "Three.js",
          "WebGL",
          "React",
          "TypeScript",
          "Next.js",
          "MongoDB",
        ],
      },
      {
        id: "2",
        title: "SaaS Service for E-commerce",
        description:
          "Complete backend solution for online stores with inventory, payments, and analytics.",
        features: [
          "Inventory management system",
          "Integrated payment processing",
          "Real-time analytics dashboard",
          "Scalable cloud architecture",
        ],
        imageUrl: "/assets/images/sass-ecom.png",
        tags: ["Node.js", "React", "MongoDB", "AWS", "Stripe API"],
      },
      {
        id: "3",
        title: "Multiplayer Online Game",
        description:
          "Real-time browser game with WebSocket connectivity and matchmaking system.",
        features: [
          "WebSocket-based real-time gameplay",
          "Automated matchmaking",
          "In-game chat system",
          "Cross-platform compatibility",
        ],
        imageUrl: "/assets/images/multiplayer-game.png",
        tags: ["Socket.io", "Node.js", "Canvas", "Redis", "Real-time"],
      },
      {
        id: "4",
        title: "Landing Page with Call to Action",
        description:
          "High-conversion marketing page built with performance best practices.",
        features: [
          "99+ Google PageSpeed score",
          "A/B testing integration",
          "SEO optimized structure",
          "Responsive mobile design",
        ],
        imageUrl: "/assets/images/landing-page.png",
        tags: [
          "Next.js",
          "Tailwind CSS",
          "SEO",
          "Vercel Analytics",
          "Framer Motion",
        ],
      },
      {
        id: "5",
        title: "Electronic Educational Game (Web Connected)",
        description:
          "Interactive learning platform with progress tracking and admin dashboard.",
        features: [
          "Adaptive learning paths",
          "Real-time progress tracking",
          "Teacher/admin dashboard",
          "Gamification elements",
        ],
        imageUrl: "/assets/images/edu-game.png",
        tags: [
          "React",
          "Firebase",
          "Chart.js",
          "Gamification",
          "Progress Tracking",
          "Microcontrollers",
          "Display LCD",
          "Buttons and Sensors",
        ],
      },
      {
        id: "6",
        title: "Educational Whiteboard for STEM",
        description:
          "Interactive whiteboard with models, graphs and simulations for learning math, physics and computer science.",
        features: [
          "Interactive mathematical models",
          "Physics simulations engine",
          "Programming concepts visualizer",
          "Collaborative learning tools",
          "Customizable teaching modules",
        ],
        imageUrl: "/assets/images/stem-whiteboard.png",
        tags: ["React", "Canvas API", "MathJax", "WebGL", "Firebase"],
      },
    ];

    setProjects(projectsData);
  }, []);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  if (!isOpen || projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Project Gallery
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Image section with fixed size */}
          <div className="w-full md:w-1/2 h-64 md:h-96 bg-gray-100 dark:bg-gray-700 relative flex items-center justify-center overflow-hidden">
            {currentProject.imageUrl ? (
              <Image
                src={currentProject.imageUrl}
                alt={currentProject.title}
                fill
                className="object-contain"
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                <span className="text-lg">No Image Available</span>
              </div>
            )}
          </div>

          {/* Details section */}
          <div className="w-full md:w-1/2 p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {currentProject.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {currentProject.description}
            </p>

            {currentProject.tags && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  TECHNOLOGIES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              {currentProject.link && (
                <a
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Live Demo
                </a>
              )}
              {currentProject.github && (
                <a
                  href={currentProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  View Code
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevProject}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-gray-600 transition-all backdrop-blur-sm"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextProject}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-gray-600 transition-all backdrop-blur-sm"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Project indicators */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index
                  ? "bg-blue-600 w-6"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPopup;
