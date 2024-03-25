// src/pages/CodeOfConduct.tsx
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { LiaHeart, LiaPrayingHandsSolid } from 'react-icons/lia';
import { LuHeartHandshake, LuPackageSearch } from 'react-icons/lu';

const CodeOfConduct: React.FC = () => {
    return (
        <div>
            <div className="striped1 hero bg-base-100 py-10">
                <div>
                    <div className="hero-content text-center">
                        <div className="gap-x-40">
                            <p className="text-5xl fontLogo flex">Type-Hub <LuPackageSearch size={48} /></p>
                            <p className='py-5'>
                                Type-C Package Registry
                            </p>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="text" className="grow" placeholder="Search for packages" />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 h-screen">
                <aside className="sticky left-0 top-0 h-screen overflow-y-auto bg-base-200 w-200 p-4  ">
                    <h1 className="py-5">Trending Libraries</h1>
                    <div className="card w-96 bg-base-100 border border-1 border-base-300  py-5">
                        <div className="card-body">
                            <h2 className="card-title">
                                RayTCLib
                                <div className="badge badge-secondary">NEW</div>
                            </h2>
                            <p>RayLib binding for the Type-C Programming Language</p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">games</div>
                                <div className="badge badge-outline">graphics</div>
                            </div>
                        </div>
                    </div>
                    <div className="card w-96 bg-base-100 border border-1 border-base-300 py-5">
                        <div className="card-body">
                            <h2 className="card-title">
                                NDArray
                                <div className="badge badge-secondary">NEW</div>
                            </h2>
                            <p>N-Dimentional Array Library ; numpy equivalent for Type-C</p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">computation</div>
                                <div className="badge badge-outline">numerical</div>
                                <div className="badge badge-outline">arrays</div>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 overflow-y-auto bg-base-200 prose">
                    <div role="alert" className="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>This page is only mock-up, the Type-Hub project is still under construction.</span>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CodeOfConduct;
