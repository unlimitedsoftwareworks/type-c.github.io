// src/components/Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // If under docs/ we hide the footer
  const isOnDocs = typeof window !== 'undefined' && window.location.pathname.startsWith('/docs/');

  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <main className="flex-grow overflow-auto">
        {children}
      </main>
      {!isOnDocs && <Footer />}
    </div>
  );
};

export default Layout;
