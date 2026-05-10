"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

function GalleryImage({
  src,
  alt,
  aspectRatio,
  sizes,
  quality = 90,
}: {
  src: string;
  alt: string;
  aspectRatio: string;
  sizes: string;
  quality?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={revealVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative overflow-hidden will-change-transform"
      style={{ aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        className="object-cover"
      />
    </motion.div>
  );
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  // Pattern: full, two half, full, offset half
  const renderImages = () => {
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < images.length) {
      const remaining = images.length - i;

      if (i === 0 || remaining === 1) {
        // Full width
        elements.push(
          <GalleryImage
            key={i}
            src={images[i]}
            alt={`${title} image${i + 1}`}
            aspectRatio="16/9"
            sizes="(max-width: 768px) 100vw, min(1200px, calc(100vw - 96px))"
          />
        );
        i++;
      } else if (remaining >= 2 && i % 4 !== 3) {
        // Two half-width side by side
        elements.push(
          <div key={i} className="grid grid-cols-2 gap-3 md:gap-4">
            <GalleryImage
              src={images[i]}
              alt={`${title} image${i + 1}`}
              aspectRatio="4/3"
              sizes="(max-width: 768px) 50vw, 600px"
            />
            {images[i + 1] ? (
              <GalleryImage
                src={images[i + 1]}
                alt={`${title} image${i + 2}`}
                aspectRatio="4/3"
                sizes="(max-width: 768px) 50vw, 600px"
              />
            ) : (
              <div />
            )}
          </div>
        );
        i += 2;
      } else {
        // Offset right — half width aligned right
        elements.push(
          <div key={i} className="flex justify-end">
            <div className="w-full md:w-1/2">
              <GalleryImage
                src={images[i]}
                alt={`${title} image${i + 1}`}
                aspectRatio="4/3"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          </div>
        );
        i++;
      }
    }
    return elements;
  };

  return (
    <div className="flex flex-col gap-3 md:gap-4 mt-16 md:mt-24">
      {renderImages()}
    </div>
  );
}
