"use client";

import { useEffect, useMemo, useState } from "react";
import type { Header as HeaderType } from "@/payload-types";
import { CMSLink } from "@/components/Link";
import invariant from "invariant";

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = useMemo(() => header?.navItems || [], [header]);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    const sectionIds = navItems
      .map(({ link }) => link.url?.replace("#", ""))
      .filter(Boolean);
    const sections = sectionIds.map((id) => {
      invariant(id, "Section ID is required");

      return document.getElementById(id);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
          const mostVisibleSection = visibleSections.reduce((prev, current) => {
            return prev.intersectionRatio > current.intersectionRatio
              ? prev
              : current;
          });
          setActiveLink(`#${mostVisibleSection.target.id}`);
        }
      },
      { threshold: [0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
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
