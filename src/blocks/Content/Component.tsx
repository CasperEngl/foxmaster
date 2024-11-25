import RichText from "@/components/RichText";
import { AlertTriangle, Check, Info, Star } from "lucide-react";
import React from "react";

import type { ContentBlock as ContentBlockProps } from "@/payload-types";

import { cn } from "@/utilities/cn";
import { CMSLink } from "../../components/Link";

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props;

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

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size, icon } = col;

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
                {icon && icon !== "none" && iconMap[icon]}

                {richText && (
                  <RichText content={richText} enableGutter={false} />
                )}

                {enableLink && <CMSLink {...link} />}
              </div>
            );
          })}
      </div>
    </div>
  );
};
