"use client";

import { ImageMedia } from "@/components/Media/ImageMedia";
import RichText from "@/components/RichText";
import type { TestimonialsBlock } from "@/payload-types";
import { cn } from "@/utilities/cn";
import React, { useEffect, useState, useCallback } from "react";

type TestimonialCarouselProps = {
  testimonials: TestimonialsBlock["testimonials"];
};

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials = [],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const update = useCallback(
    (index?: number) => {
      if (typeof index === "number") {
        setCurrentIndex(index);
      } else {
        setCurrentIndex((current) =>
          current === (testimonials?.length ?? 0) - 1 ? 0 : current + 1,
        );
      }
    },
    [testimonials?.length],
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        update();
      }, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isPaused, update]);

  if (!testimonials?.length) return null;

  return (
    <section
      className="relative flex flex-wrap"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {testimonials.map((testimonial, index) => {
        const { quote, author, role, image } = testimonial;
        const isActive = currentIndex === index;

        return (
          <article
            key={index}
            className={cn("w-full transition duration-300", {
              hidden: !isActive,
            })}
          >
            <div className="flex flex-wrap justify-center md:justify-start">
              <div className="flex w-full flex-col-reverse flex-wrap md:w-3/4 md:flex-col">
                {quote && (
                  <blockquote className="relative mt-8 text-xl md:mt-4">
                    <QuoteIcon />
                    <div className="mb-6 mt-2">
                      <RichText content={quote} />
                    </div>
                  </blockquote>
                )}

                <div className="grid grid-cols-4 items-center justify-center md:justify-start">
                  {image && (
                    <div className="col-span-1">
                      <figure className="relative mb-4 ml-2 sm:ml-4 md:ml-6">
                        <div className="absolute left-0 top-0 z-0 -ml-2 -mt-2 aspect-square h-full w-full bg-gray-800 sm:-ml-4 sm:-mt-4 md:-ml-6 md:-mt-6" />
                        <div className="absolute z-10">
                          <ImageMedia resource={image} priority={false} />
                        </div>
                        <div className="absolute bottom-0 right-0 z-0 -mb-2 -mr-2 aspect-square h-full w-full bg-primary sm:-mb-4 sm:-mr-4 md:-mb-6 md:-mr-6" />
                      </figure>
                    </div>
                  )}
                  <div className="col-span-3">
                    {author && (
                      <h4 className="mb-1 max-w-md truncate text-xl font-bold leading-none md:text-2xl">
                        {author}
                      </h4>
                    )}
                    {role && <p className="text-gray-500">{role}</p>}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex w-full justify-center md:justify-start">
                <div className="mt-2 flex w-2/3 gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      className="group relative mt-2 h-4 w-full md:mt-4 md:h-2"
                      onClick={() => update(i)}
                    >
                      <div className="h-full w-full bg-gray-200 transition-all duration-150 group-hover:opacity-75" />
                      {currentIndex === i && (
                        <div className="absolute top-0 h-full w-full origin-left bg-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </article>
        );
      })}
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
