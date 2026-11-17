"use client";

import React, { useId, useState } from "react";
import {
  MODAL_INPUT,
  MODAL_PRIMARY_BUTTON,
  ModalField,
  ModalShell,
  ModalToggle,
} from "../modal-shell/modal-shell";

export interface PlanVisitData {
  name: string;
  email: string;
  serviceTime: string;
  guests: string;
  hasKids: boolean;
  notes: string;
}

interface PlanVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: PlanVisitData) => Promise<void> | void;
}

const SERVICE_TIMES = ["9:00 AM", "11:00 AM"];

const GUEST_OPTIONS = [
  { value: "1", label: "1 person" },
  { value: "2", label: "2 people" },
  { value: "3-4", label: "3–4 people" },
  { value: "5+", label: "5 or more" },
];

export function PlanVisitModal({
  isOpen,
  onClose,
  onSubmit,
}: PlanVisitModalProps) {
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [serviceTime, setServiceTime] = useState(SERVICE_TIMES[1]);
  const [guests, setGuests] = useState("2");
  const [hasKids, setHasKids] = useState(false);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    onClose();
    if (!submitted) return;
    setSubmitted(false);
    setName("");
    setEmail("");
    setGuests("2");
    setHasKids(false);
    setNotes("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await onSubmit?.({
        name: name.trim(),
        email: email.trim(),
        serviceTime,
        guests,
        hasKids,
        notes: notes.trim(),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const firstName = name.trim().split(" ")[0];

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={handleClose}
      title={submitted ? "You’re all set" : "Plan Your Sunday Visit"}
      description={
        submitted
          ? `Thanks${firstName ? `, ${firstName}` : ""}. We look forward to seeing you at the ${serviceTime} service.`
          : "Tell us when you’re coming and we’ll be ready to welcome you."
      }
    >
      {submitted ? (
        <button
          type="button"
          onClick={handleClose}
          className={MODAL_PRIMARY_BUTTON}
        >
          Done
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <ModalField label="Full name" htmlFor={`${id}-name`}>
            <input
              id={`${id}-name`}
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={MODAL_INPUT}
            />
          </ModalField>

          <ModalField label="Email" htmlFor={`${id}-email`}>
            <input
              id={`${id}-email`}
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={MODAL_INPUT}
            />
          </ModalField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ModalField label="Service time" htmlFor={`${id}-time`}>
              <select
                id={`${id}-time`}
                value={serviceTime}
                onChange={(e) => setServiceTime(e.target.value)}
                className={MODAL_INPUT}
              >
                {SERVICE_TIMES.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </ModalField>

            <ModalField label="Guests" htmlFor={`${id}-guests`}>
              <select
                id={`${id}-guests`}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className={MODAL_INPUT}
              >
                {GUEST_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </ModalField>
          </div>

          <ModalToggle
            label="Bringing children?"
            checked={hasKids}
            onChange={setHasKids}
          />

          <ModalField
            label="Questions or special needs"
            hint="(optional)"
            htmlFor={`${id}-notes`}
          >
            <textarea
              id={`${id}-notes`}
              rows={3}
              placeholder="Wheelchair access, interpretation, anything else"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`${MODAL_INPUT} resize-none`}
            />
          </ModalField>

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
            {submitting ? "Sending…" : "Confirm visit"}
          </button>
        </form>
      )}
    </ModalShell>
  );
}
