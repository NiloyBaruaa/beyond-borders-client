'use client';
import { useEffect } from "react";
import LoginBox from "../Components/auth/LoginBox"; // Ensure this path is correct

export default function LoginPage() {
  useEffect(() => {
    let deviceId = localStorage.getItem('bb_device_id');
    if (!deviceId) {
      deviceId = 'DEV-' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      localStorage.setItem('bb_device_id', deviceId);
    }
  }, []);

  return (
    <main>
      <LoginBox />
    </main>
  );
}