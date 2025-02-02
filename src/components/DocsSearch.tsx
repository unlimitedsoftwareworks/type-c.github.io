import Fuse, { FuseResult } from 'fuse.js';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import { GiSadCrab } from 'react-icons/gi';
import { TiDocumentText } from 'react-icons/ti';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface SearchItem {
    title: string;
    slug: string;
    excerpt?: string;
    pageTitle?: string;
}

const DocsSearch = () => {
    const router = useRouter();
    const [searchIndex, setSearchIndex] = useState<SearchItem[]>([]);
    const [query, setQuery] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [results, setResults] = useState<FuseResult<SearchItem>[]>([]);
    const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [serializedExcerpts, setSerializedExcerpts] = useState<Record<number, any>>({});

    const fuseOptions = {
        keys: ['title', 'excerpt'],
        includeScore: true,
        includeMatches: true,
        threshold: 0.3,
    };

    useEffect(() => {
        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const search = () => {
        if (query) {
            setLoaded(false);
            setShowDropdown(true);
            
            if (fuse) {
                const result = fuse.search(query);
                setResults(result || []);
                setLoaded(true);
            } else {
                fetch('/search-index.json')
                    .then((res) => res.json())
                    .then((data: SearchItem[]) => {
                        setSearchIndex(data);
                        let newFuse = new Fuse(data, fuseOptions);
                        setFuse(newFuse);

                        const searchResults = newFuse.search(query);
                        setResults(searchResults);
                        setLoaded(true);
                    }).catch((err) => {
                        setLoaded(true);
                    });
            }
        } else {
            setShowDropdown(false);
        }
    }

    // Debounce search as user types
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query) {
                search();
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Serialize excerpts when results change
    useEffect(() => {
        const serializeExcerpts = async () => {
            const serialized: Record<number, any> = {};
            for (const result of results) {
                if (result.item.excerpt) {
                    try {
                        // Escape any potential HTML-like syntax in the excerpt
                        const sanitizedExcerpt = result.item.excerpt
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;');
                        serialized[result.refIndex] = await serialize(sanitizedExcerpt);
                    } catch (error) {
                        console.error('Failed to serialize excerpt:', error);
                    }
                }
            }
            setSerializedExcerpts(serialized);
        };

        serializeExcerpts();
    }, [results]);

    return (
        <div className="dropdown dropdown-end relative" ref={dropdownRef}>
            <label className="input input-bordered flex items-center gap-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="Search the docs"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && results.length > 0) {
                            router.push(`/docs/${results[0].item.slug}`);
                            setQuery('');
                        }
                    }}
                />
                <svg 
                    onClick={search} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 16 16" 
                    fill="currentColor" 
                    className="w-4 h-4 opacity-70 cursor-pointer"
                >
                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                </svg>
            </label>

            {query && (
                <div className="dropdown-content block absolute z-[9999] menu p-0 shadow bg-base-100 rounded-box w-[400px] max-h-[500px] overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-base-100">
                    {!loaded && (
                        <div className="p-4 text-center">
                            <span className="loading loading-infinity loading-lg"></span>
                        </div>
                    )}
                    {loaded && results.map((result) => (
                        <button
                            key={result.refIndex}
                            className="w-full p-3 hover:bg-base-200 text-left border-b border-base-200 last:border-none block"
                            onClick={() => {
                                router.push(`/docs/${result.item.slug}`);
                                setQuery('');
                            }}
                        >
                            {serializedExcerpts[result.refIndex] && (
                                <div className="text-md mt-1 line-clamp-4 prose prose-sm max-w-none opacity-70 [&_h1]:text-base [&_h2]:text-base [&_h3]:text-base [&_h4]:text-base break-words">
                                    <MDXRemote {...serializedExcerpts[result.refIndex]} />
                                </div>
                            )}
                        </button>
                    ))}
                    {loaded && results.length === 0 && (
                        <div className="p-4 text-center">
                            <GiSadCrab size={40} className="mx-auto mb-2" />
                            <p className="text-sm">No results found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DocsSearch;
