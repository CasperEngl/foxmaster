"use client";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import { useEffect } from "react";

import type { Page } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";

export function HighImpactHero({ links, media, richText }: Page["hero"]) {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("dark");
  });

  return (
    <div
      id="hero"
      className="relative -mt-48 flex min-h-[100vh] items-center justify-center text-white sm:-mt-[10.125rem]"
      data-theme="dark"
    >
      <div className="container">
        <div className="max-w-prose text-pretty">
          {richText && (
            <RichText
              className="mb-6"
              content={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} size="glassmorphic" />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === "object" && (
          <Media
            fill
            imgClassName="-z-10 object-cover"
            priority={false}
            loading="lazy"
            resource={media}
          />
        )}
      </div>
    </div>
  );
}
