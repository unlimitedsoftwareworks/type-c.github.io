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
        <div className="flex flex-1 h-screen">
            {/* Sticky Sidebar */}
            <aside className="sticky left-0 top-0 h-screen overflow-y-auto bg-base-100 w-200 p-4">
                <Sidebar docsStructure={docsStructure} />
            </aside>

            {/* Main content area, independently scrollable */}
            <main className="flex-1 overflow-y-auto p-4 bg-base-100">
                {children}
            </main>
        </div>
    );
};

export default DocsLayout;


