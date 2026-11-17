"use client";

import React from "react";
import Image from "next/image";
import { X, Mail } from "lucide-react";
import { Starburst } from "../star-burst/star-burst";

interface PastorBioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanVisit: () => void;
}

export function PastorBioModal({
  isOpen,
  onClose,
  onPlanVisit,
}: PastorBioModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#181614] border border-white/10 rounded-2xl overflow-hidden shadow-2xl text-[#EDE8E3]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-2 relative h-64 md:h-auto min-h-70">
            <Image
              src="/images/community_pastor_portrait_1791859611468.jpg"
              alt="Pastor Hannah Vance"
              fill
              className="object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#181614] md:from-transparent via-transparent to-transparent" />
          </div>

          <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E8C48E] font-medium mb-1">
                <Starburst className="w-3.5 h-3.5" />
                <span>Community Pastor</span>
              </div>
              <h3 className="text-2xl font-light text-white">Hannah Vance</h3>
              <p className="text-xs text-[#EDE8E3]/60 mb-4">
                M.Div., Pastoral Care & Discipleship
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-[#EDE8E3]/80 font-light leading-relaxed">
                <p>
                  &ldquo;My deepest passion is creating a home where no one
                  walks alone. Whether you grew up in church or this is your
                  first step through the door, you have an honored seat at
                  Christ’s table.&rdquo;
                </p>
                <p>
                  Hannah oversees Life Groups, hospital visitations, and
                  newcomer discipleship at Christ Family Church.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <a
                href="mailto:hannah@christfamilychurch.org"
                className="text-xs text-[#E8C48E] hover:underline flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>hannah@christfamilychurch.org</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onPlanVisit();
                }}
                className="px-4 py-2 rounded-full bg-[#E8C48E] text-[#121110] font-semibold text-xs hover:bg-[#f3d7ad] transition-all cursor-pointer"
              >
                Meet on Sunday
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
