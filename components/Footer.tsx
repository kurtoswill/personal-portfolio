export default function Footer() {
    return (
        <footer className="bg-[#080c14] border-t border-gray-800 text-white py-8 mt-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <p className="font-semibold text-lg">
                    Created Using Next.js and Sanity
                </p>
                <p className="font-semibold text-lg">
                    © {new Date().getFullYear()} Kurt Oswill McCarver. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
