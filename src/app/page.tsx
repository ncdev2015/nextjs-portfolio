'use client'; // Necesario para componentes con interacción en App Router

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Nelson C.</h1>

      <nav className="flex flex-col gap-4">
        <Link href="/services" className="text-blue-600 hover:underline">
          Services
        </Link>

        <Link href="/works" className="text-blue-600 hover:underline">
          Works
        </Link>
        <Link href="/blog" className="text-blue-600 hover:underline">
          Blog
        </Link>
      </nav>
    </main>
  );
}
