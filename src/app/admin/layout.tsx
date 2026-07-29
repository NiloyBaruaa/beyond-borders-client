'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verifyClearance = async () => {
      const token = localStorage.getItem('bootcamp_token');
      
      // 1. No token? Kick to login.
      if (!token) {
        router.replace('/login');
        return;
      }

      try {
        // 2. Fetch the user's actual profile from the backend
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) {
          localStorage.removeItem('bootcamp_token');
          router.replace('/login');
          return;
        }

        const user = await res.json();

        // 3. STRICT ROLE CHECK (The Gatekeeper)
        if (user.role === 'superadmin' || user.role === 'admin') {
          // Access Granted: Unblur the screen and show the page
          setAuthorized(true); 
        } else {
          // SECURITY BREACH DETECTED: Student trying to enter admin zone.
          // Using router.replace so they can't even use the browser "Back" button to get in.
          router.replace('/dashboard');
        }
      } catch (e) {
        router.replace('/login');
      }
    };

    verifyClearance();
  }, [pathname, router]); // Re-run this check every time they navigate within the admin panel

  // 4. The "Locked Door" Screen
  // While the system is checking their role, show NOTHING but this loading screen.
  // This prevents the page from flashing on the screen for a split second.
  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505]">
        <div className="text-warningRed font-bold tracking-widest animate-pulse text-xl">
          🛡️ VERIFYING COMMAND CLEARANCE...
        </div>
      </div>
    );
  }

  // 5. If authorized is true, render the actual admin pages
  return <>{children}</>;
}