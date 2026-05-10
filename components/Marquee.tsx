import Image from "next/image";
import { MARQUEE_BRAND_ASSETS } from "@/components/marquee/marqueeBrandAssets";

function MarqueeRow() {
  return (
    <div className="flex shrink-0 items-center gap-12 sm:gap-14 md:gap-16 lg:gap-20">
      {MARQUEE_BRAND_ASSETS.map(({ id, alt, src }) => (
        <div
          key={id}
          className="flex h-11 w-28 shrink-0 items-center justify-center sm:h-12 sm:w-32 md:h-14 md:w-40 lg:h-16 lg:w-44"
        >
          <Image
            src={src}
            alt={alt}
            width={220}
            height={72}
            className="max-h-full w-full max-w-full object-contain object-center"
            unoptimized
            sizes="(max-width: 640px) 112px, (max-width: 1024px) 160px, 176px"
          />
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      className="border-t border-b border-[var(--color-line)] py-14 overflow-hidden sm:py-16 md:py-[4.5rem]"
      role="region"
      aria-label="Collaborating brands"
    >
      <div className="flex w-max animate-marquee">
        <MarqueeRow />
        <MarqueeRow />
      </div>
    </div>
  );
}
