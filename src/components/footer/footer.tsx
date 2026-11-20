"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useSmoothScroll } from "../providers/smooth-scroll-provider";
import { Starburst } from "../star-burst/star-burst";
import { PlanVisitModal } from "../plan-visit-modal/plan-visit-modal";
import { PrayerDrawer } from "../prayer-drawer/prayer-drawer";
import { NAV_LINKS } from "./nav-links";
import { SOCIAL_LINKS } from "./socials";
import Link from "next/link";

const Footer = () => {
  const { scrollTo } = useSmoothScroll();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isPlanVisitOpen, setIsPlanVisitOpen] = useState(false);
  const [isPrayerOpen, setIsPrayerOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState<number>(2026);

  const [subscribed, setSubscribed] = useState(false);
  const resetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentYear(new Date().getFullYear());

    return () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    setSubscribed(true);
    setNewsletterEmail("");

    resetTimeoutRef.current = window.setTimeout(() => {
      setSubscribed(false);
      resetTimeoutRef.current = null;
    }, 4000);
  };

  return (
    <footer className="bg-[#141210] text-[#EDE8E3] border-t border-white/10 pt-20 sm:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs uppercase tracking-[0.18em] text-[#EDE8E3]/60">
          <button
            type="button"
            onClick={() => scrollTo("#hero")}
            className="inline-flex items-center gap-2.5 text-[#E8C48E] hover:text-white transition-colors cursor-pointer"
          >
            <Starburst className="w-3.5 h-3.5" />
            <span>Christ Family Church</span>
          </button>

          <div className="flex items-center gap-4 font-mono text-[11px] text-[#EDE8E3]/50 tabular-nums">
            <span>Est. 1994</span>
            <span aria-hidden="true">/</span>
            <span>KICC, Nairobi</span>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-light tracking-[-0.02em] leading-[1.2] text-white">
              Take a step toward the light.
            </h2>

            <p className="text-sm text-[#EDE8E3]/70 font-light leading-relaxed max-w-sm">
              A gospel sanctuary dedicated to biblical truth, heartfelt worship,
              and radical hospitality for all people.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#EDE8E3]/60">
              {SOCIAL_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E8C48E] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#E8C48E]">
              Navigation
            </p>
            <ul className="space-y-2.5 text-sm text-[#EDE8E3]/70 font-light">
              {NAV_LINKS.map((link) => (
                <li key={link.target}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.target)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#E8C48E]">
              Campus &amp; Care
            </p>
            <dl className="space-y-3 text-xs text-[#EDE8E3]/70 font-light">
              <div>
                <dt className="uppercase tracking-[0.14em] text-[#EDE8E3]/45 text-[10px]">
                  Address
                </dt>
                <dd className="mt-0.5 text-sm text-[#EDE8E3]/80">
                  KICC, Nairobi
                </dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.14em] text-[#EDE8E3]/45 text-[10px]">
                  Sundays
                </dt>
                <dd className="mt-0.5 text-sm text-[#EDE8E3]/80 font-mono tabular-nums">
                  9:00 AM &amp; 11:00 AM
                </dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.14em] text-[#EDE8E3]/45 text-[10px]">
                  Phone
                </dt>
                <dd className="mt-0.5 text-sm text-[#EDE8E3]/80 font-mono tabular-nums">
                  (555) 723-4500
                </dd>
              </div>
            </dl>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsPrayerOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-[#E8C48E] hover:text-[#f1d3a5] transition-colors cursor-pointer"
              >
                <span>Request Prayer Care</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#E8C48E]">
              Weekly Pastoral Notes
            </p>
            <p className="text-xs sm:text-sm text-[#EDE8E3]/70 font-light leading-relaxed">
              Receive Pastor Thomas&apos; weekly scripture reflections,
              community needs, and upcoming worship dates.
            </p>

            {subscribed ? (
              <div className="py-3 border-t border-b border-[#E8C48E]/40 text-xs text-[#EDE8E3] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E8C48E] shrink-0" />
                <span>Subscribed. Look for pastoral notes this Friday.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3 pt-1">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1A1816] border border-white/15 text-xs sm:text-sm text-white placeholder:text-[#EDE8E3]/40 focus:outline-none focus:border-[#E8C48E]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#E8C48E] text-[#141210] text-xs sm:text-sm font-medium tracking-tight hover:bg-[#f1d3a5] active:scale-[0.98] transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#EDE8E3]/50">
          <p className="font-mono text-[11px] tabular-nums">
            © {currentYear} Christ Family Church. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="#statement-of-faith"
              className="hover:text-white transition-colors"
            >
              Statement of Faith
            </a>
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <button
              type="button"
              onClick={() => setIsPlanVisitOpen(true)}
              className="inline-flex items-center gap-1 text-[#E8C48E] hover:text-[#f1d3a5] font-medium transition-colors cursor-pointer"
            >
              <span>Plan a Visit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <PlanVisitModal
        isOpen={isPlanVisitOpen}
        onClose={() => setIsPlanVisitOpen(false)}
      />

      <PrayerDrawer
        isOpen={isPrayerOpen}
        onClose={() => setIsPrayerOpen(false)}
      />
    </footer>
  );
};

export default Footer;
