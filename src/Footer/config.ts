import type { GlobalConfig } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { revalidateFooter } from "./hooks/revalidateFooter";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "contactInfo",
      label: "Contact Info",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({
              enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
            }),
            FixedToolbarFeature(),
          ];
        },
      }),
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
};
