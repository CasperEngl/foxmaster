"use client";

import { toast } from "@payloadcms/ui";
import { useMutation } from "@tanstack/react-query";
import { Fragment } from "react";

import "./index.scss";

function SuccessMessage() {
  return (
    <div>
      Database seeded! You can now{" "}
      <a target="_blank" href="/">
        visit your website
      </a>
    </div>
  );
}

export function SeedButton() {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/next/seed", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("An error occurred while seeding.");
      }

      return true;
    },
    onMutate: () => {
      toast.info("Seeding with data....");
    },
    onSuccess: () => {
      toast.success(<SuccessMessage />);
    },
    onError: (error: Error) => {
      toast.error(`An error occurred: ${error.message}`);
    },
  });

  let message = "";
  if (mutation.isPending) message = " (seeding...)";
  if (mutation.isSuccess) message = " (done!)";
  if (mutation.isError) message = ` (error: ${mutation.error?.message})`;

  return (
    <Fragment>
      <button
        className="seedButton"
        onClick={(event) => {
          if (mutation.isPending) {
            toast.info("Seeding already in progress.");
          } else if (mutation.isSuccess) {
            toast.info("Database already seeded.");
          } else {
            mutation.mutate();
          }
        }}
      >
        Seed your database
      </button>
      {message}
    </Fragment>
  );
}
