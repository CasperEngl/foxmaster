import RichText from "@/components/RichText";
import clsx from "clsx";

import type { Post } from "@/payload-types";

import { Card } from "../../../../components/Card";

export type RelatedPostsProps = {
  className?: string;
  docs?: Post[];
  introContent?: any;
};

export function RelatedPosts({
  className,
  docs,
  introContent,
}: RelatedPostsProps) {
  return (
    <div className={clsx("container", className)}>
      {introContent && <RichText content={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-8">
        {docs?.map((doc, index) => {
          if (typeof doc === "string") return null;

          return (
            <Card key={index} doc={doc} relationTo="posts" showCategories />
          );
        })}
      </div>
    </div>
  );
}
