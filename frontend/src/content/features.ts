export type FeatureGroup = "understand" | "discover" | "experience" | "remember" | "dream";

export interface Feature {
  id: string;
  name: string;
  group: FeatureGroup | "core";
  tagline: string;
  description: string;
}

export const GROUPS: { id: FeatureGroup; label: string; line: string }[] = [
  { id: "understand", label: "Understand", line: "Attention begins with noticing how they feel." },
  { id: "discover", label: "Discover", line: "There is always another place to go." },
  { id: "experience", label: "Experience", line: "Tuesday can become a memory too." },
  { id: "remember", label: "Remember", line: "Remember less. Care more." },
  { id: "dream", label: "Dream", line: "Someday needs a place to live." },
];

export const FEATURES: Feature[] = [
  {
    id: "moods",
    name: "MOODS",
    group: "understand",
    tagline: "Sometimes “I'm okay” isn't the whole answer.",
    description:
      "Partners can voluntarily share a temporary mood — for a few hours, not forever. AMO uses it to make the next suggestion a little more thoughtful. Never surveillance, never diagnosis. Just context, offered freely.",
  },
  {
    id: "signals",
    name: "SIGNALS",
    group: "understand",
    tagline: "Sometimes a conversation starts with two words.",
    description:
      "Thinking about you. I miss you. Need attention. Can we talk? Need some space. Lightweight, intimate signals that say the small thing before the big thing.",
  },
  {
    id: "questions",
    name: "QUESTIONS",
    group: "understand",
    tagline: "There is always something left to discover.",
    description:
      "A growing library of questions — fun, unexpected, nostalgic, romantic, deep. You know their coffee order. What don't you know yet? The purpose is curiosity, not therapy.",
  },
  {
    id: "discover",
    name: "DISCOVER",
    group: "discover",
    tagline: "What should we do tonight?",
    description:
      "Personalised ideas for dates, restaurants, activities and tiny gestures. AMO learns from what you save, dismiss, complete and love — and avoids repeating itself. Not every date needs a reservation.",
  },
  {
    id: "recommendations",
    name: "RECOMMENDATIONS",
    group: "discover",
    tagline: "The next right small thing.",
    description:
      "Who you are + what you both like + what you've done + how you feel + what's happening now — answering one question: what could we do next?",
  },
  {
    id: "amo-now",
    name: "AMO NOW",
    group: "experience",
    tagline: "Two places. One moment.",
    description:
      "Both partners get a short window to capture their moment — wherever they are. Photos stay private until both participate. Then: reveal. Two ordinary moments become one shared one.",
  },
  {
    id: "trips",
    name: "TRIPS",
    group: "experience",
    tagline: "There is always another place to go.",
    description:
      "Discover destinations, save ideas, plan experiences — and connect every trip back to your shared timeline, with visited-country progress that grows as you do.",
  },
  {
    id: "our-story",
    name: "OUR STORY",
    group: "remember",
    tagline: "Your relationship shouldn't disappear into your camera roll.",
    description:
      "A living timeline: your beginning, important dates, completed ideas, trips, AMO NOW moments, photos and milestones. It grows richer the more you use AMO.",
  },
  {
    id: "important-dates",
    name: "IMPORTANT DATES",
    group: "remember",
    tagline: "Remember less. Care more.",
    description:
      "Anniversaries, birthdays, traditions, the dates only you two understand. AMO remembers so you have another opportunity to show that you care.",
  },
  {
    id: "memories",
    name: "MEMORIES",
    group: "remember",
    tagline: "You've taken thousands of photos together. How many became memories?",
    description:
      "Private shared memories connected to dates, trips and milestones — not another cloud gallery. The photo engine improves light and tone, never the memory itself.",
  },
  {
    id: "dreams",
    name: "DREAMS",
    group: "dream",
    tagline: "Someday needs a place to live.",
    description:
      "A shared wishlist for places, experiences, restaurants and things one of you mentioned once at 1am. Save it for someday — then let AMO help someday happen.",
  },
  {
    id: "private-space",
    name: "PRIVATE SPACE",
    group: "core",
    tagline: "Built for two. Only two.",
    description:
      "Everything in AMO exists for exactly two people. No feeds, no followers, no public performance. Your moments stay your moments.",
  },
];
