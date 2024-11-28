import { formatDateTime } from "src/utilities/formatDateTime";

import type { Post } from "@/payload-types";

import { Media } from "@/components/Media";
import { Fragment } from "react";

export function PostHero({ post }: { post: Post }) {
  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container relative z-10 pb-8 text-white lg:grid lg:grid-cols-[1fr_48rem_1fr]">
        <div className="col-span-1 col-start-1 md:col-span-2 md:col-start-2">
          <div className="mb-6 text-sm uppercase">
            {post.categories?.map((category, index) => {
              if (typeof category === "object" && category !== null) {
                const { title: categoryTitle } = category;

                const titleToUse = categoryTitle || "Untitled category";

                const isLast = index === (post.categories?.length ?? 0) - 1;

                return (
                  <Fragment key={index}>
                    {titleToUse}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                );
              }
              return null;
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-16">
            <div className="flex flex-col gap-4">
              {post.populatedAuthors && (
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>
                  {post.populatedAuthors.map((author, index) => {
                    const populatedAuthorsLength =
                      post.populatedAuthors?.length ?? 0;
                    const isLast = index === populatedAuthorsLength - 1;
                    const secondToLast = index === populatedAuthorsLength - 2;

                    return (
                      <Fragment key={index}>
                        {author.name}
                        {secondToLast && populatedAuthorsLength > 2 && (
                          <Fragment>, </Fragment>
                        )}
                        {secondToLast && populatedAuthorsLength === 2 && (
                          <Fragment> </Fragment>
                        )}
                        {!isLast && populatedAuthorsLength > 1 && (
                          <Fragment>and </Fragment>
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              )}
            </div>
            {post.publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={post.publishedAt}>
                  {formatDateTime(post.publishedAt)}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {post.meta?.image && typeof post.meta.image !== "string" && (
          <Media
            fill
            imgClassName="-z-10 object-cover"
            resource={post.meta.image}
          />
        )}
        <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  );
}
