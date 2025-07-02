import { useState, useRef, useEffect } from "react";

const tools = [
  { name: "Ruby on Rails", info: "A full-stack web framework optimized for developer happiness." },
  { name: "Next.js", info: "React-based framework for building fast web applications." },
  { name: "Tailwind CSS", info: "A utility-first CSS framework for rapidly building custom designs." },
];

export default function ToolButtons() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-wrap gap-4 p-4" ref={ref}>
      {tools.map((tool, index) => (
        <div className="relative" key={tool.name}>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => setOpenIndex(index === openIndex ? null : index)}
          >
            {tool.name}
          </button>

          {openIndex === index && (
            <div className="absolute z-10 top-full mt-2 w-64 p-4 bg-white text-gray-800 rounded-lg shadow-lg border">
              <p className="text-sm">{tool.info}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
