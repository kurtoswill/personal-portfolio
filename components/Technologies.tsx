"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { Technology } from "@/types/sanity";
import {
  SiReact,
  SiNextdotjs,
  SiSupabase,
  SiTailwindcss,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiVercel,
  SiSanity,
  SiNpm,
  SiGithub,
  SiNotion,
  SiOpenai,
  SiClaude,
  SiCanva,
  SiDavinciresolve,
  SiAdobephotoshop,
  SiAdobelightroom,
} from "react-icons/si";
import {
  FcGoogle,
} from "react-icons/fc";
import {
  FaMeta
} from "react-icons/fa6";

import { IconType } from "react-icons";

const technologiesQuery = `*[_type == "technology"] | order(name asc) {
  _id,
  name,
  category,
  color
}`;

const iconMap: Record<string, { icon: IconType; overrideColor?: string }> = {
  React: { icon: SiReact },
  "Next.js": { icon: SiNextdotjs, overrideColor: "#ffffff" },
  Supabase: { icon: SiSupabase },
  TailwindCSS: { icon: SiTailwindcss, overrideColor: "#06B6D4" },
  "Node.js": { icon: SiNodedotjs },
  TypeScript: { icon: SiTypescript },
  JavaScript: { icon: SiJavascript },
  Vercel: { icon: SiVercel },
  NPM: { icon: SiNpm },
  Github: { icon: SiGithub },
  Sanity: { icon: SiSanity, overrideColor: "#ffffff" },
  Notion: { icon: SiNotion },
  Google: { icon: FcGoogle },
  Meta: { icon: FaMeta },
  ChatGPT: { icon: SiOpenai },
  Claude: { icon: SiClaude },
  Canva: { icon: SiCanva },
  DavinciResolve: { icon: SiDavinciresolve },
  Photoshop: { icon: SiAdobephotoshop },
  Lightroom: { icon: SiAdobelightroom },
};

export default function TechnologyList() {
  const [techs, setTechs] = useState<Technology[]>([]);

  useEffect(() => {
    client.fetch<Technology[]>(technologiesQuery).then(setTechs);
  }, []);

  return (
    <section id="technologies" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-0 text-white">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 text-center">
        Technologies I Use.
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {techs.map((tech) => {
          const iconData = iconMap[tech.name];
          const Icon = iconData?.icon;
          return (
            <div
              key={tech._id}
              className="flex justify-between items-center rounded-lg px-4 py-3 min-h-[50px] shadow-sm border border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-300"
            >
              {Icon ? (
                <Icon
                  size={28}
                  color={iconData.overrideColor || tech.color || "#E5E7EB"}
                  className="transition-colors duration-300"
                />
              ) : (
                <div
                  className="size-6 rounded-full flex-shrink-0"
                  style={{ backgroundColor: tech.color || "#E5E7EB" }}
                />
              )}
              <span className="text-gray-200 font-semibold transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
