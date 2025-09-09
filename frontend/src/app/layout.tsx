import type { Metadata } from 'next';
import { Poppins, Merriweather, Roboto } from 'next/font/google';
import '@/styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-poppins',
});
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-merriweather',
});
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'esona',
  description: 'E-commerce search made easy.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${merriweather.variable} ${roboto.variable} min-h-screen min-w-screen`}
        cz-shortcut-listen="true"
      >
        {children}
      </body>
    </html>
  );
}
