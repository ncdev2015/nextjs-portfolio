import './globals.css';

export const metadata = {
  title: 'Mi Portfolio',
  description: 'Portfolio de Nelson',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
