import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import DocsSearch from './DocsSearch';

interface DocItem {
    name: string;
    title: string;
    items?: DocItem[];
}

interface SidebarProps {
    docsStructure: DocItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ docsStructure }) => {
    const router = useRouter();
    const getCurrentPath = () => {
        const slug = router.query.slug; 
        if (Array.isArray(slug)) {
            return `/docs/${slug.join('/')}`; // Join the slug array into a path
        }
        return '/docs'; // Default path if no slug
    };
    
    const renderDocs = (items: DocItem[]) => (
        <ul className="menu bg-base-200 w-200">
            {items.map(item => (
                <React.Fragment key={item.name}>
                    {item.items && item.items.length > 0 ? (
                        // If the item has sub-items, render them in a nested list
                        <li>
                            <details open>
                                <summary>{item.title}</summary>
                                {renderDocs(item.items)} {/* Recursive call */}
                            </details>
                        </li>
                    ) : (
                        // If the item is a leaf node, render a link
                        <li>
                            <Link className={getCurrentPath() === `/docs/${item.name}` ? 'active' : ''} href={`/docs/${item.name}`}>{item.title}</Link>
                        </li>
                    )}
                </React.Fragment>
            ))}
        </ul>
    );

    return (
        <aside>
            <DocsSearch/>
            {renderDocs(docsStructure)} {/* Initial call with the top-level structure */}
        </aside>
    );
};

export default Sidebar;