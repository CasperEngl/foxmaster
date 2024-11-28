"use client";

import type { PayloadAdminBarProps } from "payload-admin-bar";

import { cn } from "@/utilities/cn";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { PayloadAdminBar } from "payload-admin-bar";
import { useState } from "react";

import "./index.scss";

import { getClientSideURL } from "@/utilities/getURL";

const baseClass = "admin-bar";

const collectionLabels = {
  pages: {
    plural: "Pages",
    singular: "Page",
  },
  posts: {
    plural: "Posts",
    singular: "Post",
  },
  projects: {
    plural: "Projects",
    singular: "Project",
  },
};

export function AdminBar(props: { adminBarProps?: PayloadAdminBarProps }) {
  const { adminBarProps } = props || {};
  const segments = useSelectedLayoutSegments() as Array<
    keyof typeof collectionLabels
  >;
  const [show, setShow] = useState(false);
  const collection = collectionLabels[segments?.[1]] ? segments?.[1] : "pages";
  const router = useRouter();

  return (
    <div
      className={cn(baseClass, "bg-black py-2 text-white", {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: "font-medium text-white",
            logo: "text-white",
            user: "text-white",
          }}
          cmsURL={getClientSideURL()}
          collection={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || "Pages",
            singular: collectionLabels[collection]?.singular || "Page",
          }}
          logo={<span>Dashboard</span>}
          onAuthChange={(user) => {
            setShow(!!user?.id);
          }}
          onPreviewExit={() => {
            fetch("/next/exit-preview").then(() => {
              router.push("/");
              router.refresh();
            });
          }}
          style={{
            backgroundColor: "transparent",
            padding: 0,
            position: "relative",
            zIndex: "unset",
          }}
        />
      </div>
    </div>
  );
}
