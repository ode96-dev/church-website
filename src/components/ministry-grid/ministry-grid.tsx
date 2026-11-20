"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, X, Check } from "lucide-react";
import { Starburst } from "../star-burst/star-burst";
import { MINISTRIES, Ministry } from "./ministries";

export function MinistryGrid() {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(
    null,
  );
  const [submittedForm, setSubmittedForm] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const closeTimeoutRef = useRef<number | null>(null);

  const closeModal = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setSelectedMinistry(null);
    setSubmittedForm(false);
  };

  useEffect(() => {
    if (!selectedMinistry) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMinistry]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim()) return;
    setSubmittedForm(true);

    closeTimeoutRef.current = window.setTimeout(() => {
      setSubmittedForm(false);
      setSelectedMinistry(null);
      setContactName("");
      setContactEmail("");
    }, 2400);
  };

  return (
    <section
      id="ministries"
      className="bg-[#141210] text-[#EDE8E3] py-24 sm:py-32 lg:py-40 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs uppercase tracking-[0.18em] text-[#EDE8E3]/60">
          <div className="flex items-center gap-2.5 text-[#E8C48E]">
            <Starburst className="w-3.5 h-3.5" />
            <span>Community &amp; Service</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#EDE8E3]/50 tabular-nums">
            <span>Six Ministries</span>
            <span aria-hidden="true">/</span>
            <span>Weekly &amp; Monthly</span>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-12">
          <h2 className="lg:col-span-7 text-3xl sm:text-4xl lg:text-[2.75rem] font-light tracking-tight leading-[1.14] text-white">
            Every heart has a calling. Find your place.
          </h2>
          <p className="lg:col-span-5 text-sm sm:text-base text-[#EDE8E3]/70 font-light leading-relaxed">
            Our ministries exist to equip ordinary people to live extraordinary
            lives of sacrificial love in our neighborhoods.
          </p>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-x-16 divide-y divide-white/10 lg:divide-y-0">
          {[0, 1].map((colIndex) => {
            const colItems = MINISTRIES.filter((_, i) => i % 2 === colIndex);
            return (
              <div
                key={colIndex}
                className={`divide-y divide-white/10 ${
                  colIndex === 1 ? "lg:border-t-0 border-t border-white/10" : ""
                }`}
              >
                {colItems.map((ministry) => (
                  <button
                    key={ministry.id}
                    type="button"
                    onClick={() => {
                      setSubmittedForm(false);
                      setSelectedMinistry(ministry);
                    }}
                    className="w-full text-left py-7 sm:py-8 flex items-start gap-5 transition-colors cursor-pointer group"
                  >
                    <span className="font-mono text-xs text-[#E8C48E] tabular-nums pt-1 shrink-0">
                      {ministry.number}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-lg sm:text-xl font-normal tracking-tight text-white group-hover:text-[#E8C48E] transition-colors">
                          {ministry.name}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-[#EDE8E3]/45 group-hover:text-[#E8C48E] shrink-0 transition-colors" />
                      </div>

                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#E8C48E]/80">
                        {ministry.subtitle}
                      </p>

                      <p className="mt-3 text-sm text-[#EDE8E3]/70 font-light leading-relaxed">
                        {ministry.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#EDE8E3]/50 font-mono">
                        <span>{ministry.leader}</span>
                        <span>{ministry.schedule}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {selectedMinistry && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ministry-modal-title"
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#141210] text-[#EDE8E3] border border-white/15 rounded-xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
              <div>
                <p className="font-mono text-xs text-[#E8C48E] tabular-nums mb-1">
                  {selectedMinistry.number} · {selectedMinistry.subtitle}
                </p>
                <h3
                  id="ministry-modal-title"
                  className="text-2xl font-normal tracking-tight text-white"
                >
                  {selectedMinistry.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close ministry details"
                className="p-2 rounded-full border border-white/15 text-[#EDE8E3]/70 hover:text-white hover:border-white/35 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[#1D1A17] mt-6">
              <Image
                src={selectedMinistry.image}
                alt={selectedMinistry.name}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="mt-6 text-sm text-[#EDE8E3]/80 font-light leading-relaxed">
              {selectedMinistry.description}
            </p>

            <dl className="mt-6 divide-y divide-white/10 border-t border-b border-white/10 text-xs">
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <dt className="uppercase tracking-[0.14em] text-[#EDE8E3]/50">
                  Schedule
                </dt>
                <dd className="text-white font-mono">
                  {selectedMinistry.schedule}
                </dd>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <dt className="uppercase tracking-[0.14em] text-[#EDE8E3]/50">
                  Location
                </dt>
                <dd className="text-white">{selectedMinistry.location}</dd>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <dt className="uppercase tracking-[0.14em] text-[#EDE8E3]/50">
                  Led By
                </dt>
                <dd className="text-white">{selectedMinistry.leader}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.14em] text-[#E8C48E] mb-2.5">
                What to Expect
              </p>
              <ul className="divide-y divide-white/10 border-t border-b border-white/10 text-xs sm:text-sm text-[#EDE8E3]/80 font-light">
                {selectedMinistry.highlights.map((item, idx) => (
                  <li key={idx} className="py-2.5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              {submittedForm ? (
                <div className="py-4 flex items-start gap-3 text-sm text-[#EDE8E3]">
                  <Check className="w-4 h-4 text-[#E8C48E] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-white">
                      Note sent for {selectedMinistry.name}.
                    </p>
                    <p className="text-xs text-[#EDE8E3]/65 mt-0.5">
                      {selectedMinistry.leader} will follow up within 24 hours.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleConnectSubmit} className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-[#EDE8E3]/60">
                    Connect With This Ministry
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1A1816] border border-white/15 text-xs sm:text-sm text-white placeholder:text-[#EDE8E3]/40 focus:outline-none focus:border-[#E8C48E]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1A1816] border border-white/15 text-xs sm:text-sm text-white placeholder:text-[#EDE8E3]/40 focus:outline-none focus:border-[#E8C48E]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#E8C48E] text-[#141210] text-xs sm:text-sm font-medium tracking-tight hover:bg-[#f1d3a5] active:scale-[0.98] transition-colors cursor-pointer"
                  >
                    Connect with {selectedMinistry.name}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
