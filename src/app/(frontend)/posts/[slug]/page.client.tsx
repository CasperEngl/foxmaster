"use client";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import { Fragment, useEffect } from "react";

function PageClient() {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("dark");
  }, [setHeaderTheme]);
  return <Fragment />;
}

export default PageClient;
