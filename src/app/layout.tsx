import React from 'react';
import AuthRedirect from '@/components/auth/AuthRedirect';
import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from '@/components/ui/sonner';
import Script from 'next/script';

const outfit = Outfit({
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          src="https://umami.laice.tech/script.js"
          data-website-id="9f4e8e06-e617-4269-8356-9ccc626f3a66"
        />
      </head>
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <AuthRedirect />
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
