import React, { useEffect, useState } from "react";
// ... other imports ...
import { generateHeaderId } from './MDXComponents';
import { DocsLayoutProps } from "./DocsLayout";

interface TableOfContentsItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    items: TableOfContentsItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
    return (
        <div className="prose">
            <h4 className="text-lg mb-2">On this page:</h4>
            <nav className="text-sm">
                <ul className="list-none m-0 p-0">
                    {items.map((heading, index) => (
                        <li
                            key={index}
                            className={`my-2 hover:text-primary ${
                                heading.level === 2 ? 'ml-4' :
                                heading.level === 3 ? 'ml-8' : ''
                            }`}
                        >
                            <a
                                href={`#${heading.id}`}
                                className="no-underline hover:text-primary"
                            >
                                {heading.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

const DocsLayout: React.FC<DocsLayoutProps> = ({
    children,
    docsStructure,
    prevDoc,
    nextDoc,
    activeDoc,
}) => {
    const [toc, setToc] = useState<TableOfContentsItem[]>([]);

    useEffect(() => {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3'))
            .filter(heading => heading.id) // Only include headings with IDs
            .map(heading => ({
                id: heading.id,
                text: heading.textContent || '',
                level: parseInt(heading.tagName[1])
            }));
        setToc(headings);
    }, [children]); // Re-run when content changes

    return (
        <div className="flex flex-1 bg-base-200">
            <aside
                className="hidden lg:block sticky top-0 overflow-y-auto bg-base-200 p-4"
                style={{ height: "calc(100vh - 50px - 71px)" }}
            >
                <TableOfContents items={toc} />
            </aside>
        </div>
    );
};

export default TableOfContents;