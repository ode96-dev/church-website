"use client";

import React from "react";
import { X, Quote } from "lucide-react";

interface CommunityStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreGroups: () => void;
}

export function CommunityStoryModal({
  isOpen,
  onClose,
  onExploreGroups,
}: CommunityStoryModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-[#161412] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-[#EDE8E3]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E8C48E] font-medium mb-3">
          <Quote className="w-4 h-4 fill-current transform scale-x-[-1]" />
          <span>Our Community Creed</span>
        </div>

        <blockquote className="text-xl sm:text-2xl font-light text-white leading-relaxed mb-6">
          &ldquo;We want to be a family where people can connect and benefit
          from friendships in Christ.&rdquo;
        </blockquote>

        <div className="space-y-3 text-xs sm:text-sm text-[#EDE8E3]/80 font-light leading-relaxed mb-6">
          <p>
            In a hyper-connected yet deeply isolated culture, church cannot
            simply be a weekly spectator lecture. It must be an extended
            spiritual household.
          </p>
          <p>
            Every week across our city, over 40 Life Groups gather in living
            rooms around warm meals. We carry each other&apos;s burdens,
            celebrate milestones, and discover how the gospel turns strangers
            into genuine brothers and sisters.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#1D1A17] border border-white/5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs font-medium text-white">
                Find a Life Group near you
              </p>
              <p className="text-[11px] text-[#EDE8E3]/60">
                Groups meeting Tuesday through Thursday
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onExploreGroups();
            }}
            className="px-4 py-2 rounded-full bg-[#E8C48E] text-[#121110] font-semibold text-xs hover:bg-[#f3d7ad] transition-all cursor-pointer whitespace-nowrap"
          >
            Explore Groups
          </button>
        </div>
      </div>
    </div>
  );
}
