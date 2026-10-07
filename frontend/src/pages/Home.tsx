import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/Marquee";
import { FallingInLove } from "@/components/home/FallingInLove";
import { Research } from "@/components/home/Research";
import { Verbs } from "@/components/home/Verbs";
import { WhyAmo } from "@/components/home/WhyAmo";
import { PhoneScene } from "@/components/home/PhoneScene";
import { Engine } from "@/components/home/Engine";
import { ExploreTeaser } from "@/components/home/ExploreTeaser";
import { HomeStories } from "@/components/home/HomeStories";
import { JournalCommunity, ReviewsWall } from "@/components/home/JournalCommunity";
import { Finale } from "@/components/home/Finale";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#get-amo") {
      const t = setTimeout(() => document.getElementById("get-amo")?.scrollIntoView({ behavior: "smooth" }), 150);
      return () => clearTimeout(t);
    }
  }, [location.hash]);

  return (
    <div data-testid="home-page">
      <Hero />
      <Marquee />
      <FallingInLove />
      <Research />
      <Verbs />
      <WhyAmo />
      <PhoneScene />
      <Engine />
      <ExploreTeaser />
      <HomeStories />
      <JournalCommunity />
      <ReviewsWall />
      <Finale />
    </div>
  );
}
