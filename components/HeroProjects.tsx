"use client";

import { useState, useEffect } from "react";

interface Project {
    id: string;
    title: string;
    description: string;
    link?: string;
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace this fetch URL with your CMS endpoint (e.g., Supabase, Sanity, Strapi)
        const fetchProjects = async () => {
            try {
                const res = await fetch("/api/projects"); // Temporary placeholder
                const data: Project[] = await res.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <section className="py-20 text-white">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-10 text-center">Projects</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-gray-800 p-6 rounded-xl animate-pulse">
                                <div className="h-6 bg-gray-600 rounded w-1/3 mb-4"></div>
                                <div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-600 rounded w-2/3"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 text-white">
            <div className="px-4">
                <h2 className="text-4xl font-bold mb-10 text-center">Favorite Projects.</h2>
                {projects.length === 0 ? (
                    <p className="text-gray-400">No projects found.</p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-[1.02] transition-transform"
                            >
                                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-400 mb-4">{project.description}</p>
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        View Project →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
