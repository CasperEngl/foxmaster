"use client";

import { CMSLink } from "@/components/Link";
import type { Header as HeaderType } from "@/payload-types";
import invariant from "invariant";
import { useEffect, useMemo, useState } from "react";

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = useMemo(() => header?.navItems || [], [header]);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    const sectionElements = navItems
      .map(({ link }) => {
        invariant(link.url, "Section URL is required");

        const id = link.url.replace("#", "");

        return document.getElementById(id);
      })
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);

        if (visibleSections.length > 0) {
          const mostVisibleSection = visibleSections.reduce((prev, current) => {
            const isPrevMoreVisible =
              prev.intersectionRatio > current.intersectionRatio;

            return isPrevMoreVisible ? prev : current;
          });

          setActiveLink(`#${mostVisibleSection.target.id}`);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      },
    );

    for (const section of sectionElements) {
      if (section) observer.observe(section);
    }

    return () => {
      for (const section of sectionElements) {
        if (section) observer.unobserve(section);
      }
    };
  }, [navItems]);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
      {navItems.map(({ link }, i) => {
        const isActive = activeLink === link.url;

        return (
          <CMSLink key={i} {...link} appearance="link" data-active={isActive} />
        );
      })}
    </nav>
  );
};
