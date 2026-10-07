import { FallingInLove } from "@/components/home/FallingInLove";
import { Research } from "@/components/home/Research";
import { Verbs } from "@/components/home/Verbs";
import { Marquee } from "@/components/Marquee";
import { MaskLines, Reveal } from "@/components/Reveal";

export default function Philosophy() {
  return (
    <div data-testid="philosophy-page" className="pt-16">
      <div className="mx-auto max-w-4xl px-5 pt-24 sm:px-8">
        <MaskLines
          className="font-serif text-5xl leading-[1.05] text-bone sm:text-7xl"
          lines={["WHY AMO", <span key="p" className="italic text-crimson">EXISTS.</span>]}
        />
        <Reveal delay={0.25} className="mt-8 max-w-2xl text-lg leading-relaxed text-fog">
          <p>
            AMO exists not because something is wrong. AMO exists because something matters.
            <span className="text-bone"> There is always more to discover.</span>
          </p>
        </Reveal>
      </div>
      <FallingInLove />
      <Research />
      <Marquee />
      <Verbs />
      <div className="mx-auto max-w-4xl px-5 pb-40 pt-10 text-center sm:px-8">
        <MaskLines className="font-serif text-4xl leading-[1.12] text-bone sm:text-6xl" lines={["“I'M STILL", <span key="d" className="italic text-crimson">DISCOVERING YOU.”</span>]} />
        <Reveal delay={0.3}>
          <p className="mt-8 text-base text-fog">And that is the entire idea behind AMO.</p>
        </Reveal>
      </div>
    </div>
  );
}
