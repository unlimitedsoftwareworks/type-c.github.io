// src/components/Footer.tsx
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="footer items-center p-4 bg-base-200 primary-content w-full z-50">
            <aside>
                <p>
                    © 2025 - Soulaymen Chouri (praisethemoon). Type-C&apos;s
                    documentation is licensed under CC-BY-3.0; Contact:{" "}
                    <Link href="mailto:doit@praisethemoon.org">
                        doit@praisethemoon.org
                    </Link>
                </p>
            </aside>
        </footer>
    );
};

export default Footer;
