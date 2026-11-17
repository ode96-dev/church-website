"use client";

import React from "react";
import { ModalShell } from "../modal-shell/modal-shell";
import { VideoPlayer } from "../video-player/video-player";

interface LiveStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  src?: string;
  poster?: string;
  title?: string;
  description?: string;
}

const DEFAULT_SRC = process.env.NEXT_PUBLIC_LIVE_STREAM_URL;
const DEFAULT_POSTER = "/images/hero_cathedral_light_1791859609961.jpg";

export function LiveStreamModal({
  isOpen,
  onClose,
  src = DEFAULT_SRC,
  poster = DEFAULT_POSTER,
  title = "Live",
  description = "Christ Family Church",
}: LiveStreamModalProps) {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="xl"
    >
      <VideoPlayer
        src={src}
        poster={poster}
        title={title}
        autoPlay
        className="max-h-[70dvh]"
      />
    </ModalShell>
  );
}
