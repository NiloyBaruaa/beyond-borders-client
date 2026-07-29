import type { Metadata } from 'next';
import './globals.css'; 

export const metadata: Metadata = {
  title: 'SAWN BD | Europe Study Abroad Bootcamp',
  description: 'The ultimate 4-week guided bootcamp to secure your European study abroad journey. Visa guidance, mock interviews, and document mastery.',
  keywords: ['Study in Europe', 'SAWN BD', 'Visa Mock Interview', 'Bangladeshi Students Europe', 'Stipendium Hungaricum'],
  openGraph: {
    title: 'SAWN BD | Europe Study Abroad Bootcamp',
    description: 'Secure your visa and scholarship with 1:1 mentorship, real-life mock interviews, and premium guidelines.',
    url: 'https://sawnbd.com', // Change to your new domain
    siteName: 'SAWN BD',
    images: [{
        url: 'https://sawnbd.com/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'SAWN BD Bootcamp Banner',
    }],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#050505] text-white">
        {children}
      </body>
    </html>
  );
}