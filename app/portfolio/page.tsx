"use client";
import { GridBackground } from "@/components/Grid";
import { client, urlFor } from "@/sanity/lib/client";
import { Project } from "@/types/sanity";
import { ArrowRight, Folder } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const allProjectsQuery = `*[_type == "project"]{
    _id,
    title,
    description,
    techStack[]->{_id, name, color},
    image,
    link,
    featured
} | order(_createdAt desc)`;

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data: Project[] = await client.fetch(allProjectsQuery);
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setError("Failed to fetch projects");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section className="py-20 px-6 sm:px-10 lg:px-[150px] bg-[#080c14] text-white">
            <GridBackground
                gridSize={100}
                gridColor="#e4e4e7"
                darkGridColor="#262626"
                showFade={true}
                fadeIntensity={10}
            >
                <h2 className="text-4xl md:text-5xl font-bold my-20">Projects</h2>
            </GridBackground>
            <p className="text-center font-semibold text-xl py-8">
                Here are all the projects I’ve worked on.
            </p>

            {/* Loading State */}
            {loading && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="rounded-xl animate-pulse overflow-hidden border border-gray-700 bg-[#0f141f]"
                        >
                            <div className="h-48 bg-gray-700"></div>
                            <div className="p-6">
                                <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
                                <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-700 rounded w-2/3 mb-4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Error State */}
            {error && (
                <p className="text-red-400 text-center">{error}</p>
            )}

            {/* No Projects */}
            {!loading && !error && projects.length === 0 && (
                <div className="text-center">
                    <p className="text-gray-400 mb-4">No projects found.</p>
                    <p className="text-sm text-gray-500">
                        Add some in{" "}
                        <Link href="/studio" className="text-blue-400 hover:underline">
                            Sanity Studio
                        </Link>
                    </p>
                </div>
            )}

            {/* Projects */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className="rounded-xl border border-gray-700 overflow-hidden group bg-[#0f141f] transition-all duration-300 hover:shadow-lg relative"
                    >
                        {/* Image */}
                        {project.image && (
                            <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                                <Image
                                    src={urlFor(project.image).width(600).height(300).url()}
                                    alt={project.image?.alt ?? project.title ?? "Project image"}
                                    fill
                                    className="object-cover"
                                />
                                {/* White fade overlay */}
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-6 flex flex-col gap-4 transition-colors duration-300 group-hover:bg-white/5">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Folder className="w-5 h-5" stroke="#A3A3A3" />
                                {project.title ?? "Untitled Project"}
                            </h3>
                            <p className="text-[#A3A3A3] text-sm">
                                {project.description ?? "No description available."}
                            </p>

                            {project.techStack && project.techStack.length > 0 && (
                                <div className="flex flex-wrap gap-2">
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


                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-white group/link"
                                >
                                    View Project
                                    <ArrowRight
                                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                                        size={18}
                                    />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
