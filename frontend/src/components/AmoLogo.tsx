// The real AMO logo (user-provided), recolored for the dark site:
// "am" in warm bone, the heart-"o" in AMO crimson. The PNGs in /public are
// alpha masks derived from the original artwork; CSS mask paints them any color.
const LOGO_SRC = "/amo-logo.png";
const HEART_SRC = "/amo-heart.png";
const LOGO_ASPECT = 500 / 128; // width / height of the cropped wordmark
const HEART_ASPECT = 127 / 113;
const HEART_START = 70; // % across the wordmark where the heart begins

function Masked({ src, aspect, color, clip, size }: { src: string; aspect: number; color: string; clip?: string; size: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block"
      style={{
        width: size * aspect,
        height: size,
        backgroundColor: color,
        clipPath: clip,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

export function AmoMark({ size = 28 }: { size?: number }) {
  return <Masked src={HEART_SRC} aspect={HEART_ASPECT} color="#E63B48" size={size} />;
}

export function AmoWordmark({ size = 28 }: { size?: number }) {
  return (
    <span
      data-testid="amo-wordmark"
      role="img"
      aria-label="AMO"
      className="relative inline-block align-middle"
      style={{ width: size * LOGO_ASPECT, height: size }}
    >
      <span className="absolute inset-0">
        <Masked src={LOGO_SRC} aspect={LOGO_ASPECT} color="#F5F3EF" clip={`inset(0 ${100 - HEART_START}% 0 0)`} size={size} />
      </span>
      <span className="absolute inset-0">
        <Masked src={LOGO_SRC} aspect={LOGO_ASPECT} color="#E63B48" clip={`inset(0 0 0 ${HEART_START}%)`} size={size} />
      </span>
    </span>
  );
}
