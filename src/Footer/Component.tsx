import { getCachedGlobal } from "@/utilities/getGlobals";
import Link from "next/link";

import type { Footer } from "@/payload-types";

import { Logo } from "@/components/Logo/Logo";
import RichText from "@/components/RichText";
import { ThemeSelector } from "@/providers/Theme/ThemeSelector";

export async function Footer() {
  const footer: Footer = await getCachedGlobal("footer", 1)();

  return (
    <footer className="bg-gray-950 text-white">
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
