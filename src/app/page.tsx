"use client";

import { Hero } from "@/components/hero/hero";
import { LiveStreamModal } from "@/components/live-stream-modal/live-stream-modal";
import { PlanVisitModal } from "@/components/plan-visit-modal/plan-visit-modal";
import { PrayerDrawer } from "@/components/prayer-drawer/prayer-drawer";
import { PastorBioModal } from "@/components/pastor-bio-modal/pastor-bio-modal";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { useState } from "react";
import { CommunityStoryModal } from "@/components/community-story-modal/community-story-modal";
import { AboutMission } from "@/components/about-us/about-mission";
import { SermonsShowcase } from "@/components/sermons-showcase/sermons-showcase";
import { MinistryGrid } from "@/components/ministry-grid/ministry-grid";
import { WorshipExperience } from "@/components/worship-experience/worship-experience";

export default function HomePage() {
  const [isPlanVisitOpen, setIsPlanVisitOpen] = useState(false);
  const [isLiveStreamOpen, setIsLiveStreamOpen] = useState(false);
  const [isPrayerOpen, setIsPrayerOpen] = useState(false);
  const [isPastorBioOpen, setIsPastorBioOpen] = useState(false);
  const [isCommunityStoryOpen, setIsCommunityStoryOpen] = useState(false);

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#121110] text-[#EDE8E3] selection:bg-[#E8C48E]/30 selection:text-[#FFF8EE]">
        <Hero
          onOpenLiveStream={() => setIsLiveStreamOpen(true)}
          onOpenPlanVisit={() => setIsPlanVisitOpen(true)}
          onOpenPastorBio={() => setIsPastorBioOpen(true)}
          onOpenCommunityStory={() => setIsCommunityStoryOpen(true)}
        />

        <AboutMission onPlanVisit={() => setIsPlanVisitOpen(true)} />

        <SermonsShowcase onOpenLiveModal={() => setIsLiveStreamOpen(true)} />

        <MinistryGrid />

        <WorshipExperience
          onPlanVisit={() => setIsPlanVisitOpen(true)}
          onOpenLiveModal={() => setIsLiveStreamOpen(true)}
        />

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
        <PastorBioModal
          isOpen={isPastorBioOpen}
          onClose={() => setIsPastorBioOpen(false)}
          onPlanVisit={() => {
            setIsPastorBioOpen(false);
            setIsPlanVisitOpen(true);
          }}
        />
        <CommunityStoryModal
          isOpen={isCommunityStoryOpen}
          onClose={() => setIsCommunityStoryOpen(false)}
          onExploreGroups={() => {
            const el = document.getElementById("ministries");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>
    </SmoothScrollProvider>
  );
}
