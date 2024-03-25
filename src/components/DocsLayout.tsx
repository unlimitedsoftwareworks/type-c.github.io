// src/components/DocsLayout.tsx
import React from 'react';
import Sidebar from './Sidebar';

interface DocItem {
    name: string;
    title: string;
    items?: DocItem[];
  }
  
  interface DocsLayoutProps {
    children: React.ReactNode;
    docsStructure: DocItem[]; // Changed from slugs to docsStructure
  }
  

// Assuming DocItem is defined somewhere, either in this file or imported
const DocsLayout: React.FC<DocsLayoutProps> = ({ children, docsStructure }) => {
  return (
    <div className="flex flex-1 bg-base-200 striped1">
  {/* Sticky Sidebar */}
  <aside className="sticky top-0 overflow-y-auto bg-base-200 p-4" style={{height: 'calc(100vh - 50px - 71px)'}}>
    <Sidebar docsStructure={docsStructure} />
  </aside>
  
  {/* Main content area, independently scrollable */}
  <main className="flex-1 overflow-y-auto p-4 bg-base-200 prose lg:prose-md m-auto max-w-4xl mx-auto px-4">
    {children}
  </main>
</div>

  );
};

export default DocsLayout;


