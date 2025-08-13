"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

function Navbar() {
    const [currentPath, setCurrentPath] = useState<string | null>(null);

    useEffect(() => {
        const handleLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };

        // Initialize path after mount
        handleLocationChange();

        window.addEventListener("popstate", handleLocationChange);

        const originalPushState = window.history.pushState;
        const originalReplaceState = window.history.replaceState;

        window.history.pushState = function (...args) {
            originalPushState.apply(window.history, args);
            handleLocationChange();
        };

        window.history.replaceState = function (...args) {
            originalReplaceState.apply(window.history, args);
            handleLocationChange();
        };

        return () => {
            window.removeEventListener("popstate", handleLocationChange);
            window.history.pushState = originalPushState;
            window.history.replaceState = originalReplaceState;
        };
    }, []);

    const linkStyle =
        "relative text-white py-2 text-lg font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-purple-500 after:transition-all after:duration-500 after:ease-out";

    const getActiveLinkStyle = (path: string) => {
        const isActive = currentPath === path;
        return `${linkStyle} ${
            isActive
                ? "after:w-full after:shadow-lg after:shadow-purple-500/50"
                : "after:w-0 hover:after:w-full after:origin-left hover:after:shadow-lg hover:after:shadow-purple-500/50"
        }`;
    };

    const externalLinkStyle = `${linkStyle} after:w-0 hover:after:w-full after:origin-left hover:after:shadow-lg hover:after:shadow-purple-500/50`;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080c14]/90 backdrop-blur-md border-b border-gray-800 uppercase">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-[80px]">
                    <div className="flex space-x-8">
                        <Link href="/" className={getActiveLinkStyle("/")}>
                            Home
                        </Link>
                        <Link
                            href="/portfolio"
                            className={getActiveLinkStyle("/portfolio")}
                        >
                            Portfolio
                        </Link>
                        <Link
                            href="/timeline"
                            className={getActiveLinkStyle("/timeline")}
                        >
                            Timeline
                        </Link>
                    </div>

                    <div className="flex space-x-6">
                        <a
                            href="https://github.com"
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
                            Links
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
