"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X, Play, Heart, Calendar } from "lucide-react";
import { useSmoothScroll } from "../providers/smooth-scroll-provider";
import { Starburst } from "../star-burst/star-burst";
import { LiveStreamModal } from "../live-stream-modal/live-stream-modal";
import { PlanVisitModal } from "../plan-visit-modal/plan-visit-modal";
import { PrayerDrawer } from "../prayer-drawer/prayer-drawer";

const NAV_LINKS = [
  { label: "About", target: "#about" },
  { label: "Serve", target: "#ministries" },
  { label: "Sermons", target: "#sermons" },
  { label: "Gatherings", target: "#gatherings" },
];

const DESKTOP_BREAKPOINT = 1024;
const SCROLL_OFFSET = -40;

export function Navbar() {
  const { scrollTo } = useSmoothScroll();
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlanVisitOpen, setIsPlanVisitOpen] = useState(false);
  const [isLiveStreamOpen, setIsLiveStreamOpen] = useState(false);
  const [isPrayerOpen, setIsPrayerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("hero");
      const threshold = heroEl
        ? Math.max(240, heroEl.offsetHeight * 0.65)
        : 450;
      const shouldShow = window.scrollY > threshold;
      setVisible(shouldShow);
      if (!shouldShow) {
        setMobileMenuOpen(false);
      }
    };

    const rafId = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    scrollTo(target, { offset: SCROLL_OFFSET });
  };

  const openFromMenu = (open: () => void) => {
    setMobileMenuOpen(false);
    open();
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            key="sticky-navbar"
            initial={{ y: -96, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -96, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-40 bg-[#121110]/85 backdrop-blur-md border-b border-[#EDE8E3]/10 shadow-lg shadow-black/30"
          >
            <div className="mx-auto grid h-18 w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 lg:h-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:px-8">
              <button
                onClick={() => scrollTo("#hero")}
                className="group flex min-w-0 items-center gap-3 justify-self-start rounded-lg text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C48E]"
                aria-label="Christ Family Church Home"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#EDE8E3] transition-colors group-hover:text-[#E8C48E]">
                  <Starburst className="h-8 w-8 transform transition-transform duration-700 ease-out group-hover:rotate-45" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="whitespace-nowrap text-base font-semibold leading-none tracking-tight text-[#EDE8E3]">
                    Christ Family
                  </span>
                  <span className="text-xs font-light leading-none tracking-[0.2em] text-[#EDE8E3]/70">
                    Church
                  </span>
                </div>
              </button>

              <nav
                aria-label="Primary"
                className="hidden items-center gap-8 justify-self-center text-sm font-medium lg:flex xl:gap-10"
              >
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.target)}
                    className="relative cursor-pointer rounded py-2 text-[#EDE8E3]/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C48E] after:absolute after:bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#E8C48E] after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-2 justify-self-end sm:gap-3">
                <button
                  onClick={() => setIsLiveStreamOpen(true)}
                  className="hidden items-center gap-2 rounded-full border border-[#EDE8E3]/15 bg-[#1E1C1A]/80 px-4 py-2 text-xs font-medium text-[#EDE8E3] transition-colors hover:border-[#E8C48E]/40 hover:bg-[#282522] cursor-pointer xl:flex"
                  title="Watch Live Worship Service"
                >
                  <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                  <span>Live</span>
                </button>
                <button
                  onClick={() => setIsPrayerOpen(true)}
                  className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-[#EDE8E3]/80 transition-colors hover:bg-[#EDE8E3]/10 hover:text-white cursor-pointer md:flex"
                >
                  <Heart className="h-3.5 w-3.5 text-[#E8C48E]" />
                  <span>Prayer</span>
                </button>
                <button
                  onClick={() => setIsPlanVisitOpen(true)}
                  className="hidden items-center gap-1.5 rounded-full bg-[#E8C48E] px-5 py-2.5 text-xs font-semibold text-[#121110] shadow-md shadow-[#E8C48E]/20 transition-all hover:bg-[#f2d5a9] active:scale-95 cursor-pointer min-[380px]:flex"
                >
                  <span>Join us</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((open) => !open)}
                  className="flex h-11 w-11 items-center justify-center rounded-lg text-[#EDE8E3]/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C48E] lg:hidden"
                  aria-label={
                    mobileMenuOpen
                      ? "Close navigation menu"
                      : "Open navigation menu"
                  }
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 overflow-y-auto overscroll-contain bg-[#121110]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex min-h-full max-w-7xl flex-col px-4 pb-8 pt-28 sm:px-6 md:pt-32">
              <div className="grid gap-10 md:grid-cols-2 md:gap-16">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#EDE8E3]/40">
                    Navigation
                  </p>
                  <ul className="mt-4 divide-y divide-[#EDE8E3]/10 border-y border-[#EDE8E3]/10">
                    {NAV_LINKS.map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={() => handleNavClick(link.target)}
                          className="group flex w-full items-center justify-between py-4 text-left text-2xl font-light text-[#EDE8E3] transition-colors hover:text-[#E8C48E] sm:text-3xl"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="h-5 w-5 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-[#EDE8E3]/40">
                    Join the Family
                  </p>
                  <div className="mt-4 flex flex-col gap-3">
                    <button
                      onClick={() =>
                        openFromMenu(() => setIsPlanVisitOpen(true))
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E8C48E] px-4 py-3.5 text-sm font-medium text-[#121110] transition-colors hover:bg-[#f2d5a9] active:scale-[0.99]"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Plan Your Sunday Visit</span>
                    </button>

                    <button
                      onClick={() =>
                        openFromMenu(() => setIsLiveStreamOpen(true))
                      }
                      className="flex w-full items-center justify-between rounded-xl border border-[#EDE8E3]/15 bg-[#1E1C1A] px-4 py-3.5 text-sm text-[#EDE8E3] transition-colors hover:border-[#E8C48E]/40"
                    >
                      <span className="flex items-center gap-2">
                        <Play className="h-4 w-4 text-[#E8C48E]" />
                        <span>Watch Live Broadcast</span>
                      </span>
                      <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                    </button>

                    <button
                      onClick={() => openFromMenu(() => setIsPrayerOpen(true))}
                      className="flex w-full items-center gap-2 rounded-xl border border-[#EDE8E3]/15 bg-transparent px-4 py-3.5 text-sm text-[#EDE8E3] transition-colors hover:border-[#E8C48E]/40 hover:bg-[#EDE8E3]/5"
                    >
                      <Heart className="h-4 w-4 text-[#E8C48E]" />
                      <span>Share a Prayer Request</span>
                    </button>
                  </div>
                </div>
              </div>

              <p className="mt-auto pt-10 text-center text-xs text-[#EDE8E3]/50">
                Christ Family Church · All Are Welcome
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PlanVisitModal
        isOpen={isPlanVisitOpen}
        onClose={() => setIsPlanVisitOpen(false)}
      />

      <LiveStreamModal
        isOpen={isLiveStreamOpen}
        onClose={() => setIsLiveStreamOpen(false)}
      />

      <PrayerDrawer
        isOpen={isPrayerOpen}
        onClose={() => setIsPrayerOpen(false)}
      />
    </>
  );
}
