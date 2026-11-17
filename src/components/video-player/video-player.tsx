"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Loader2,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  VideoOff,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  className?: string;
}

type WebkitVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

const PLAYBACK_RATES = [0.75, 1, 1.25, 1.5, 2];
const CONTROLS_HIDE_DELAY = 2800;
const SEEK_STEP = 5;
const SKIP_STEP = 10;
const VOLUME_STEP = 0.1;

const CONTROL_BUTTON =
  "h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C48E]";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(secs)}`
    : `${minutes}:${pad(secs)}`;
};

export function VideoPlayer({
  src,
  poster,
  title = "Video player",
  autoPlay = false,
  className = "",
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [rate, setRate] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [scrubbing, setScrubbing] = useState(false);
  const [hoverPct, setHoverPct] = useState<number | null>(null);

  const isLive = duration === Infinity;
  const hasDuration = Number.isFinite(duration) && duration > 0;
  const silent = muted || volume === 0;
  const showControls = controlsVisible || !playing || scrubbing;
  const progress = hasDuration
    ? clamp((currentTime / duration) * 100, 0, 100)
    : 0;
  const bufferedPct = hasDuration
    ? clamp((bufferedEnd / duration) * 100, 0, 100)
    : 0;
  const VolumeIcon = silent ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  const revealControls = useCallback(() => {
    setControlsVisible(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(
      () => setControlsVisible(false),
      CONTROLS_HIDE_DELAY,
    );
  }, []);

  useEffect(() => {
    if (!playing) return;
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(
      () => setControlsVisible(false),
      CONTROLS_HIDE_DELAY,
    );
  }, [playing]);

  useEffect(() => {
    return () => clearTimeout(hideTimer.current);
  }, []);

  useEffect(() => {
    const handleChange = () =>
      setFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted || video.volume === 0) {
      video.muted = false;
      if (video.volume === 0) video.volume = 0.5;
    } else {
      video.muted = true;
    }
  }, []);

  const setVolumeLevel = useCallback((value: number) => {
    const video = videoRef.current;
    if (!video) return;
    const next = clamp(value, 0, 1);
    video.volume = next;
    video.muted = next === 0;
  }, []);

  const seekBy = (delta: number) => {
    const video = videoRef.current;
    if (!video || !hasDuration) return;
    const next = clamp(video.currentTime + delta, 0, duration);
    video.currentTime = next;
    setCurrentTime(next);
  };

  const seekTo = (time: number) => {
    const video = videoRef.current;
    if (!video || !hasDuration) return;
    const next = clamp(time, 0, duration);
    video.currentTime = next;
    setCurrentTime(next);
  };

  const cycleRate = () => {
    const video = videoRef.current;
    if (!video) return;
    const index = PLAYBACK_RATES.indexOf(rate);
    video.playbackRate = PLAYBACK_RATES[(index + 1) % PLAYBACK_RATES.length];
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    const video = videoRef.current as WebkitVideoElement | null;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
      return;
    }
    if (container?.requestFullscreen) {
      container.requestFullscreen().catch(() => undefined);
    } else if (video?.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    }
  };

  const retry = () => {
    const video = videoRef.current;
    if (!video) return;
    setError(false);
    setWaiting(true);
    video.load();
    video.play().catch(() => setWaiting(false));
  };

  const syncBuffered = (video: HTMLVideoElement) => {
    const { buffered, currentTime: now } = video;
    let end = 0;
    for (let i = 0; i < buffered.length; i++) {
      if (buffered.start(i) <= now && now <= buffered.end(i)) {
        end = buffered.end(i);
        break;
      }
    }
    setBufferedEnd(end);
  };

  const pctFromPointer = (clientX: number) => {
    const bar = barRef.current;
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    return clamp((clientX - rect.left) / rect.width, 0, 1);
  };

  const handleBarPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!hasDuration) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setScrubbing(true);
    seekTo(pctFromPointer(e.clientX) * duration);
  };

  const handleBarPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const pct = pctFromPointer(e.clientX);
    setHoverPct(pct);
    if (scrubbing) seekTo(pct * duration);
  };

  const handleBarPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setScrubbing(false);
  };

  const handleBarKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      e.stopPropagation();
      seekBy(-SEEK_STEP);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      seekBy(SEEK_STEP);
    } else if (e.key === "Home") {
      e.preventDefault();
      seekTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      seekTo(duration);
    }
  };

  const handleSurfacePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if (e.pointerType === "touch") {
      if (controlsVisible) {
        clearTimeout(hideTimer.current);
        setControlsVisible(false);
      } else {
        revealControls();
      }
      return;
    }
    togglePlay();
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || scrubbing) return;
    clearTimeout(hideTimer.current);
    setControlsVisible(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!src) return;
    switch (e.key.toLowerCase()) {
      case " ":
        if (e.target !== e.currentTarget) return;
        e.preventDefault();
        togglePlay();
        break;
      case "k":
        togglePlay();
        break;
      case "arrowleft":
        e.preventDefault();
        seekBy(-SEEK_STEP);
        break;
      case "arrowright":
        e.preventDefault();
        seekBy(SEEK_STEP);
        break;
      case "j":
        seekBy(-SKIP_STEP);
        break;
      case "l":
        seekBy(SKIP_STEP);
        break;
      case "arrowup":
        e.preventDefault();
        setVolumeLevel((silent ? 0 : volume) + VOLUME_STEP);
        break;
      case "arrowdown":
        e.preventDefault();
        setVolumeLevel((silent ? 0 : volume) - VOLUME_STEP);
        break;
      case "m":
        toggleMute();
        break;
      case "f":
        toggleFullscreen();
        break;
      default:
        return;
    }
    revealControls();
  };

  if (!src) {
    return (
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-xl bg-black ${className}`}
      >
        {poster && (
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <VideoOff className="h-8 w-8 text-[#E8C48E]" />
          <p className="text-sm text-[#EDE8E3]/80">
            The stream isn&rsquo;t available right now. Please check back soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label={title}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerMove={revealControls}
      onPointerLeave={handlePointerLeave}
      onFocus={revealControls}
      className={`relative aspect-video w-full select-none overflow-hidden bg-black outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E8C48E] ${
        fullscreen ? "" : "rounded-xl"
      } ${showControls ? "" : "cursor-none"} ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full bg-black object-contain"
        onPlay={() => setPlaying(true)}
        onPause={() => {
          setPlaying(false);
          setWaiting(false);
        }}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => {
          setWaiting(false);
          setError(false);
        }}
        onCanPlay={() => setWaiting(false)}
        onSeeked={() => setWaiting(false)}
        onError={() => setError(true)}
        onLoadedMetadata={(e) => {
          const next = e.currentTarget.duration;
          setDuration(Number.isNaN(next) ? 0 : next);
        }}
        onDurationChange={(e) => {
          const next = e.currentTarget.duration;
          setDuration(Number.isNaN(next) ? 0 : next);
        }}
        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime);
          syncBuffered(e.currentTarget);
        }}
        onProgress={(e) => syncBuffered(e.currentTarget)}
        onVolumeChange={(e) => {
          setMuted(e.currentTarget.muted);
          setVolume(e.currentTarget.volume);
        }}
        onRateChange={(e) => setRate(e.currentTarget.playbackRate)}
      />

      <div
        className="absolute inset-0"
        onPointerUp={handleSurfacePointerUp}
        onDoubleClick={toggleFullscreen}
      />

      {waiting && !error && (
        <Loader2 className="pointer-events-none absolute inset-0 m-auto h-10 w-10 animate-spin text-white" />
      )}

      {!playing && !waiting && !error && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Play"
          className="absolute inset-0 m-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-[#E8C48E] text-[#121110] shadow-xl shadow-black/40 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 sm:h-20 sm:w-20"
        >
          <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
        </button>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/80 px-6 text-center">
          <p className="text-sm text-[#EDE8E3]/80">
            This video couldn&rsquo;t be loaded.
          </p>
          <button
            type="button"
            onClick={retry}
            className="cursor-pointer rounded-full bg-[#E8C48E] px-5 py-2.5 text-sm font-semibold text-[#121110] transition-colors hover:bg-[#f3d7ad] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Try again
          </button>
        </div>
      )}

      {!error && (
        <div
          className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/45 to-transparent px-3 pb-2 pt-14 transition-opacity duration-300 sm:px-4 sm:pb-3 ${
            showControls ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {hasDuration && (
            <div
              ref={barRef}
              role="slider"
              tabIndex={0}
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(currentTime)}
              aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
              onKeyDown={handleBarKeyDown}
              onPointerDown={handleBarPointerDown}
              onPointerMove={handleBarPointerMove}
              onPointerUp={handleBarPointerUp}
              onPointerCancel={handleBarPointerUp}
              onPointerLeave={() => {
                if (!scrubbing) setHoverPct(null);
              }}
              className="group/bar relative flex h-5 touch-none cursor-pointer items-center outline-none"
            >
              <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/20 transition-[height] group-hover/bar:h-1.5 group-focus-visible/bar:h-1.5">
                <div
                  className="absolute inset-y-0 left-0 bg-white/30"
                  style={{ width: `${bufferedPct}%` }}
                />
                <div
                  className="absolute inset-y-0 left-0 bg-[#E8C48E]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div
                className={`pointer-events-none absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8C48E] shadow transition-opacity group-hover/bar:opacity-100 group-focus-visible/bar:opacity-100 ${
                  scrubbing ? "opacity-100" : "opacity-0"
                }`}
                style={{ left: `${progress}%` }}
              />
              {hoverPct !== null && (
                <div
                  className="pointer-events-none absolute bottom-full mb-1 -translate-x-1/2 rounded-md bg-black/85 px-2 py-1 text-xs tabular-nums text-white"
                  style={{ left: `${clamp(hoverPct, 0.04, 0.96) * 100}%` }}
                >
                  {formatTime(hoverPct * duration)}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-0.5 sm:gap-1.5">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              title={playing ? "Pause (k)" : "Play (k)"}
              className={`flex ${CONTROL_BUTTON}`}
            >
              {playing ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              )}
            </button>

            {hasDuration && (
              <div className="hidden items-center sm:flex">
                <button
                  type="button"
                  onClick={() => seekBy(-SKIP_STEP)}
                  aria-label="Back 10 seconds"
                  title="Back 10 seconds (j)"
                  className={`flex ${CONTROL_BUTTON}`}
                >
                  <RotateCcw className="h-4.5 w-4.5" />
                </button>
                <button
                  type="button"
                  onClick={() => seekBy(SKIP_STEP)}
                  aria-label="Forward 10 seconds"
                  title="Forward 10 seconds (l)"
                  className={`flex ${CONTROL_BUTTON}`}
                >
                  <RotateCw className="h-4.5 w-4.5" />
                </button>
              </div>
            )}

            <div className="group/volume flex items-center">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={silent ? "Unmute" : "Mute"}
                title={silent ? "Unmute (m)" : "Mute (m)"}
                className={`flex ${CONTROL_BUTTON}`}
              >
                <VolumeIcon className="h-5 w-5" />
              </button>
              <div className="hidden w-0 overflow-hidden transition-[width] duration-200 group-focus-within/volume:w-20 group-hover/volume:w-20 sm:block">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={silent ? 0 : volume}
                  onChange={(e) => setVolumeLevel(Number(e.target.value))}
                  onKeyDown={(e) => {
                    if (e.key.startsWith("Arrow")) e.stopPropagation();
                  }}
                  aria-label="Volume"
                  className="mx-2 block h-1 w-16 cursor-pointer accent-[#E8C48E]"
                />
              </div>
            </div>

            {isLive ? (
              <span className="ml-1 flex items-center gap-1.5 rounded-full bg-red-600/90 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-white">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                LIVE
              </span>
            ) : (
              <span className="ml-1 text-xs tabular-nums text-white/90">
                {formatTime(currentTime)}
                <span className="text-white/50"> / {formatTime(duration)}</span>
              </span>
            )}

            <div className="flex-1" />

            {hasDuration && (
              <button
                type="button"
                onClick={cycleRate}
                aria-label={`Playback speed ${rate}x`}
                title="Playback speed"
                className="hidden h-10 min-w-10 cursor-pointer items-center justify-center rounded-full px-2 text-xs font-medium tabular-nums text-white/90 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C48E] sm:flex"
              >
                {rate}&times;
              </button>
            )}

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={fullscreen ? "Exit full screen" : "Full screen"}
              title={fullscreen ? "Exit full screen (f)" : "Full screen (f)"}
              className={`flex ${CONTROL_BUTTON}`}
            >
              {fullscreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
