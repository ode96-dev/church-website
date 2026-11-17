"use client";

import React, { useId, useState } from "react";
import {
  MODAL_INPUT,
  MODAL_PRIMARY_BUTTON,
  ModalField,
  ModalShell,
  ModalToggle,
} from "../modal-shell/modal-shell";

export interface PrayerRequestData {
  name: string;
  email: string;
  category: string;
  request: string;
  confidential: boolean;
}

interface PrayerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: PrayerRequestData) => Promise<void> | void;
}

const CATEGORIES = [
  "Healing & Comfort",
  "Family & Marriage",
  "Guidance & Direction",
  "Grief & Loss",
  "Praise & Thanksgiving",
];

export function PrayerDrawer({ isOpen, onClose, onSubmit }: PrayerDrawerProps) {
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [request, setRequest] = useState("");
  const [confidential, setConfidential] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    onClose();
    if (!submitted) return;
    setSubmitted(false);
    setName("");
    setEmail("");
    setCategory(CATEGORIES[0]);
    setRequest("");
    setConfidential(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || !request.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      await onSubmit?.({
        name: name.trim(),
        email: email.trim(),
        category,
        request: request.trim(),
        confidential,
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={handleClose}
      title={submitted ? "Request received" : "Share a Prayer Request"}
      description={
        submitted
          ? "Thank you for trusting us with this. We’ll be praying for you."
          : "Share as much or as little as you’d like."
      }
    >
      {submitted ? (
        <button
          type="button"
          onClick={handleClose}
          className={MODAL_PRIMARY_BUTTON}
        >
          Close
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ModalField label="Name" hint="(optional)" htmlFor={`${id}-name`}>
              <input
                id={`${id}-name`}
                type="text"
                autoComplete="name"
                placeholder="Leave blank to stay anonymous"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={MODAL_INPUT}
              />
            </ModalField>

            <ModalField
              label="Email"
              hint="(for a reply)"
              htmlFor={`${id}-email`}
            >
              <input
                id={`${id}-email`}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={MODAL_INPUT}
              />
            </ModalField>
          </div>

          <ModalField label="Category" htmlFor={`${id}-category`}>
            <select
              id={`${id}-category`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={MODAL_INPUT}
            >
              {CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </ModalField>

          <ModalField
            label="How can we pray for you?"
            htmlFor={`${id}-request`}
          >
            <textarea
              id={`${id}-request`}
              rows={5}
              required
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              className={`${MODAL_INPUT} resize-none`}
            />
          </ModalField>

          <ModalToggle
            label="Keep this request confidential"
            checked={confidential}
            onChange={setConfidential}
          />

          {error && (
            <p role="alert" className="text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={MODAL_PRIMARY_BUTTON}
          >
            <span>{submitting ? "Sending…" : "Submit request"}</span>
          </button>
        </form>
      )}
    </ModalShell>
  );
}
