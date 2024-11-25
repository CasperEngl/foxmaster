import type { Block, Field } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

const testimonialFields: Field[] = [
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

export const Testimonials: Block = {
  slug: "testimonials",
  interfaceName: "TestimonialsBlock",
  fields: [
    {
      name: "testimonials",
      type: "array",
      minRows: 1,
      maxRows: 3,
      fields: testimonialFields,
      admin: {
        description:
          "Add up to 3 testimonials that will be displayed in a grid",
      },
    },
  ],
};
