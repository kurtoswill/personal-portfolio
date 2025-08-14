export default function Footer() {
    return (
        <footer className="bg-[#080c14] border-t border-gray-800 text-white py-8 mt-16">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-lg text-right">Created Using Next.js and Sanity</p>
                <p className="font-semibold text-lg text-right">
                    © {new Date().getFullYear()} Kurt Oswill McCarver. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
