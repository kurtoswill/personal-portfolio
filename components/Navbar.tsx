"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const linkStyle =
        "relative text-white py-2 text-lg font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-purple-500 after:transition-all after:duration-500 after:ease-out";

    const getActiveLinkStyle = (path: string) => {
        const isActive = pathname === path;
        return `${linkStyle} ${
            isActive
                ? "after:w-full after:shadow-lg after:shadow-purple-500/50"
                : "after:w-0 hover:after:w-full after:origin-left hover:after:shadow-lg hover:after:shadow-purple-500/50"
        }`;
    };

    const externalLinkStyle = `${linkStyle} after:w-0 hover:after:w-full after:origin-left hover:after:shadow-lg hover:after:shadow-purple-500/50`;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080c14]/90 backdrop-blur-md border-b border-gray-800 uppercase">
            <div className="mx-auto px-10 sm:px-10 lg:px-[200px]">
                <div className="flex justify-between items-center h-[80px]">
                    {/* Left: Desktop Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className={getActiveLinkStyle("/")}>
                            KURT OSWILL
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>

                    {/* Right: Desktop Links */}
                    <div className="hidden md:flex space-x-6">
                        <Link
                            href="/portfolio"
                            className={getActiveLinkStyle("/portfolio")}
                        >
                            Portfolio
                        </Link>
                        <a
                            href="https://github.com/kurtoswill"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={externalLinkStyle}
                        >
                            GitHub
                        </a>
                        <Link
                            href="/links"
                            className={getActiveLinkStyle("/links")}
                        >
                            RESUME
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    ref={menuRef}
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="flex flex-col space-y-4 mt-4 pb-4">
                        <Link
                            href="/"
                            className={getActiveLinkStyle("/")}
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/portfolio"
                            className={getActiveLinkStyle("/portfolio")}
                            onClick={() => setIsOpen(false)}
                        >
                            Portfolio
                        </Link>
                        <Link
                            href="/timeline"
                            className={getActiveLinkStyle("/timeline")}
                            onClick={() => setIsOpen(false)}
                        >
                            Timeline
                        </Link>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={externalLinkStyle}
                            onClick={() => setIsOpen(false)}
                        >
                            GitHub
                        </a>
                        <Link
                            href="/links"
                            className={getActiveLinkStyle("/links")}
                            onClick={() => setIsOpen(false)}
                        >
                            RESUME
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;