"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Starburst } from "../star-burst/star-burst";
import { GUEST_GUIDES, GuestGuideKey } from "./guest-guides";
import { getTimeUntilNextSunday } from "@/lib/get-time-until-next-sunday";

interface WorshipExperienceProps {
  onPlanVisit: () => void;
  onOpenLiveModal: () => void;
}

type TimeLeft = ReturnType<typeof getTimeUntilNextSunday>;

export function WorshipExperience({
  onPlanVisit,
  onOpenLiveModal,
}: WorshipExperienceProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [activeTab, setActiveTab] = useState<GuestGuideKey>("coffee");

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(getTimeUntilNextSunday());
    };

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const currentGuide = GUEST_GUIDES[activeTab];

  return (
    <section
      id="gatherings"
      className="bg-[#141210] text-[#EDE8E3] py-24 sm:py-32 lg:py-40 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs uppercase tracking-[0.18em] text-[#EDE8E3]/60">
          <div className="flex items-center gap-2.5 text-[#E8C48E]">
            <Starburst className="w-3.5 h-3.5" />
            <span>Gatherings &amp; Service Times</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-[#EDE8E3]/60 tabular-nums">
            <span className="uppercase tracking-[0.14em] text-[#EDE8E3]/45">
              Next Gathering
            </span>
            <span className="text-[#E8C48E]">
              {timeLeft ? (
                <>
                  {timeLeft.days}d : {String(timeLeft.hours).padStart(2, "0")}h
                  : {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
                  {String(timeLeft.seconds).padStart(2, "0")}s
                </>
              ) : (
                "--d : --h : --m : --s"
              )}
            </span>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-12">
          <h2 className="lg:col-span-7 text-3xl sm:text-4xl lg:text-[2.75rem] font-light tracking-tight leading-[1.14] text-white">
            Experience Sunday in person or from home.
          </h2>
          <p className="lg:col-span-5 text-sm sm:text-base text-[#EDE8E3]/70 font-light leading-relaxed">
            Dress casually and come as you are. Whether joining us at Cathedral
            Way or tuning in online, there is a place for you.
          </p>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.16em] text-[#E8C48E] mb-2">
              Weekly Gathering Schedule
            </p>
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
              Sunday Mornings at Cathedral Way
            </h3>

            <div className="mt-8 divide-y divide-white/10 border-t border-b border-white/10">
              <div className="py-6 flex items-start justify-between gap-6">
                <div>
                  <h4 className="text-base sm:text-lg font-normal text-white">
                    9:00 AM Gathering
                  </h4>
                  <p className="mt-1 text-sm text-[#EDE8E3]/70 font-light leading-relaxed">
                    Acoustic liturgy, contemplative hymns, and weekly communion.
                  </p>
                </div>
                <span className="font-mono text-xs text-[#EDE8E3]/55 tabular-nums shrink-0 pt-1">
                  75 mins
                </span>
              </div>

              <div className="py-6 flex items-start justify-between gap-6">
                <div>
                  <h4 className="text-base sm:text-lg font-normal text-white">
                    11:00 AM Gathering &amp; Kids
                  </h4>
                  <p className="mt-1 text-sm text-[#EDE8E3]/70 font-light leading-relaxed">
                    Modern celebration worship, full NextGen nursery &amp;
                    elementary classes.
                  </p>
                </div>
                <span className="font-mono text-xs text-[#EDE8E3]/55 tabular-nums shrink-0 pt-1">
                  75 mins
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs uppercase tracking-[0.16em] text-[#EDE8E3]/50 mb-1.5">
                Main Campus Location
              </p>
              <p className="text-sm font-normal text-white">
                Christ Family Church Main Campus
              </p>
              <p className="mt-0.5 text-sm text-[#EDE8E3]/70 font-light">
                KICC, Nairobi · Free guest parking structure across the plaza
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onPlanVisit}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#E8C48E] text-[#141210] text-sm font-medium tracking-tight hover:bg-[#f1d3a5] active:scale-[0.98] transition-colors cursor-pointer"
              >
                Plan Your Sunday Visit
              </button>

              <button
                type="button"
                onClick={onOpenLiveModal}
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-white/15 text-sm text-[#EDE8E3]/85 hover:border-white/35 hover:text-white transition-colors cursor-pointer"
              >
                <span>Watch Online</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 lg:border-l lg:border-white/10 lg:pl-12 xl:pl-16">
            <p className="text-xs uppercase tracking-[0.16em] text-[#E8C48E] mb-2">
              First Time Here?
            </p>
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
              What to expect when you arrive
            </h3>

            <div
              role="tablist"
              aria-label="What to expect as a first-time guest"
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/10"
            >
              {(Object.keys(GUEST_GUIDES) as GuestGuideKey[]).map((key) => {
                const guide = GUEST_GUIDES[key];
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(key)}
                    className={`pb-3 text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "text-[#E8C48E] font-medium border-b border-[#E8C48E] -mb-px"
                        : "text-[#EDE8E3]/60 hover:text-white font-normal"
                    }`}
                  >
                    {guide.tabLabel}
                  </button>
                );
              })}
            </div>

            <div role="tabpanel" className="py-8 border-b border-white/10">
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <span className="font-mono text-xs text-[#E8C48E] tabular-nums">
                  {currentGuide.number}
                </span>
                <span className="font-mono text-[11px] text-[#EDE8E3]/50">
                  {currentGuide.note}
                </span>
              </div>

              <h4 className="text-xl font-normal tracking-tight text-white">
                {currentGuide.title}
              </h4>

              <p className="mt-3 text-sm sm:text-[15px] text-[#EDE8E3]/75 font-light leading-relaxed">
                {currentGuide.description}
              </p>
            </div>

            <p className="mt-6 text-xs text-[#EDE8E3]/55 font-light leading-relaxed">
              No dress code or expectations—whether it is your first Sunday in
              years or your very first time at church, you are welcome as you
              are.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
