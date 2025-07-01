'use client';

type TechItem = {
  name: string;
  icon?: React.ReactNode;
};

type TechCategory = {
  category: string;
  items: TechItem[];
};

const techStack: TechCategory[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React' },      
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Flutter' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'Ruby on Rails' },
      { name: 'Flask / FastAPI' },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'Firebase' },
    ],
  },
  {
    category: 'DevOps / Others',
    items: [
      { name: 'Docker' },
      { name: 'CI/CD' },
      { name: 'Cloud Platforms' },
      { name: 'Vercel' },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">Main technologies</h2>

      <div className="space-y-10">
        {techStack.map((group) => (
          <div key={group.category}>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">{group.category}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {group.items.map((tech) => (
                <div
                  key={tech.name}
                  className="bg-white border rounded-lg shadow-sm p-4 text-center hover:shadow-md transition"
                >
                  {tech.icon && <div className="mb-2">{tech.icon}</div>}
                  <p className="text-sm font-medium text-gray-800">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
