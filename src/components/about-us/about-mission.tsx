"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Starburst } from "../star-burst/star-burst";
import { CORE_PILLARS } from "./pillars";

interface AboutMissionProps {
  onPlanVisit: () => void;
}

export function AboutMission({ onPlanVisit }: AboutMissionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from("[data-animate]", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#141210] text-[#EDE8E3] py-24 sm:py-32 lg:py-40 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div
          data-animate
          className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs uppercase tracking-[0.18em] text-[#EDE8E3]/60"
        >
          <div className="flex items-center gap-2.5 text-[#E8C48E]">
            <Starburst className="w-3.5 h-3.5" />
            <span>Who We Are</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#EDE8E3]/50">
            <span>KICC, Nairobi</span>
            <span aria-hidden="true">/</span>
            <span>Est. 1994</span>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col justify-between">
            <div data-animate>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-light tracking-tight leading-[1.14] text-white">
                A sanctuary built on grace, an altar wide open for everyone.
              </h2>

              <p className="mt-6 text-base text-[#EDE8E3]/70 font-light leading-relaxed">
                Whether you are wrestling with doubts, searching for community,
                or seeking to deepen your discipleship, you belong at this
                table.
              </p>
            </div>

            <div data-animate className="mt-10 pt-8 border-t border-white/10">
              <p className="text-xs uppercase tracking-[0.16em] text-[#E8C48E] mb-2">
                First Sunday With Us
              </p>
              <p className="text-sm text-[#EDE8E3]/75 font-light leading-relaxed">
                Curious what your first visit looks like? Expect warm greeters
                at the door, free drip coffee, and reserved guest seating.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={onPlanVisit}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E8C48E] text-[#141210] text-sm font-medium tracking-tight hover:bg-[#f1d3a5] active:scale-[0.98] transition-colors cursor-pointer"
                >
                  <span>Plan Your Sunday</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <figure data-animate className="m-0">
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-[#1D1A17]">
                <Image
                  src="/images/worship_service_gathering_1791859611494.jpg"
                  alt="Community gathered under warm sanctuary lighting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
            </figure>

            <div className="mt-5">
              {CORE_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  data-animate
                  className="py-7 sm:py-8 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                >
                  <div className="sm:col-span-1 font-mono text-xs text-[#E8C48E] tabular-nums">
                    {pillar.number}
                  </div>
                  <h3 className="sm:col-span-5 text-lg font-normal tracking-tight text-white">
                    {pillar.title}
                  </h3>
                  <p className="sm:col-span-6 text-sm text-[#EDE8E3]/70 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
