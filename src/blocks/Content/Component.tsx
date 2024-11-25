import RichText from "@/components/RichText";
import { AlertTriangle, Check, Info, Star } from "lucide-react";
import React from "react";

import type { ContentBlock as ContentBlockProps } from "@/payload-types";

import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { cn } from "@/utilities/cn";

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, background } = props;

  const colsSpanClasses = {
    full: "lg:col-span-12",
    half: "lg:col-span-6",
    oneThird: "lg:col-span-4",
    twoThirds: "lg:col-span-8",
  };

  const backgroundClasses = {
    default: "bg-white dark:bg-gray-800",
    dark: "bg-gray-800 dark:bg-gray-900",
  };

  return (
    <div
      data-theme={background}
      className={cn("w-full", background ? backgroundClasses[background] : "")}
    >
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { size, richText, testimonials } = col;

              return (
                <div
                  className={cn(
                    `col-span-4`,
                    size ? colsSpanClasses[size] : null,
                    {
                      "md:col-span-2": size !== "full",
                    },
                  )}
                  key={index}
                >
                  {richText ? (
                    <RichText
                      key={col.id}
                      content={richText}
                      enableGutter={false}
                    />
                  ) : null}

                  {testimonials ? (
                    <TestimonialCarousel testimonials={testimonials} />
                  ) : null}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
