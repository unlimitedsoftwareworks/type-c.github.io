// src/components/Footer.tsx
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="footer items-center p-4 bg-base-100 text-neutral-content w-full z-50">
            <aside>
                <p>
                    © 2024 - Soulaymen Chouri (praisethemoon). Type-C&apos;s
                    documentation is licensed under CC-BY-3.0; Contact:{" "}
                    <Link href="mailto:doit@praisethemoon.org">
                        doit@praisethemoon.org
                    </Link>
                </p>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <Link
                        className="navbar-end"
                        href="https://github.com/unlimitedsoftwareworks/type-c"
                    >
                        <FaGithub size={24} />
                    </Link>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;
