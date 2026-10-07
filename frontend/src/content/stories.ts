export interface AmoStory {
  id: string;
  title: string;
  quote: string;
  duration: string;
  placeholder: string;
}

export const STORIES: AmoStory[] = [
  { id: "long-distance", title: "Long Distance", quote: "Two cities. One 7pm.", duration: "0:48", placeholder: "/public/videos/amo-story-long-distance-placeholder.mp4" },
  { id: "amo-now", title: "AMO NOW", quote: "Your ordinary Tuesday, meet mine.", duration: "0:32", placeholder: "/public/videos/amo-story-amo-now-placeholder.mp4" },
  { id: "flowers", title: "Flowers at the Supermarket", quote: "You don't need an occasion.", duration: "0:25", placeholder: "/public/videos/amo-story-flowers-placeholder.mp4" },
  { id: "not-hungry", title: "“I'm Not Hungry”", quote: "She was hungry.", duration: "0:41", placeholder: "/public/videos/amo-story-not-hungry-placeholder.mp4" },
  { id: "forgotten-plans", title: "Forgotten Plans", quote: "The reservation neither of you made.", duration: "0:37", placeholder: "/public/videos/amo-story-forgotten-plans-placeholder.mp4" },
  { id: "mood", title: "Mood Misunderstanding", quote: "“I'm fine.” (Narrator: she wasn't.)", duration: "0:44", placeholder: "/public/videos/amo-story-mood-placeholder.mp4" },
  { id: "tiny-surprise", title: "A Tiny Surprise", quote: "The smallest reminder creates the biggest moment.", duration: "0:29", placeholder: "/public/videos/amo-story-tiny-surprise-placeholder.mp4" },
  { id: "ordinary-tuesday", title: "Ordinary Tuesday", quote: "Tuesday can become a memory too.", duration: "0:36", placeholder: "/public/videos/amo-story-ordinary-tuesday-placeholder.mp4" },
];
