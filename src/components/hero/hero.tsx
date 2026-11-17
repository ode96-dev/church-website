"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { MotionConfig, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowUpRight, Play, Quote } from "lucide-react";
import type { IconType } from "react-icons";
import { RiTwitterXFill } from "react-icons/ri";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { useSmoothScroll } from "../providers/smooth-scroll-provider";
import { Starburst } from "../star-burst/star-burst";
import { SpringCard } from "../spring-hover/spring-hover";

interface HeroProps {
  onOpenLiveStream: () => void;
  onOpenPlanVisit: () => void;
  onOpenPastorBio: () => void;
  onOpenCommunityStory: () => void;
}

interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

const NAV_LINKS = [
  { label: "About", target: "#about" },
  { label: "Serve", target: "#ministries" },
  { label: "Sermons", target: "#sermons" },
  { label: "Gatherings", target: "#gatherings" },
];

const SOCIAL_LINKS: SocialLink[] = [
  { label: "X", href: "https://x.com", icon: RiTwitterXFill },
  { label: "Facebook", href: "https://facebook.com", icon: BsFacebook },
  { label: "Instagram", href: "https://instagram.com", icon: BsInstagram },
];

const SERVICE_SCHEDULE = "Every Sunday, 10:00 – 11:30 AM";
const SCROLL_OFFSET = -40;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CONTAINER = "mx-auto w-full max-w-360 px-5 sm:px-8 lg:px-12";

const DOCK_CARD =
  "group relative h-48 w-[80%] max-w-sm shrink-0 cursor-pointer snap-start overflow-hidden rounded-xl shadow-lg shadow-black/40 sm:h-56 sm:w-auto sm:max-w-none lg:h-60";

const DOCK_IMAGE_SIZES =
  "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C48E]";

export function Hero({
  onOpenLiveStream,
  onOpenPlanVisit,
  onOpenPastorBio,
  onOpenCommunityStory,
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const hero = heroRef.current;
    const background = bgImageRef.current;
    const headline = headlineRef.current;
    if (!hero || !background || !headline) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(background, {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(headline, {
        yPercent: -25,
        opacity: 0.2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: hero,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="hero"
        ref={heroRef}
        className="relative flex min-h-dvh w-full flex-col justify-between overflow-hidden bg-[#121110] text-[#EDE8E3]"
      >
        <div
          ref={bgImageRef}
          className="pointer-events-none absolute inset-0 z-0 will-change-transform"
        >
          <Image
            src="/images/hero_cathedral_light_1791859609961.jpg"
            alt="Sunbeams pouring through cathedral stained glass windows illuminating the church sanctuary"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.92] contrast-[1.04]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#121110] via-black/35 to-black/50" />
          <div className="pointer-events-none absolute inset-0 bg-radial-[at_50%_40%] from-transparent via-black/20 to-black/70" />
        </div>

        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className={`${CONTAINER} relative z-10 flex items-center justify-between gap-6 pt-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:pt-8`}
        >
          <button
            type="button"
            onClick={() => scrollTo("#hero")}
            aria-label="Christ Family Church Home"
            className={`group flex cursor-pointer items-center gap-3 justify-self-start rounded-lg text-left ${FOCUS_RING}`}
          >
            <span className="text-[#EDE8E3] transition-colors group-hover:text-[#E8C48E]">
              <Starburst className="h-8 w-8 lg:h-9 lg:w-9" />
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-base font-semibold leading-none tracking-tight text-[#EDE8E3]">
                Christ Family
              </span>
              <span className="text-xs font-light leading-none tracking-[0.2em] text-[#EDE8E3]/80">
                Church
              </span>
            </span>
          </button>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 justify-self-center text-sm font-medium lg:flex xl:gap-10"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => scrollTo(link.target, { offset: SCROLL_OFFSET })}
                className={`relative cursor-pointer rounded py-2 text-[#EDE8E3]/90 transition-colors hover:text-white ${FOCUS_RING} after:absolute after:bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#E8C48E] after:transition-all after:duration-300 after:content-[''] hover:after:w-full`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 justify-self-end sm:gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#EDE8E3] backdrop-blur-sm transition-all hover:bg-[#EDE8E3] hover:text-[#121110] active:scale-95 ${FOCUS_RING}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={onOpenPlanVisit}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full bg-[#E8C48E] px-5 py-2.5 text-xs font-semibold text-[#121110] shadow-md shadow-[#E8C48E]/20 transition-all hover:bg-[#f2d5a9] active:scale-95 ${FOCUS_RING}`}
            >
              <span>Join us</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.header>

        <div
          ref={headlineRef}
          className={`${CONTAINER} relative z-10 my-auto py-12 lg:py-16`}
        >
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="text-4xl font-light leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"
            >
              <span className="block">Take a step</span>
              <span className="inline-block bg-linear-to-r from-white via-[#F5E8D3] to-[#E8C48E] bg-clip-text font-normal text-transparent drop-shadow-[0_2px_24px_rgba(232,196,142,0.35)]">
                toward the light
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
              className="mt-6 max-w-md text-lg font-light leading-relaxed text-[#EDE8E3]/85 sm:text-xl md:text-2xl"
            >
              Discover faith, hope, and a home for your soul
            </motion.p>
          </div>
        </div>

        <div className={`${CONTAINER} relative z-20 pb-6 lg:pb-8`}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            role="region"
            aria-label="Quick links"
            className="-mx-5 -my-3 flex scroll-pl-5 snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-5 py-3 scrollbar-none sm:mx-0 sm:my-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:py-0 lg:grid-cols-4 lg:gap-4 [&::-webkit-scrollbar]:hidden"
          >
            <SpringCard
              intensity={4}
              scale={1.01}
              onClick={onOpenPastorBio}
              className={`${DOCK_CARD} border border-white/10`}
            >
              <Image
                src="/images/community_pastor_portrait_1791859611468.jpg"
                alt="Pastor Hannah greeting the congregation with open scriptures"
                fill
                sizes={DOCK_IMAGE_SIZES}
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-4 bottom-3.5 flex items-end justify-between gap-3 text-white">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#EDE8E3]">
                    Hannah Vance
                  </p>
                  <p className="text-xs text-[#EDE8E3]/70">Community Pastor</p>
                </div>
                <span className="shrink-0 rounded-full bg-white/20 px-2.5 py-1 text-[11px] backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-black">
                  Meet Hannah
                </span>
              </div>
            </SpringCard>

            <SpringCard
              intensity={4}
              scale={1.01}
              onClick={onOpenCommunityStory}
              className={`${DOCK_CARD} flex flex-col justify-between border border-white/10 bg-[#0F0E0D] p-6 hover:border-[#E8C48E]/40`}
            >
              <div className="text-white/80 transition-colors group-hover:text-[#E8C48E]">
                <Quote className="h-8 w-8 -scale-x-100 fill-current" />
              </div>

              <p className="text-sm font-light leading-relaxed text-[#EDE8E3] sm:text-[15px]">
                &ldquo;We want to be a family where people can connect and
                benefit from friendships in Christ.&rdquo;
              </p>

              <div className="flex items-center justify-between text-xs text-[#EDE8E3]/50">
                <span>Community Creed</span>
                <ArrowUpRight className="h-4 w-4 text-[#E8C48E] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </SpringCard>

            <SpringCard
              intensity={4}
              scale={1.01}
              onClick={onOpenLiveStream}
              className={`${DOCK_CARD} border border-white/10`}
            >
              <Image
                src="/images/bible_fellowship_overhead_1791859612527.jpg"
                alt="Hands resting on open Bibles and notebooks in fellowship"
                fill
                sizes={DOCK_IMAGE_SIZES}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/25" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-13 w-13 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-transparent group-hover:bg-[#E8C48E] group-hover:text-black">
                  <Play className="ml-0.5 h-5 w-5 fill-current" />
                </div>
              </div>

              <p className="absolute inset-x-4 bottom-3 text-xs font-medium text-white/90 drop-shadow-md">
                Watch the Service
              </p>
            </SpringCard>

            <SpringCard
              intensity={4}
              scale={1.01}
              onClick={onOpenPlanVisit}
              className={`${DOCK_CARD} flex flex-col justify-between bg-[#FAF8F5] p-6 text-[#121110] hover:bg-white`}
            >
              <div>
                <h3 className="text-xl font-medium leading-tight tracking-tight text-[#141312] sm:text-[1.35rem]">
                  Sunday Worship <br /> Service
                </h3>
                <p className="mt-2 text-xs text-[#54504A] sm:text-sm">
                  {SERVICE_SCHEDULE}
                </p>
              </div>

              <div className="flex items-end justify-between border-t border-black/10 pt-4">
                <div className="flex items-center gap-1 text-xs font-semibold text-[#141312] transition-colors group-hover:text-[#B88746]">
                  <span>Plan a Visit</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>

                <div className="text-[#141312] transition-transform duration-500 group-hover:rotate-45">
                  <Starburst className="h-7 w-7" />
                </div>
              </div>
            </SpringCard>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
