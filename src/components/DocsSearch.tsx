import Fuse, { FuseResult } from 'fuse.js';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { GiSadCrab } from 'react-icons/gi';
import { TiDocumentText } from 'react-icons/ti';

interface SearchItem {
    title: string;
    slug: string;
    excerpt?: string;
}

const DocsSearch = () => {
    const router = useRouter();
    const [searchIndex, setSearchIndex] = useState<SearchItem[]>([]);
    const [query, setQuery] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [results, setResults] = useState<FuseResult<SearchItem>[]>([]);
    const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null);

    const fuseOptions = {
        keys: ['title', 'excerpt'],
        includeScore: true,
        includeMatches: true,
        threshold: 0.3,
    };


    const search = () => {
        if (query) {
            // @ts-ignore
            document.getElementById('my_modal_1').showModal()
            setLoaded(false)
            if (fuse) {
                const result = fuse?.search(query);
                setResults(result || []);
                setLoaded(true);
            }
            else {
                setLoaded(false)
                fetch('/search-index.json')
                    .then((res) => res.json())
                    .then((data: SearchItem[]) => {
                        setSearchIndex(data);
                        let newFuse = new Fuse(data, fuseOptions);
                        setFuse(newFuse);

                        const searchResults = newFuse.search(query);
                        setResults(searchResults);
                        setLoaded(true);
                    });
            }
        }
    }

    return (
        <>
            <label className="input input-bordered flex items-center gap-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            search();
                        }
                    }}
                />
                <svg onClick={search} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 cursor-pointer">
                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                </svg>
            </label>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Search Results</h3>
                    <div>
                        <form method="dialog">
                        {!loaded && <span className="loading loading-infinity loading-lg"></span>}
                        {loaded && results.map((result, index) => (
                            <button
                                key={result.refIndex}
                                className='p-5 bg-base-200 hover:bg-neutral hover:text-neutral-content cursor-pointer text-left'
                                onClick={() => { router.push(`/docs/${result.item.slug}`) }}>
                                <p className='flex flex-1 flex-row'><TiDocumentText className='pr-1' size={24} /> {result.item.slug}</p>
                                <p className='pt-2'>{result.item.excerpt}</p>
                            </button>
                        ))}
                        {loaded && (results.length === 0) && (
                            <div>
                                <p className='flex flex-col items-center justify-center'>
                                    <GiSadCrab size={200} />
                                    <span>Crab! No results found!</span>
                                </p>
                            </div>
                        )}
                        </form>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default DocsSearch;
