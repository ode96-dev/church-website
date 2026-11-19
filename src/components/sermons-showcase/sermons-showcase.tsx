"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Play, Pause, BookOpen, Share2, Check, Radio } from "lucide-react";
import { Starburst } from "../star-burst/star-burst";

interface Sermon {
  id: string;
  number: string;
  title: string;
  series: string;
  speaker: string;
  role: string;
  date: string;
  durationMinutes: number;
  scripture: string;
  description: string;
  keyPoints: string[];
  thumbnail: string;
}

const SERMONS_DATA: Sermon[] = [
  {
    id: "sermon-1",
    number: "01",
    title: "The Light No Darkness Can Quench",
    series: "Walking in Light",
    speaker: "Pastor Thomas Rivera",
    role: "Lead Pastor",
    date: "Dec 7, 2026",
    durationMinutes: 42,
    scripture: "John 8:12 · Psalm 119:105",
    description:
      "In seasons of cultural anxiety and personal despair, the light of Christ is not a flickering candle—it is an unquenchable dawn. Exploring Jesus as the Light of the World.",
    keyPoints: [
      "Darkness is the mere absence of light; it has no generative power of its own.",
      "To follow Christ is to navigate life with eternal orientation rather than immediate fear.",
      "We become lamps in our neighborhoods when we mirror His sacrificial generosity.",
    ],
    thumbnail: "/images/hero_cathedral_light_1791859609961.jpg",
  },
  {
    id: "sermon-2",
    number: "02",
    title: "Friendship as a Spiritual Practice",
    series: "Radical Grace",
    speaker: "Hannah Vance",
    role: "Community Pastor",
    date: "Nov 30, 2026",
    durationMinutes: 38,
    scripture: "Proverbs 27:17 · John 15:12-15",
    description:
      "We were not formed to survive in isolation. Why modern loneliness is a spiritual wound, and how Christ invites us into sacrificial covenant friendships.",
    keyPoints: [
      "Vulnerability is the entry toll for deep fellowship.",
      "Small groups are hospital rooms for souls, not performance stages.",
      "Praying for another person reframes how we view their weaknesses.",
    ],
    thumbnail: "/images/bible_fellowship_overhead_1791859612527.jpg",
  },
  {
    id: "sermon-3",
    number: "03",
    title: "When Prayers Seem Silent",
    series: "Ancient Wisdom",
    speaker: "Dr. Michael Sterling",
    role: "Teaching Elder",
    date: "Nov 23, 2026",
    durationMinutes: 45,
    scripture: "Habakkuk 3:17-19 · Psalm 13",
    description:
      "Honest lament is not a lack of faith; it is faith wrestling with God. Walking through the Psalms of darkness and uncovering steady anchor points.",
    keyPoints: [
      "God welcomes our questions when they are brought directly to His feet.",
      "Waiting is not wasted time; it is where roots anchor deepest.",
      "Even if the fig tree does not blossom, I will rejoice in God my Savior.",
    ],
    thumbnail: "/images/worship_service_gathering_1791859611494.jpg",
  },
];

const SERIES_FILTERS = [
  "All",
  "Walking in Light",
  "Radical Grace",
  "Ancient Wisdom",
] as const;

function formatClock(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

interface SermonsShowcaseProps {
  onOpenLiveModal: () => void;
}

export function SermonsShowcase({ onOpenLiveModal }: SermonsShowcaseProps) {
  const [selectedSeries, setSelectedSeries] = useState<string>("All");
  const [activeSermonId, setActiveSermonId] = useState<string>(
    SERMONS_DATA[0].id,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(806);
  const [notesOpen, setNotesOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const filteredSermons = useMemo(() => {
    if (selectedSeries === "All") return SERMONS_DATA;
    return SERMONS_DATA.filter((sermon) => sermon.series === selectedSeries);
  }, [selectedSeries]);

  const activeSermon = useMemo(() => {
    return (
      SERMONS_DATA.find((sermon) => sermon.id === activeSermonId) ??
      SERMONS_DATA[0]
    );
  }, [activeSermonId]);

  const totalSeconds = activeSermon.durationMinutes * 60;
  const progressPercent = Math.min(
    100,
    Math.max(0, (elapsedSeconds / totalSeconds) * 100),
  );

  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev >= totalSeconds) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isPlaying, totalSeconds]);

  const handleSelectSeries = (series: string) => {
    setSelectedSeries(series);
    const matching =
      series === "All"
        ? SERMONS_DATA
        : SERMONS_DATA.filter((s) => s.series === series);

    if (matching.length > 0 && !matching.some((s) => s.id === activeSermonId)) {
      setActiveSermonId(matching[0].id);
      setIsPlaying(false);
      setElapsedSeconds(0);
    }
  };

  const handleSelectSermon = (sermon: Sermon) => {
    setActiveSermonId(sermon.id);
    setIsPlaying(false);
    setElapsedSeconds(0);
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = Math.min(
      1,
      Math.max(0, (e.clientX - rect.left) / rect.width),
    );
    setElapsedSeconds(Math.round(ratio * totalSeconds));
  };

  const handleShare = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // Clipboard may be restricted in non-secure contexts;
    }
    setCopiedLink(true);
    window.setTimeout(() => setCopiedLink(false), 2200);
  };

  return (
    <section
      id="sermons"
      className="bg-[#141210] text-[#EDE8E3] py-24 sm:py-32 lg:py-40 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs uppercase tracking-[0.18em] text-[#EDE8E3]/60">
          <div className="flex items-center gap-2.5 text-[#E8C48E]">
            <Starburst className="w-3.5 h-3.5" />
            <span>Teaching &amp; Messages</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#EDE8E3]/50 tabular-nums">
            <span>Sundays · 10:00 AM</span>
            <span aria-hidden="true">/</span>
            <span>Archive</span>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div
            role="tablist"
            aria-label="Filter sermons by series"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b lg:border-b-0 border-white/10 pb-2 lg:pb-0"
          >
            {SERIES_FILTERS.map((series) => {
              const active = selectedSeries === series;
              return (
                <button
                  key={series}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSelectSeries(series)}
                  className={`relative pb-1.5 text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? "text-[#E8C48E] font-medium border-b border-[#E8C48E]"
                      : "text-[#EDE8E3]/60 hover:text-white font-normal"
                  }`}
                >
                  {series}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <figure className="m-0">
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-[#1D1A17]">
                <Image
                  src={activeSermon.thumbnail}
                  alt={activeSermon.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <figcaption className="mt-3.5 flex flex-wrap items-baseline justify-between gap-2 text-xs text-[#EDE8E3]/55">
                <span>
                  {activeSermon.series} · {activeSermon.date}
                </span>
                <span className="font-mono text-[11px] text-[#E8C48E] tabular-nums">
                  {activeSermon.scripture}
                </span>
              </figcaption>
            </figure>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-4 min-w-0">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((prev) => !prev)}
                    aria-label={isPlaying ? "Pause message" : "Play message"}
                    className="mt-1 shrink-0 w-11 h-11 rounded-full bg-[#E8C48E] text-[#141210] flex items-center justify-center hover:bg-[#f1d3a5] active:scale-[0.98] transition-colors cursor-pointer"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-white">
                      {activeSermon.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#EDE8E3]/65 font-light">
                      {activeSermon.speaker} · {activeSermon.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setNotesOpen((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/15 text-xs text-[#EDE8E3]/85 hover:border-white/35 hover:text-white transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#E8C48E]" />
                    <span>{notesOpen ? "Hide Notes" : "Study Notes"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Copy link to message"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/15 text-[#EDE8E3]/75 hover:border-white/35 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedLink ? (
                      <Check className="w-3.5 h-3.5 text-[#E8C48E]" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label="Seek message playback"
                  aria-valuemin={0}
                  aria-valuemax={totalSeconds}
                  aria-valuenow={elapsedSeconds}
                  onClick={handleScrub}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                      setElapsedSeconds((s) => Math.min(totalSeconds, s + 15));
                    } else if (e.key === "ArrowLeft") {
                      setElapsedSeconds((s) => Math.max(0, s - 15));
                    }
                  }}
                  className="w-full h-4 flex items-center cursor-pointer group focus:outline-none"
                >
                  <div className="w-full h-px bg-white/15 relative">
                    <div
                      className="h-0.5 mt-[-0.5px] bg-[#E8C48E] transition-[width] duration-150"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono text-[11px] text-[#EDE8E3]/50 tabular-nums">
                  <span>{formatClock(elapsedSeconds)}</span>
                  <span>{activeSermon.durationMinutes} mins</span>
                </div>
              </div>

              <p className="mt-6 text-sm text-[#EDE8E3]/70 font-light leading-relaxed">
                {activeSermon.description}
              </p>

              {notesOpen && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#E8C48E] mb-3">
                    Key Takeaways
                  </p>
                  <ul className="divide-y divide-white/10 border-t border-b border-white/10 text-sm text-[#EDE8E3]/80 font-light">
                    {activeSermon.keyPoints.map((point, idx) => (
                      <li key={idx} className="py-3 leading-relaxed">
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 font-mono text-[11px] text-[#EDE8E3]/55">
                    Passage: {activeSermon.scripture}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="text-xs uppercase tracking-[0.16em] text-[#EDE8E3]/50 mb-3">
              Messages in Archive
            </p>

            <div className="divide-y divide-white/10 border-t border-b border-white/10">
              {filteredSermons.map((sermon) => {
                const isSelected = sermon.id === activeSermon.id;
                return (
                  <button
                    key={sermon.id}
                    type="button"
                    onClick={() => handleSelectSermon(sermon)}
                    className="w-full text-left py-5 px-2 -mx-2 flex items-baseline gap-4 hover:bg-white/2 transition-colors cursor-pointer group"
                  >
                    <span
                      className={`font-mono text-xs tabular-nums shrink-0 ${
                        isSelected ? "text-[#E8C48E]" : "text-[#EDE8E3]/40"
                      }`}
                    >
                      {sermon.number}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h4
                          className={`text-base font-normal tracking-tight transition-colors ${
                            isSelected
                              ? "text-[#E8C48E]"
                              : "text-white group-hover:text-[#E8C48E]"
                          }`}
                        >
                          {sermon.title}
                        </h4>
                        <span className="font-mono text-[11px] text-[#EDE8E3]/45 tabular-nums shrink-0">
                          {sermon.durationMinutes}m
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#EDE8E3]/60 font-light">
                        {sermon.speaker} · {sermon.date}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-xs uppercase tracking-[0.16em] text-[#E8C48E] mb-2">
                Sunday Broadcast
              </p>
              <h3 className="text-xl font-normal tracking-tight text-white">
                Watch Live Every Sunday at 10:00 AM
              </h3>
              <p className="mt-2.5 text-sm text-[#EDE8E3]/70 font-light leading-relaxed">
                Join the live stream with real-time discussion, scripture notes,
                and prayer support.
              </p>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={onOpenLiveModal}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E8C48E] text-[#141210] text-sm font-medium tracking-tight hover:bg-[#f1d3a5] active:scale-[0.98] transition-colors cursor-pointer"
                >
                  <Radio className="w-4 h-4" />
                  <span>Join Live Stream Room</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
