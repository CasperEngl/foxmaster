import { getCachedGlobal } from "@/utilities/getGlobals";
import Link from "next/link";
import React from "react";

import type { Footer } from "@/payload-types";

import { ThemeSelector } from "@/providers/Theme/ThemeSelector";
import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";
import RichText from "@/components/RichText";

export async function Footer() {
  const footer: Footer = await getCachedGlobal("footer", 1)();

  return (
    <footer className="bg-black text-white">
      <div className="container flex flex-col items-start gap-4 py-8">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        {footer?.contactInfo ? (
          <RichText
            content={footer?.contactInfo}
            enableProse={false}
            enableGutter={false}
          />
        ) : null}

        <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center">
          <ThemeSelector />
        </div>
      </div>
    </footer>
  );
}
