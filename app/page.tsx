"use client";

import Contacts from "@/components/Contacts";
import { GridBackground } from "@/components/Grid";
import HeroExperience from "@/components/HeroExperience";
import TechnologyList from "@/components/Technologies";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="text-white">
      {/* Hero Section */}
      <section>
        <GridBackground
          gridSize={100}
          gridColor="#e4e4e7"
          darkGridColor="#262626"
          showFade={true}
          fadeIntensity={10}
          className="min-h-screen"
        >
          <div className="text-center pb-10 md:pb-20">
            <h1 className="text-[72px] md:text-[120px] font-bold tracking-tight leading-none mb-5">
                Kurt Oswill McCarver
            </h1>

            <p className="text-xl md:text-2xl max-w-5xl mx-auto opacity-75">
                A business development professional with strong blockchain knowledge who co-founded a production company delivering photography, videography, editing, design, and motion graphics.
            </p>

            <div className="mt-10 flex gap-5 text-center items-center justify-center">
              <a
                href="https://calendly.com/kurtoswillmc/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border bg-white border-white text-[#080c14] font-semibold rounded-md py-3 px-6 hover:bg-purple-500/90 hover:border-purple-600 hover:text-white transition-colors duration-300"
              >
                Book a Discovery Call
              </a>

                <a
                    href="https://calendly.com/kurtoswillmc/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white text-white font-semibold rounded-md py-3 px-6 hover:bg-white hover:border-white hover:text-[#080c14] transition-colors duration-300 flex gap-2"
                >
                    <p>View my Production Company </p>
                    <ArrowRight
                        className="transition-transform duration-300 group-hover:translate-x-1 mt-0.5"
                        size={20}
                    />
                </a>

            </div>

          </div>
        </GridBackground>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-24 bg-[#080c14] py-12 md:py-20 text-center">
        <div className="max-w-4xl mx-auto font-medium">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me.</h2>
          <p className="text-lg md:text-xl text-white/75 leading-relaxed mt-4">
            <span className="text-white">Business Developer</span> at{" "}
            <span className="text-white">Blockchain Campus Conference</span> and{" "}
            <span className="text-white">Volunteer Head</span> driving blockchain innovation and strategic partnerships.
          </p>
          <p className="text-lg md:text-xl text-white/75 leading-relaxed mt-4">
            Former <span className="text-white">Front-End Developer Intern</span> at{" "}
            <span className="text-white">Bitskwela</span> with hands-on blockchain industry experience.{" "}
            <span className="text-white">Base contributor</span> exploring the decentralized ecosystem.
          </p>
          <p className="text-lg md:text-xl text-white/75 leading-relaxed mt-4">
            I bridge <span className="text-white">technology and business</span>, building communities while exploring entrepreneurship in the decentralized future.
          </p>
        </div>
      </section>

      {/* Experience */}
      <HeroExperience />

      {/* Technologies */}
      <TechnologyList />

      {/* Contacts */}
      <Contacts />
    </div>
  );
}
