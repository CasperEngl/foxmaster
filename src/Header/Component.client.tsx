"use client";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import type { Header } from "@/payload-types";

import { Logo } from "@/components/Logo/Logo";
import { HeaderNav } from "./Nav";
import { cn } from "@/utilities/cn";

interface HeaderClientProps {
  header: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  const [theme, setTheme] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  useEffect(() => {
    setHeaderTheme(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-20 transition duration-300 data-[is-scrolled=true]:bg-gray-800/75 data-[is-scrolled=true]:backdrop-blur-[20px] data-[is-scrolled=true]:backdrop-saturate-[180%]"
      data-is-scrolled={isScrolled}
      {...(theme ? { "data-theme": theme } : {})}
    >
      <div className="container flex flex-col items-center gap-y-2 py-8 sm:flex-row sm:justify-between">
        <Link href="/">
          <Logo
            loading="eager"
            priority="high"
            className="invert dark:invert-0"
          />
        </Link>
        <HeaderNav header={header} />
      </div>
    </header>
  );
};
