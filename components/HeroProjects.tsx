"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { client, urlFor } from "@/sanity/lib/client";
import { Project } from "@/types/sanity";
import Link from "next/link";
import { Folder, ArrowRight } from "lucide-react";

const featuredProjectsQuery = `*[_type == "project" && featured == true]{
    _id,
    title,
    description,
    techStack[]->{_id, name, color},
    image,
    link,
    featured
}`;

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

    if (loading) {
        return (
            <section className="py-20 text-white px-[150px]">
                <div className="w-full">
                    <h2 className="text-4xl font-bold mb-10 text-center">Projects</h2>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="rounded-xl animate-pulse overflow-hidden border border-gray-700"
                                style={{ backgroundColor: "#080c14" }}
                            >
                                <div className="h-48 bg-gray-600"></div>
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
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                            {projects.map((project) => (
                                <div
                                    key={project._id}
                                    className="rounded-xl border border-gray-700 transition-all duration-300 relative overflow-hidden group"
                                    style={{ backgroundColor: "#080c14" }}
                                >
                                    {/* Project Image */}
                                    {project.image && (
                                        <div className="relative h-56 w-full overflow-hidden">
                                            <Image
                                                src={urlFor(project.image).width(600).height(300).url()}
                                                alt={project.image.alt || project.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                    )}

                                    {/* Content area */}
                                    <div className="relative">
                                        {/* Hover overlay only for content */}
                                        <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                        <div className="p-6 relative z-10">
                                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                                <Folder
                                                    className="size-6"
                                                    stroke="#A3A3A3"
                                                    fill="#1E1E1E"
                                                    strokeWidth={2}
                                                />
                                                {project.title}
                                            </h3>
                                            <p className="text-[#A3A3A3] mb-2 text-md">{project.description}</p>

                                            {project.techStack && project.techStack.length > 0 && (
                                                <div className="mb-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.techStack.map((tech) => (
                                                            <span
                                                                key={tech._id}
                                                                className="px-3 py-1 text-sm rounded-md bg-white/10 text-white/75 shadow-md flex items-center gap-2"
                                                            >
                                                                <div
                                                                    className="w-2 h-2 rounded-full flex-shrink-0"
                                                                    style={{ backgroundColor: tech.color || "#8B5CF6" }}
                                                                ></div>
                                                                {tech.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-medium transition-all duration-300 hover:translate-x-1"
                                                >
                                                    View Project →
                                                </a>
                                            )}
                                        </div>
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
                    href="/projects"
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
