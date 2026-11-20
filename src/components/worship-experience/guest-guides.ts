export type GuestGuideKey = "coffee" | "worship" | "kids" | "parking";

export const GUEST_GUIDES: Record<
  GuestGuideKey,
  {
    number: string;
    tabLabel: string;
    title: string;
    note: string;
    description: string;
  }
> = {
  coffee: {
    number: "01",
    tabLabel: "Welcome Coffee",
    title: "Warm Welcome & Specialty Coffee",
    note: "Foyer opens 30 minutes prior",
    description:
      "Our hospitality team greets you at the glass doors. Complimentary single-origin drip coffee and tea are served in the sunlit gathering foyer 30 minutes before each gathering.",
  },
  worship: {
    number: "02",
    tabLabel: "The Gathering",
    title: "Christ-Centered Modern & Liturgical Worship",
    note: "75 minutes · Weekly communion",
    description:
      "Services last approximately 75 minutes. We sing authentic gospel truths, take communion weekly, and listen to expository scripture teaching that relates to daily life.",
  },
  kids: {
    number: "03",
    tabLabel: "Kids Check-In",
    title: "Secure & Joyful Kids Ministry",
    note: "Nursery through 5th grade",
    description:
      "Children from nursery to 5th grade have a safe, clean, and vibrant space with background-checked volunteers and automated SMS paging.",
  },
  parking: {
    number: "04",
    tabLabel: "Arrival & Parking",
    title: "Easy Reserved Guest Parking",
    note: "KICC",
    description:
      "Designated guest parking spaces are located immediately adjacent to the main campus entrance on Cathedral Way, with volunteers ready to guide you.",
  },
};
