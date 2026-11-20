export interface Ministry {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  leader: string;
  schedule: string;
  location: string;
  description: string;
  highlights: string[];
  image: string;
}

export const MINISTRIES: Ministry[] = [
  {
    id: "life-groups",
    number: "01",
    name: "Life Groups & House Churches",
    subtitle: "Table fellowship in local homes",
    leader: "David & Sarah Lin",
    schedule: "Tuesday & Wednesday evenings · 7:00 PM",
    location: "Homes across Metro & Suburbs",
    description:
      "The church in miniature. We gather weekly around real dinners, share life honestly, pray deeply for one another, and study scripture in conversational safety.",
    highlights: [
      "Shared meals every week",
      "Childcare support swaps",
      "Direct neighborhood outreach",
    ],
    image: "/images/bible_fellowship_overhead_1791859612527.jpg",
  },
  {
    id: "next-gen",
    number: "02",
    name: "NextGen Kids & Students",
    subtitle: "Faith for the rising generation",
    leader: "Pastor Hannah Vance",
    schedule: "Sundays at 10:00 AM & Friday Youths · 6:30 PM",
    location: "Kids Wing & Youth Center",
    description:
      "Safe, joyful, engaging environments where infants through high school seniors experience God’s love with background-checked leaders and creative lessons.",
    highlights: [
      "Secure check-in system",
      "Age-tailored small groups",
      "Annual summer youth camp",
    ],
    image: "/images/community_pastor_portrait_1791859611468.jpg",
  },
  {
    id: "city-care",
    number: "03",
    name: "City Care & Hope Pantry",
    subtitle: "Radical mercy for our city",
    leader: "Marcus Brody",
    schedule: "Every Saturday · 9:00 AM – 1:00 PM",
    location: "Downtown Center & Street Outreaches",
    description:
      "We distribute over 3,000 lbs of fresh groceries every weekend, supply transitional housing kits, and host free community dinners for unhoused neighbors.",
    highlights: [
      "Fresh produce pantry",
      "Hygiene kit distributions",
      "Winter coat drives",
    ],
    image: "/images/worship_service_gathering_1791859611494.jpg",
  },
  {
    id: "worship-arts",
    number: "04",
    name: "Worship Arts & Creative",
    subtitle: "Music, sound, and visual arts",
    leader: "Aaron Walker",
    schedule: "Thursday Rehearsals · 7:00 PM",
    location: "Main Sanctuary",
    description:
      "Musicians, vocalists, audio technicians, and cinematographers who lead our congregation into reverent, Christ-centered worship every week.",
    highlights: [
      "Original songwriting collective",
      "Audio/visual training academy",
      "Quarterly worship nights",
    ],
    image: "/images/hero_cathedral_light_1791859609961.jpg",
  },
  {
    id: "care-ministry",
    number: "05",
    name: "Care & Pastoral Counseling",
    subtitle: "Compassion in seasons of suffering",
    leader: "Dr. Rebecca Foster",
    schedule: "By appointment & Tuesday support circles",
    location: "Pastoral Counseling Suite",
    description:
      "Confidential pastoral care, grief recovery, marriage mentoring, and crisis prayer support. You do not have to carry heavy burdens alone.",
    highlights: [
      "Licensed pastoral counseling",
      "Grief recovery groups",
      "Pre-marital guidance",
    ],
    image: "/images/community_pastor_portrait_1791859611468.jpg",
  },
  {
    id: "men-women",
    number: "06",
    name: "Men & Women Discipleship",
    subtitle: "Quarterly breakfasts & scripture intensives",
    leader: "Pastoral Team",
    schedule: "Monthly Saturday Intensives · 8:00 AM",
    location: "Fellowship Hall",
    description:
      "Intentional spiritual formation groups designed to sharpen character, forge deep brothers and sisters in Christ, and cultivate godly purpose.",
    highlights: [
      "Annual wilderness retreats",
      "Theological reading circles",
      "Mentorship matching",
    ],
    image: "/images/bible_fellowship_overhead_1791859612527.jpg",
  },
];
