import type { Field } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const testimonialFields: Field[] = [
  {
    name: "quote",
    type: "richText",
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ["h3"] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ];
      },
    }),
    label: "Quote",
    required: true,
  },
  {
    name: "author",
    type: "text",
    required: true,
  },
  {
    name: "role",
    type: "text",
  },
  {
    name: "image",
    type: "upload",
    relationTo: "media",
    required: true,
  },
];
