import RichText from "@/components/RichText";
import { match, P } from "ts-pattern";
import { AlertTriangle, Check, Info, Star } from "lucide-react";
import React from "react";

import type { ContentBlock as ContentBlockProps } from "@/payload-types";

import { cn } from "@/utilities/cn";
import { CMSLink } from "../../components/Link";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, background } = props;

  const colsSpanClasses = {
    full: "12",
    half: "6",
    oneThird: "4",
    twoThirds: "8",
  };

  const iconMap = {
    none: null,
    star: <Star className="mb-4 h-6 w-6" />,
    check: <Check className="mb-4 h-6 w-6" />,
    info: <Info className="mb-4 h-6 w-6" />,
    warning: <AlertTriangle className="mb-4 h-6 w-6" />,
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
              const { size, content } = col;

              return (
                <div
                  className={cn(
                    `col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                    {
                      "md:col-span-2": size !== "full",
                    },
                  )}
                  key={index}
                >
                  {content?.map((item, idx) => {
                    return match(item)
                      .with(
                        {
                          richText: P.select("richText"),
                        },
                        ({ richText }) => (
                          <RichText
                            key={item.id}
                            content={richText}
                            enableGutter={false}
                          />
                        ),
                      )
                      .with(
                        {
                          testimonial: P.select("testimonials"),
                        },
                        ({ testimonials }) => (
                          <TestimonialCarousel testimonials={testimonials} />
                        ),
                      )
                      .exhaustive();
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
