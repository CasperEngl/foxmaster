import type { Block, Field } from "payload";

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

export const TestimonialsBlock: Block = {
  slug: "testimonials",
  interfaceName: "TestimonialsBlock",
  fields: [
    {
      name: "testimonials",
      type: "array",
      fields: testimonialFields,
      admin: {
        description: "Add testimonials that will be displayed in a carousel",
      },
    },
  ],
};
