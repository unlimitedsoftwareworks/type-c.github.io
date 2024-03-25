// src/components/Footer.tsx
import Link from 'next/link';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="footer items-center p-4 bg-neutral text-neutral-content w-full z-50">
            <aside className="items-center grid-flow-col">
                <p>© 2024 - Soulaymen Chouri (praisethemoon). Type-C's documentation is licensed under CC-BY-3.0</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <Link className="navbar-end" href="https://github.com/unlimitedsoftwareworks/type-c"><FaGithub size={24} /></Link>
            </nav>
        </footer>
    );
};

export default Footer;
