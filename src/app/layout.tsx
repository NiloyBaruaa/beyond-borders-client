import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css'; 

export const metadata: Metadata = {
  title: 'SAWN BD | Europe Study Abroad Bootcamp',
  description: 'The ultimate 4-week guided bootcamp to secure your European study abroad journey. Visa guidance, mock interviews, and document mastery.',
  keywords: ['Study in Europe', 'SAWN BD', 'Visa Mock Interview', 'Bangladeshi Students Europe', 'Stipendium Hungaricum'],
  openGraph: {
    title: 'SAWN BD | Europe Study Abroad Bootcamp',
    description: 'Secure your visa and scholarship with 1:1 mentorship, real-life mock interviews, and premium guidelines.',
    url: 'https://sawnbd.com', 
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
        
        {/* Google Analytics (Replace G-XXXXXXXX with your Measurement ID) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXX');
          `}
        </Script>

        {/* Meta Pixel (Replace 123456789 with your Pixel ID) */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '123456789');
            fbq('track', 'PageView');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}