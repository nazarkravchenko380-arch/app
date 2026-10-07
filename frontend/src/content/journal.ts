export interface JournalArticle {
  slug: string;
  title: string;
  category: "PRODUCT" | "BUILDING AMO" | "IDEAS" | "RESEARCH" | "STORIES" | "BEHIND AMO" | "UPDATES";
  date: string;
  author: string;
  excerpt: string;
  minutes: number;
  body: string[];
}

export const ARTICLES: JournalArticle[] = [
  {
    slug: "why-we-built-amo",
    title: "Why we built AMO",
    category: "PRODUCT",
    date: "2026-07-01",
    author: "Team AMO",
    excerpt: "Not because something is wrong. Because something matters.",
    minutes: 4,
    body: [
      "At first, attention happens almost automatically. You notice everything — their laugh, the stupid joke they repeat, the restaurant they mentioned three weeks ago. You ask questions because there is still so much you don't know.",
      "Then life gets louder. Work, routine, notifications, responsibilities. The person doesn't become less interesting. We simply become familiar.",
      "AMO exists to make familiarity curious again. Not to fix anything — there is nothing to fix. There is always more to discover about the person you chose.",
      "Love is not about remembering everything. It is about caring enough to notice. AMO is the infrastructure around that noticing: one place for the little things that make a relationship feel big.",
    ],
  },
  {
    slug: "the-science-of-attention",
    title: "The science behind attention",
    category: "RESEARCH",
    date: "2026-06-24",
    author: "Team AMO",
    excerpt: "What Italian researchers actually found — and what they didn't.",
    minutes: 5,
    body: [
      "Italian researchers studying people who had recently fallen in love found measurable biological differences associated with early-stage romantic love — elevated levels of a protein linked to the intensity of that first stage.",
      "When some participants were examined again roughly 12–24 months later, many were still with the same partner. But the biological marker had returned toward ordinary levels.",
      "Read that carefully. The relationship remained. The beginning had changed. This is not 'love expires after two years' — it is the observation that the automatic intensity of the early stage transforms into something else.",
      "We think what it transforms into is a choice. At first, attention is something that happens to us. Later, attention is something we decide. That decision — repeated, ordinary, deliberate — is the most interesting part of a long relationship.",
      "Reference: Emanuele et al., 'Raised plasma nerve growth factor levels associated with early-stage romantic love', Psychoneuroendocrinology (2006).",
    ],
  },
  {
    slug: "building-amo-01",
    title: "Building AMO #01",
    category: "BUILDING AMO",
    date: "2026-06-10",
    author: "Team AMO",
    excerpt: "A living development journal. This is where we show our work.",
    minutes: 3,
    body: [
      "This journal is not corporate news. It's a record of building something for real relationships — the decisions, the dead ends, the small victories.",
      "This month: the recommendation loop got its first memory. AMO now avoids repeating a suggestion you dismissed, and weighs completed ideas higher than saved ones.",
      "Next: AMO NOW history, and the weekly recap. We're designing the recap to feel like a letter, not a report.",
      "If you want to shape what we build next, the community board is open. Real relationships should shape a product built for real relationships.",
    ],
  },
  {
    slug: "why-we-created-signals",
    title: "Why we created Signals",
    category: "PRODUCT",
    date: "2026-05-28",
    author: "Team AMO",
    excerpt: "Sometimes a conversation starts with two words.",
    minutes: 3,
    body: [
      "Most hard conversations don't start hard. They start with something small that was never said: I'm tired. I miss you. I need a little attention today.",
      "Signals are two-word messages with weight. Thinking about you. Can we talk? Need some space. They are not a chat replacement — they're a door left open.",
      "We designed them to be tactile and lightweight, because intimacy is usually lightweight. Sometimes 'thinking about you' is enough.",
    ],
  },
  {
    slug: "inside-amo-now",
    title: "Inside AMO NOW",
    category: "BEHIND AMO",
    date: "2026-05-12",
    author: "Team AMO",
    excerpt: "Two places. One moment. How the reveal works.",
    minutes: 4,
    body: [
      "AMO NOW gives both partners a short window to capture their moment — wherever they are, whatever they're doing. Your photo stays private until both of you participate.",
      "Then comes the reveal: two ordinary moments, side by side, becoming one shared moment. A desk in one city, a sunset in another. The mundane made mutual.",
      "We built in history, a weekly recap, and a 1080×1920 story export — but the core is emotional, not technical. It's a reason to notice your own ordinary Tuesday, because someone you love is noticing theirs.",
    ],
  },
  {
    slug: "how-recommendations-learn",
    title: "How recommendations learn",
    category: "IDEAS",
    date: "2026-04-30",
    author: "Team AMO",
    excerpt: "A relationship decision engine — explained without the jargon.",
    minutes: 4,
    body: [
      "AMO combines who you are, what you both like, what you've done, what you want to do, how you feel, and what's happening now — to answer one question: what could we do next?",
      "Every save, dismiss, completion and reaction teaches the loop. Dismissed ideas fade; completed ones echo. Context matters: a rainy Tuesday suggests something different than a free Saturday.",
      "The goal is never to understand love for you. It's to help you understand each other better — and then get out of the way.",
    ],
  },
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
