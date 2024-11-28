const defaultLabels = {
  plural: "Docs",
  singular: "Doc",
};

const defaultCollectionLabels = {
  posts: {
    plural: "Posts",
    singular: "Post",
  },
} as const;

export function PageRange({
  className,
  collection = "posts",
  collectionLabels: collectionLabelsFromProps,
  currentPage,
  limit,
  totalDocs,
}: {
  className?: string;
  collection?: "posts";
  collectionLabels?: {
    plural?: string;
    singular?: string;
  };
  currentPage?: number;
  limit?: number;
  totalDocs?: number;
}) {
  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1;
  if (totalDocs && indexStart > totalDocs) indexStart = 0;

  let indexEnd = (currentPage || 1) * (limit || 1);
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs;

  const { plural, singular } =
    collectionLabelsFromProps ||
    defaultCollectionLabels[collection] ||
    defaultLabels ||
    {};

  return (
    <div className={[className, "font-semibold"].filter(Boolean).join(" ")}>
      {(typeof totalDocs === "undefined" || totalDocs === 0) &&
        "Search produced no results."}
      {typeof totalDocs !== "undefined" &&
        totalDocs > 0 &&
        `Showing ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ""} of ${totalDocs} ${totalDocs > 1 ? plural : singular}`}
    </div>
  );
}
