"use client";
import { GridBackground } from "@/components/Grid";
import { client, projectsQuery, competitionsQuery, certificationsQuery, experiencesQuery } from "@/sanity/lib/client";
import { Project, Competition, Certification, Experience } from "@/types/sanity";
import { Folder, Trophy, Award, Calendar, User, Building, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type TabType = 'projects' | 'competitions' | 'certifications' | 'experience';

export default function Portfolio() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>('experience');

    const changeTab = (id: TabType) => {
        setActiveTab(id);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsData, competitionsData, certificationsData, experiencesData] = await Promise.all([
                    client.fetch(projectsQuery),
                    client.fetch(competitionsQuery),
                    client.fetch(certificationsQuery),
                    client.fetch(experiencesQuery),
                ]);

                setProjects(projectsData);
                setCompetitions(competitionsData);
                setCertifications(certificationsData);
                setExperiences(experiencesData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const tabs = [
        { id: 'experience' as TabType, label: 'Experience', icon: Briefcase },
        { id: 'projects' as TabType, label: 'Projects', icon: Folder },
        { id: 'competitions' as TabType, label: 'Competitions', icon: Trophy },
        { id: 'certifications' as TabType, label: 'Certifications', icon: Award },
    ];


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    const formatDateShort = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        });
    };

    const getEmploymentTypeColor = (type: string) => {
        const typeColorMap: { [key: string]: string } = {
            'full-time': 'bg-green-500/20 text-green-300',
            'part-time': 'bg-blue-500/20 text-blue-300',
            'contract': 'bg-orange-500/20 text-orange-300',
            'freelance': 'bg-purple-500/20 text-purple-300',
            'internship': 'bg-yellow-500/20 text-yellow-300',
        };
        return typeColorMap[type] || 'bg-gray-500/20 text-gray-300';
    };

    const getDuration = (startDateStr?: string, endDateStr?: string, current?: boolean) => {
        if (!startDateStr) return '';
        const start = new Date(startDateStr);
        const end = current || !endDateStr ? new Date() : new Date(endDateStr);
        let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        if (months < 0) months = 0;
        const years = Math.floor(months / 12);
        const remMonths = months % 12;
        const yearPart = years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : '';
        const monthPart = remMonths > 0 ? `${remMonths} mo${remMonths > 1 ? 's' : ''}` : '';
        return [yearPart, monthPart].filter(Boolean).join(' ') || '< 1 mo';
    };

    const handleProjectClick = (link?: string) => {
        if (link) {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    const handleCompetitionClick = (link?: string) => {
        if (link) {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    const handleCertificationClick = (link?: string) => {
        if (link) {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    const handleExperienceClick = (link?: string) => {
        if (link) {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    const getPositionColor = (position: string) => {
        const pos = position.toLowerCase();
        if (pos.includes('1st') || pos.includes('winner') || pos.includes('champion')) {
            return {
                badge: 'bg-yellow-500/20 text-yellow-300',
                trophy: '#FFD700'
            };
        } else if (pos.includes('2nd') || pos.includes('runner')) {
            return {
                badge: 'bg-gray-400/20 text-gray-300',
                trophy: '#C0C0C0'
            };
        } else if (pos.includes('3rd')) {
            return {
                badge: 'bg-orange-500/20 text-orange-300',
                trophy: '#CD7F32'
            };
        } else {
            return {
                badge: 'bg-blue-500/20 text-blue-300',
                trophy: '#60A5FA'
            };
        }
    };

    const renderProjects = () => (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
                <div
                    key={project._id}
                    onClick={() => handleProjectClick(project.link)}
                    className={`rounded-xl border border-gray-700 overflow-hidden group bg-[#0f141f] transition-all duration-300 hover:shadow-lg relative ${
                        project.link ? 'cursor-pointer' : ''
                    }`}
                >
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
    );

    const renderExperiences = () => (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience) => (
                <div
                    key={experience._id}
                    onClick={() => handleExperienceClick(experience.companyWebsite)}
                    className={`rounded-xl border border-gray-700 overflow-hidden group bg-[#0f141f] transition-all duration-300 hover:shadow-lg ${
                        experience.companyWebsite ? 'cursor-pointer' : ''
                    }`}
                >
                    <div className="p-6 flex flex-col gap-4 transition-colors duration-300 group-hover:bg-white/5">
                        <div className="flex items-start justify-between">
                            <h3 className="text-lg font-bold flex items-start gap-2 leading-tight">
                                <Briefcase className="w-5 h-5 flex-shrink-0 self-start mt-0.5" stroke="#60A5FA" />
                                <span className="whitespace-normal break-words leading-tight">{experience.jobTitle}</span>
                            </h3>
                            {experience.current && (
                                <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300 font-semibold">
                                    Current
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-300">
                                <Building className="w-4 h-4" />
                                <span className="font-semibold">{experience.company}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <MapPin className="w-4 h-4" />
                                {experience.location}
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 flex-wrap">
                                <Calendar className="w-4 h-4" />
                                {formatDateShort(experience.startDate)} - {experience.current ? 'Present' : (experience.endDate ? formatDateShort(experience.endDate) : 'Present')}
                                <span className="px-2 py-0.5 text-xs rounded-md bg-white/10 text-white/75 font-semibold">
                                    {getDuration(experience.startDate, experience.endDate, experience.current)}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 text-xs rounded-md font-semibold capitalize ${getEmploymentTypeColor(experience.employmentType)}`}>
                                {experience.employmentType && experience.employmentType.replace('-', ' ')}
                            </span>
                        </div>

                        <p className="text-[#A3A3A3] text-sm">
                            {experience.description}
                        </p>

                        {experience.keyAchievements && experience.keyAchievements.length > 0 && (
                            <div className="space-y-2">
                                <span className="text-sm font-medium text-gray-300">Key Achievements:</span>
                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
                                    {experience.keyAchievements.slice(0, 3).map((achievement, index) => (
                                        <li key={index}>{achievement}</li>
                                    ))}
                                    {experience.keyAchievements.length > 3 && (
                                        <li className="text-gray-500">+{experience.keyAchievements.length - 3} more...</li>
                                    )}
                                </ul>
                            </div>
                        )}

                        {experience.techStack && experience.techStack.length > 0 && (
                            <div className="flex flex-wrap gap-2 font-semibold">
                                {experience.techStack.map((tech) => (
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

            {experiences.length === 0 && !loading && (
                <div className="text-center text-gray-400 col-span-full">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No professional experience found.</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Add some in{" "}
                        <Link href="/studio" className="text-blue-400 hover:underline">
                            Sanity Studio
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );

    const renderCompetitions = () => (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {competitions.map((competition) => {
                const positionColors = getPositionColor(competition.position);
                return (
                    <div
                        key={competition._id}
                        onClick={() => handleCompetitionClick(competition.link)}
                        className={`rounded-xl border border-gray-700 overflow-hidden group bg-[#0f141f] transition-all duration-300 hover:shadow-lg ${
                            competition.link ? 'cursor-pointer' : ''
                        }`}
                    >
                        <div className="p-6 flex flex-col gap-4 transition-colors duration-300 group-hover:bg-white/5">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Trophy
                                    className="w-5 h-5"
                                    style={{ color: positionColors.trophy }}
                                />
                                {competition.competitionName}
                            </h3>

                            <div className="flex flex-col gap-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(competition.competitionDate)}
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <User className="w-4 h-4" />
                                    {competition.myRole}
                                </div>
                            </div>

                            <div className="space-y-2 font-semibold">
                                <div>
                                    <span className="text-sm font-medium text-gray-300">Project: </span>
                                    <span className="text-sm text-white">{competition.projectName}</span>
                                </div>
                                {competition.teamName && (
                                    <div>
                                        <span className="text-sm font-medium text-gray-300">Team: </span>
                                        <span className="text-sm text-white">{competition.teamName}</span>
                                    </div>
                                )}
                            </div>

                            <p className="text-[#A3A3A3] text-sm">
                                {competition.description}
                            </p>

                            <div className="flex flex-wrap gap-2 items-center">
                                <span className={`px-3 py-1 text-xs rounded-md font-semibold ${positionColors.badge}`}>
                                    {competition.position}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}

            {competitions.length === 0 && !loading && (
                <div className="text-center text-gray-400 col-span-full">
                    <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No competitions found.</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Add some in{" "}
                        <Link href="/studio" className="text-blue-400 hover:underline">
                            Sanity Studio
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );

    const renderCertifications = () => (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((certification) => (
                <div
                    key={certification._id}
                    onClick={() => handleCertificationClick(certification.link)}
                    className={`rounded-xl border border-gray-700 overflow-hidden group bg-[#0f141f] transition-all duration-300 hover:shadow-lg ${
                        certification.link ? 'cursor-pointer' : ''
                    }`}
                >
                    <div className="p-6 flex flex-col gap-4 transition-colors duration-300 group-hover:bg-white/5">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Award className="w-5 h-5" stroke="#10B981" />
                            {certification.certificationName}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            Acquired {formatDate(certification.dateAcquired)}
                        </div>

                        <p className="text-[#A3A3A3] text-sm">
                            {certification.description}
                        </p>
                    </div>
                </div>
            ))}

            {certifications.length === 0 && !loading && (
                <div className="text-center text-gray-400 col-span-full">
                    <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No certifications found.</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Add some in{" "}
                        <Link href="/studio" className="text-blue-400 hover:underline">
                            Sanity Studio
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );

    const renderContent = (tabArg: TabType = activeTab) => {
        if (loading) {
            return (
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
            );
        }

        if (error) {
            return <p className="text-red-400 text-center">{error}</p>;
        }

        if (tabArg === 'projects') {
            if (projects.length === 0) {
                return (
                    <div className="text-center">
                        <p className="text-gray-400 mb-4">No projects found.</p>
                        <p className="text-sm text-gray-500">
                            Add some in{" "}
                            <Link href="/studio" className="text-blue-400 hover:underline">
                                Sanity Studio
                            </Link>
                        </p>
                    </div>
                );
            }
            return renderProjects();
        }

        if (tabArg === 'experience') {
            return renderExperiences();
        }

        if (tabArg === 'competitions') {
            return renderCompetitions();
        }

        if (tabArg === 'certifications') {
            return renderCertifications();
        }

        return null;
    };

    const getTabDescription = () => {
        switch (activeTab) {
            case 'projects':
                return "Here are all the projects I've worked on.";
            case 'experience':
                return "My professional experience and work history.";
            case 'competitions':
                return "Competitions and hackathons I've participated in.";
            case 'certifications':
                return "Professional certifications and achievements.";
            default:
                return "Explore my work and achievements.";
        }
    };

    return (
        <section className="py-20 px-6 sm:px-10 lg:px-[150px] bg-[#080c14] text-white">
            <GridBackground
                gridSize={100}
                gridColor="#e4e4e7"
                darkGridColor="#262626"
                showFade={true}
                fadeIntensity={10}
            >
                <h2 className="text-4xl md:text-5xl font-bold my-20">Portfolio</h2>
            </GridBackground>

            {/* Tab Navigation - Responsive */}
            <div className="flex justify-center mb-8">
                {/* Mobile: Dropdown Style */}
                <div className="sm:hidden w-full max-w-xs">
                    <div className="relative">
                        <select
                            value={activeTab}
                            onChange={(e) => changeTab(e.target.value as TabType)}
                            className="w-full bg-[#0f141f] border border-gray-700 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {tabs.map((tab) => (
                                <option key={tab.id} value={tab.id} className="bg-[#0f141f] text-white">
                                    {tab.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Tablet and up: Horizontal tabs */}
                <div className="hidden sm:inline-flex bg-[#0f141f] rounded-lg border border-gray-700 p-1 flex-wrap justify-center gap-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => changeTab(tab.id)}
                                className={`
                                    flex items-center gap-2 px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap
                                    ${activeTab === tab.id
                                    ? 'bg-white/10 text-white shadow-sm'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }
                                `}
                            >
                                <Icon className="w-3 h-3 md:w-4 md:h-4" />
                                <span className="hidden md:inline">{tab.label}</span>
                                <span className="md:hidden">{tab.label.split(' ')[0]}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <p className="text-center font-semibold text-xl py-8">
                {getTabDescription()}
            </p>

            {renderContent(activeTab)}
        </section>
    );
}