import Link from 'next/link';
import React from 'react';
import { FaApple, FaGithub } from 'react-icons/fa';
const Download: React.FC = () => {
    return (
        <div>
            <div className="striped1 hero bg-base-100 py-20">
                <div>
                    <div className="hero-content text-center">
                        <div className="gap-x-40 text-center flex flex-col">
                            <p>
                                Sadly, there are no binary builds for Type-C Just yet, you will have to grab the project from the following repos:
                            </p>
                            <div className='flex flex-1 flex-row gap-2 pt-20'>
                                <div role="alert" className="alert shadow-lg flex justify-between">
                                    <div>
                                        <h3 className="font-bold flex flex-1 flex-row">Type-C <FaGithub size={26} className='mx-3' /></h3>
                                        <div className="text-xs">Type-C Compiler.</div>
                                    </div>
                                    <Link href="https://github.com/unlimitedsoftwareworks/type-c" target="_blank" className="btn btn-sm">Link</Link>
                                </div>
                                <div role="alert" className="alert shadow-lg flex justify-between">
                                    <div>
                                        <h3 className="font-bold flex flex-1 flex-row">Type-V <FaGithub size={26} className='mx-3' /></h3>
                                        <div className="text-xs">Type-V Virtual Machine.</div>
                                    </div>
                                    <Link href="https://github.com/unlimitedsoftwareworks/type-v" target="_blank" className="btn btn-sm">Link</Link>
                                </div>
                                <div role="alert" className="alert shadow-lg flex justify-between">
                                    <div>
                                        <h3 className="font-bold flex flex-1 flex-row">Stdlib <FaGithub size={26} className='mx-3' /></h3>
                                        <div className="text-xs">Type-C Standard Library.</div>
                                    </div>
                                    <Link href="https://github.com/unlimitedsoftwareworks/stdlib" target="_blank" className="btn btn-sm">Link</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Download;
