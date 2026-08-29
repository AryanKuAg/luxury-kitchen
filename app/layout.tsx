import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Form / Matter — Modern Kitchens + Living Spaces',
  description:
    'Bespoke kitchens, timeless materials, and architectural living spaces made around you.',
  icons: {
    icon: 'favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth bg-[#20221f] motion-reduce:scroll-auto"
    >
      <body className="m-0 bg-[#20221f] font-body font-medium text-[#1d1e1b] antialiased selection:bg-[#1d1e1b] selection:text-[#f1eee8]">
        {children}
      </body>
    </html>
  );
}
