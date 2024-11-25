"use client";

import { ImageMedia } from "@/components/Media/ImageMedia";
import RichText from "@/components/RichText";
import type { TestimonialsBlock } from "@/payload-types";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

type TestimonialCarouselProps = {
  testimonials: TestimonialsBlock["testimonials"];
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials = [],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout>(null);
  const SLIDE_DURATION = 5000; // 5 seconds
  const PROGRESS_INTERVAL = 50; // Update progress every 50ms

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const update = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      setProgress(0);
    },
    [currentIndex],
  );

  useEffect(() => {
    // Clear existing interval
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    // Start new progress interval
    progressInterval.current = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          const newProgress = prev + PROGRESS_INTERVAL / SLIDE_DURATION;
          if (newProgress >= 1) {
            const nextIndex = (currentIndex + 1) % (testimonials?.length ?? 0);
            update(nextIndex);
            return 0;
          }
          return newProgress;
        });
      }
    }, PROGRESS_INTERVAL);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentIndex, isPaused, testimonials?.length, update]);

  useEffect(() => {
    // Start with the first slide
    update(0);
  }, [update]);

  return (
    <section
      className="relative flex flex-wrap"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence initial={false} custom={direction}>
        {testimonials?.map((testimonial, index) => {
          const { quote, author, role, image } = testimonial;
          const isActive = currentIndex === index;

          if (!isActive) return null;

          return (
            <motion.article
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              // @ts-expect-error
              className="w-full"
            >
              <div className="flex flex-col items-center justify-center gap-x-16 md:grid md:grid-cols-4 md:grid-rows-1 md:justify-start">
                {image ? (
                  <figure className="relative w-3/4 md:col-span-1">
                    <div className="absolute -left-4 -top-4 z-0 aspect-square size-full bg-gray-800" />

                    <div className="relative z-10 [&_img]:w-full">
                      <ImageMedia resource={image} priority={false} />
                    </div>

                    <div className="absolute -bottom-4 -right-4 z-0 aspect-square size-full bg-primary" />
                  </figure>
                ) : null}
                <div className="md:col-span-3">
                  {quote ? (
                    <blockquote className="relative mt-8 text-xl md:mt-4">
                      <QuoteIcon />
                      <div className="mb-6 mt-2">
                        <RichText
                          content={quote}
                          enableGutter={false}
                          enableProse={false}
                        />
                      </div>
                    </blockquote>
                  ) : null}

                  {author ? (
                    <h4 className="mb-1 max-w-md truncate text-xl font-bold leading-none md:text-2xl">
                      {author}
                    </h4>
                  ) : null}
                  {role ? <p className="text-gray-500">{role}</p> : null}
                </div>
              </div>

              <div className="mt-4 grid w-full grid-cols-4 justify-center gap-x-16 md:justify-start">
                <div className="col-span-4 flex gap-2 md:col-span-3 md:col-start-2 md:w-2/3">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      className="group relative h-4 w-full md:h-2"
                      onClick={() => update(i)}
                    >
                      <div className="size-full bg-gray-200 transition-all duration-150 group-hover:opacity-75" />
                      {currentIndex === i && (
                        <div
                          className="absolute top-0 size-full origin-left bg-primary"
                          style={{
                            transform: `scaleX(${progress})`,
                            transformOrigin: "left center",
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </AnimatePresence>
    </section>
  );
};

const QuoteIcon = () => (
  <svg
    width="29"
    height="23"
    viewBox="0 0 29 23"
    fill="none"
    className="text-primary"
  >
    <path
      d="M0.432 -3.8147e-06V10.304L3.632 22.272H9.648L7.28 11.712H12.656V-3.8147e-06H0.432ZM16.304 -3.8147e-06V10.304L19.504 22.272H25.52L23.152 11.712H28.528V-3.8147e-06H16.304Z"
      fill="currentColor"
    />
  </svg>
);
