"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { client, urlFor } from "@/sanity/lib/client";
import { Project } from "@/types/sanity";
import Link from "next/link";
import { Folder, ArrowRight, Calendar } from "lucide-react";

const featuredProjectsQuery = `*[_type == "project" && featured == true]{
    _id,
    title,
    description,
    techStack[]->{_id, name, color},
    image,
    link,
    featured,
    createdDate
} | order(createdDate desc)`;

// Helper function to format date
const formatDate = (dateString: string) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
    });
};

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data: Project[] = await client.fetch(featuredProjectsQuery);
                setProjects(data.slice(0, 6));
            } catch (error) {
                console.error("Error fetching projects:", error);
                setError("Failed to fetch projects");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectClick = (link?: string) => {
        if (link) {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    if (loading) {
        return (
            <section className="py-20 text-white px-[150px]">
                <div className="w-full">
                    <h2 className="text-4xl font-bold mb-10 text-center">Projects</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="rounded-xl animate-pulse overflow-hidden border border-gray-700 bg-[#0f141f]"
                            >
                                <div className="p-6">
                                    <div className="h-6 bg-gray-600 rounded w-1/3 mb-4"></div>
                                    <div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-gray-600 rounded w-2/3 mb-4"></div>
                                    <div className="flex gap-2 mb-2">
                                        <div className="h-6 bg-gray-600 rounded w-16"></div>
                                        <div className="h-6 bg-gray-600 rounded w-20"></div>
                                        <div className="h-6 bg-gray-600 rounded w-12"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 text-white px-[150px]">
                <div className="w-full">
                    <h2 className="text-4xl font-bold mb-10 text-center">Projects</h2>
                    <p className="text-red-400 text-center">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 text-white px-[150px]">
            <div className="w-full">
                <h2 className="text-5xl font-bold mb-10 text-center">Featured Projects.</h2>
                {projects.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-400 mb-4">No featured projects found.</p>
                        <p className="text-sm text-gray-500">
                            Add some projects in your{" "}
                            <Link href="/studio" className="text-blue-400 hover:underline">
                                Sanity Studio
                            </Link>
                        </p>
                    </div>
                ) : (
                    <div className="relative">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <div
                                    key={project._id}
                                    onClick={() => handleProjectClick(project.link)}
                                    className={`rounded-xl border border-gray-700 overflow-hidden group bg-[#0f141f] transition-all duration-300 hover:shadow-lg relative ${
                                        project.link ? 'cursor-pointer' : ''
                                    }`}
                                >
                                    {/* Content */}
                                    <div className="p-6 flex flex-col gap-4 transition-colors duration-300 group-hover:bg-white/5">
                                        <h3 className="text-lg font-bold flex items-center gap-2">
                                            <Folder className="w-5 h-5" stroke="#A3A3A3" />
                                            {project.title ?? "Untitled Project"}
                                        </h3>

                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <Calendar className="w-4 h-4" />
                                            {formatDate(project.createdDate)}
                                        </div>

                                        <p className="text-[#A3A3A3] text-sm">
                                            {project.description ?? "No description available."}
                                        </p>

                                        {project.techStack && project.techStack.length > 0 && (
                                            <div className="flex flex-wrap gap-2 font-semibold">
                                                {project.techStack.map((tech) => (
                                                    <span
                                                        key={tech._id}
                                                        className="px-3 py-1 text-xs rounded-md bg-white/10 text-white/75 flex items-center gap-2"
                                                    >
                                                        <span
                                                            className="w-2 h-2 rounded-full"
                                                            style={{ backgroundColor: tech.color || "#E5E7EB" }}
                                                        ></span>
                                                        {tech.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Fade effect for last row */}
                        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-[#080c14] via-[#080c14]/80 to-transparent"></div>
                    </div>
                )}
            </div>

            {/* See More Button */}
            <div className="flex justify-center mt-10 items-center">
                <Link
                    href="/portfolio"
                    className="group inline-flex items-center gap-2 text-lg font-semibold text-white transition-colors duration-300"
                >
                    See more projects
                    <ArrowRight
                        className="transition-transform duration-300 group-hover:translate-x-1 mt-0.5"
                        size={18}
                    />
                </Link>
            </div>
        </section>
    );
}