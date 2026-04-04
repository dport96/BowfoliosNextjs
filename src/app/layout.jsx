import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Providers } from '@/components/Providers';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Bowfolios',
  description: 'Profiles, projects, and interests for the UH Community',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <div className="d-flex flex-column min-vh-100">
            <NavBar />
            <main className="flex-grow-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
