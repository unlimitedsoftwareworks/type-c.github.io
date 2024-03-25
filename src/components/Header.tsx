// src/pages/page.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { CiStickyNote } from 'react-icons/ci';
import { FaBalanceScale, FaBook, FaDiscord, FaDownload, FaGithub, FaHome, FaQuestionCircle, FaRegNewspaper, FaUniversity } from "react-icons/fa";
import { GiMaterialsScience, GiSecretBook, GiSpellBook } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi';
import { IoPeopleCircleOutline } from 'react-icons/io5';
import { LuPackageSearch } from 'react-icons/lu';
import { SiAwesomelists } from 'react-icons/si';
import { TbLicense, TbPackages } from 'react-icons/tb';

const Header: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        // Function to close all <details> elements
        const closeAllDetails = () => {
            document.querySelectorAll('#header-menu details[open]').forEach((detailsElement) => {
                detailsElement.removeAttribute('open');
            });
        };

        // Close all <details> elements upon route changes
        router.events.on('routeChangeComplete', closeAllDetails);

        // Cleanup listener when component unmounts
        return () => {
            router.events.off('routeChangeComplete', closeAllDetails);
        };
    }, [router.events]);

    return (
        <div className="navbar bg-base-100 w-full z-50" id="header-menu">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Playground</a></li>
                        <li>
                            <a>Documentation</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Install</a></li>
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl logoFont" href='/'>Type-C</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal menu-hover px-1">
                    <li><Link href={'/'}><FaHome size={20} /> Home</Link></li>
                    <li><Link href={'/download'}><FaDownload size={20} /> Download</Link></li>
                    <li><Link href={'/blog'}><FaRegNewspaper size={23} /> Blog</Link></li>
                    <li>
                        <details onClick={(e) => {document.querySelector('#menu')?.setAttribute("focused", "false");}}>
                            <summary><FaUniversity size={20} /> Learn</summary>
                            <ul className="p-2">
                                <li><Link href={'/tour'}> <SiAwesomelists size={20}  />Language Tour</Link></li>
                                <li><Link href={'/docs/introduction'}><FaBook size={20}  />Documentation</Link></li>
                                <li><a> <GiSecretBook size={20}  />本を購入する</a></li>
                                <li><Link href="/faq"><FaQuestionCircle size={20}/> FAQ</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary><IoPeopleCircleOutline size={20} /> Community Portals</summary>
                            <ul className="p-2">
                                <li><Link href="/code-of-conduct"><FaBalanceScale size={20}/> Code of Conduct</Link></li>
                                <li><Link href={'/community'}><HiUserGroup size={20}  /> Community Links</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li><Link href="/type-hub"><LuPackageSearch size={20}/> Type-Hub</Link></li>

                    <li>
                        <details>
                            <summary><FaUniversity size={20} /> More</summary>
                            <ul className="p-2">
                                <li><Link href={'/research'}><GiMaterialsScience size={20}/> Publications</Link></li>
                                <li><Link href={'/'}><CiStickyNote size={20} /> Dev Notes</Link></li>
                                <li><a> <TbLicense size={20}  /> Credits</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <Link className="btn btn-ghost" href="https://github.com/unlimitedsoftwareworks/type-c"><FaDiscord size={24} /></Link>
                <Link className="btn btn-ghost" href="https://github.com/unlimitedsoftwareworks/type-c"><FaGithub size={24} /></Link>
            </div>
        </div>
    );
};

export default Header;
