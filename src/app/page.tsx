'use client'; // Necesario para componentes con interacción en App Router

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Bienvenido a mi portfolio</h1>

      <nav className="flex flex-col gap-4">
        <Link href="/about" className="text-blue-600 hover:underline">
          Sobre mí
        </Link>

        <Link href="/contact" className="text-blue-600 hover:underline">
          Contacto
        </Link>
      </nav>
    </main>
  );
}
