import { theme } from "@/states/theme";
import { useHookstate } from "@hookstate/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { CiCircleMore, CiStickyNote } from "react-icons/ci";
import {
    FaGithub,
    FaMoon,
    FaSun,
    FaDiscord,
} from "react-icons/fa";
import { GiMaterialsScience, GiSecretBook, GiSpellBook } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { LuPackageSearch } from "react-icons/lu";
import { SiAwesomelists } from "react-icons/si";
import { TbLicense, TbPackages } from "react-icons/tb";

const Header: React.FC = () => {
    const router = useRouter();
    const themeState = useHookstate(theme)

    useEffect(() => {
        // Function to close all <details> elements
        const closeAllDetails = () => {
            document
                .querySelectorAll("#header-menu details[open]")
                .forEach((detailsElement) => {
                    detailsElement.removeAttribute("open");
                });
        };

        // Close all <details> elements upon route changes
        router.events.on("routeChangeComplete", closeAllDetails);

        // Cleanup listener when component unmounts
        return () => {
            router.events.off("routeChangeComplete", closeAllDetails);
        };
    }, [router.events]);

    const switchTheme = () => {
        themeState.set(themeState.get() === 'typec-dark' ? 'typec-light' : 'typec-dark');
        document.documentElement.setAttribute("data-theme", themeState.get());
    }

    return (
        <div className="navbar bg-base-200 w-full z-50 shadow-md" id="header-menu">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link href={"/"}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href={"/playground"}>
                                Playground
                            </Link>
                        </li>
                        <li>
                            <Link href={"/posts"}>
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href={"/docs/introduction"}>
                                Documentation
                            </Link>
                        </li>
                        {/*<li>
                            <a>
                                Portals
                            </a>
                            <ul className="p-2">
                                <li>
                                    <Link href="/code-of-conduct">
                                        Conduct
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/community"}>
                                        Links
                                    </Link>
                                </li>
                            </ul>
                        </li>*/}
                        {/*<li>
                            <Link href="/type-hub">
                                Type-Hub
                            </Link>
                        </li>*/}
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl logoFont2" href="/">
                    Type-C
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex ">
                <ul className="menu menu-horizontal menu-hover px-1">
                    <li>
                        <Link href={"/playground"}>
                            Playground
                        </Link>
                    </li>
                    <li>
                        <Link href={"/posts"}>
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link href={"/docs/introduction"}>
                            Documentation
                        </Link>
                    </li>
                    {/*<li>
                        <details>
                            <summary>
                                Community Portals
                            </summary>
                            <ul className="p-2">
                                <li>
                                    <Link href="/code-of-conduct">
                                        Code of Conduct
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/community"}>
                                        Community Links
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>*/}
                    {/*<li>
                        <Link href="/type-hub">
                            Type-Hub
                        </Link>
                    </li>*/}
                </ul>
            </div>
            <div className="navbar-end">
                <button
                    className="btn btn-ghost"
                    onClick={() => switchTheme()}
                >
                    {themeState.get() === 'typec-dark' ? <FaMoon size={24} /> : <FaSun size={24} />}
                </button>
                {/*<Link className="btn btn-ghost" href="https://github.com/unlimitedsoftwareworks/type-c"><FaDiscord size={24} /></Link>*/}
                <Link
                    className="btn btn-ghost"
                    href="https://github.com/unlimitedsoftwareworks/type-c"
                >
                    <FaGithub size={24} />
                </Link>
            </div>
            <Link href="https://discord.gg/4ZPQsXSunn" target="_blank" className="btn btn-sm">
                <FaDiscord size={24} />
            </Link>
        </div>
    );
};

export default Header;
