"use client";
import { useEffect, useState } from "react";
import { client, recentExperiencesQuery } from "@/sanity/lib/client";
import { Experience } from "@/types/sanity";
import Link from "next/link";
import { Briefcase, Calendar, ArrowRight, Building, MapPin } from "lucide-react";

// Helper to format short month-year (e.g., Jan 2024)
const formatDateShort = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// Helper to compute duration between two dates (e.g., 1 yr 3 mos)
const getDuration = (startDateStr?: string, endDateStr?: string, current?: boolean) => {
  if (!startDateStr) return "";
  const start = new Date(startDateStr);
  const end = current || !endDateStr ? new Date() : new Date(endDateStr);
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (months < 0) months = 0;
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  const yearPart = years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : "";
  const monthPart = remMonths > 0 ? `${remMonths} mo${remMonths > 1 ? "s" : ""}` : "";
  return [yearPart, monthPart].filter(Boolean).join(" ") || "< 1 mo";
};

// Match Portfolio: employment type badge colors
const getEmploymentTypeColor = (type?: string) => {
  if (!type) return "bg-gray-500/20 text-gray-300";
  const map: { [k: string]: string } = {
    "full-time": "bg-green-500/20 text-green-300",
    "part-time": "bg-blue-500/20 text-blue-300",
    "contract": "bg-orange-500/20 text-orange-300",
    "freelance": "bg-purple-500/20 text-purple-300",
    "internship": "bg-yellow-500/20 text-yellow-300",
  };
  return map[type] || "bg-gray-500/20 text-gray-300";
};

export default function HeroExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data: Experience[] = await client.fetch(recentExperiencesQuery);
        setExperiences(data.slice(0, 6));
      } catch (e) {
        console.error("Error fetching experiences:", e);
        setError("Failed to fetch experiences");
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <section className="py-16 text-white px-6 sm:px-10 lg:px-[150px]">
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Experience</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl animate-pulse overflow-hidden border border-gray-700 bg-[#0f141f]">
                <div className="p-4 sm:p-6">
                  <div className="h-6 bg-gray-600 rounded w-2/5 mb-3"></div>
                  <div className="h-4 bg-gray-600 rounded w-3/5 mb-2"></div>
                  <div className="h-4 bg-gray-600 rounded w-2/5"></div>
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
      <section className="py-16 text-white px-6 sm:px-10 lg:px-[150px]">
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Experience</h2>
          <p className="text-red-400 text-center">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 text-white px-6 sm:px-10 lg:px-[150px]">
      <div className="w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-10 text-center">Experience.</h2>
        {experiences.length === 0 ? (
          <div className="text-center text-gray-400">No experiences found.</div>
        ) : (
          <div className="relative">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences.map((exp) => {
                const dateRange = `${formatDateShort(exp.startDate)} - ${exp.current ? "Present" : exp.endDate ? formatDateShort(exp.endDate) : "Present"}`;
                const duration = getDuration(exp.startDate, exp.endDate, exp.current);
                return (
                  <div key={exp._id} className="rounded-xl border border-gray-700 overflow-hidden group bg-[#0f141f] transition-all duration-300 hover:shadow-lg">
                    <div className="p-6 flex flex-col gap-4 transition-colors duration-300 group-hover:bg-white/5">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-bold flex items-start gap-2 leading-tight">
                          <Briefcase className="w-5 h-5 flex-shrink-0 self-start mt-0.5" stroke="#60A5FA" />
                          <span className="whitespace-normal break-words leading-tight">{exp.jobTitle}</span>
                        </h3>
                        {exp.current && (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300 font-semibold">
                            Current
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Building className="w-4 h-4" />
                          <span className="font-semibold">{exp.company}</span>
                        </div>
                        {exp.location && (
                          <div className="flex items-center gap-2 text-gray-400">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-gray-400 flex-wrap">
                          <Calendar className="w-4 h-4" />
                          {dateRange}
                          <span className="px-2 py-0.5 text-xs rounded-md bg-white/10 text-white/75 font-semibold">
                            {duration}
                          </span>
                        </div>
                      </div>

                      {exp.employmentType && (
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 text-xs rounded-md font-semibold capitalize ${getEmploymentTypeColor(exp.employmentType)}`}>
                            {exp.employmentType.replace('-', ' ')}
                          </span>
                        </div>
                      )}

                      {exp.description && (
                        <p className="text-[#A3A3A3] text-sm">
                          {exp.description}
                        </p>
                      )}

                      {exp.keyAchievements && exp.keyAchievements.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-sm font-medium text-gray-300">Key Achievements:</span>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
                            {exp.keyAchievements.slice(0, 3).map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                            {exp.keyAchievements.length > 3 && (
                              <li className="text-gray-500">+{exp.keyAchievements.length - 3} more...</li>
                            )}
                          </ul>
                        </div>
                      )}

                      {exp.techStack && exp.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 font-semibold">
                          {exp.techStack.map((tech) => (
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
                );
              })}
            </div>

            {/* Fade effect at bottom to match style */}
            <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 md:h-40 pointer-events-none bg-gradient-to-t from-[#080c14] via-[#080c14]/80 to-transparent"></div>
          </div>
        )}
      </div>

      {/* See More Button */}
      <div className="flex justify-center mt-8 sm:mt-10 items-center">
        <Link href="/portfolio" className="group inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-white transition-colors duration-300 hover:text-purple-400">
          See more experience
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1 mt-0.5 w-4 h-4 sm:w-5 sm:h-5" size={18} />
        </Link>
      </div>
    </section>
  );
}
