import type { Block, Field } from "payload";

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { FormBlock } from "@/blocks/Form/config";
import { TestimonialsBlock } from "@/blocks/TestimonialsBlock/config";

// Add background options
const backgroundOptions = [
  {
    label: "Default",
    value: "default",
  },
  {
    label: "Dark",
    value: "dark",
  },
];

const columnFields: Field[] = [
  {
    name: "size",
    type: "select",
    defaultValue: "oneThird",
    options: [
      {
        label: "One Third",
        value: "oneThird",
      },
      {
        label: "Half",
        value: "half",
      },
      {
        label: "Two Thirds",
        value: "twoThirds",
      },
      {
        label: "Full",
        value: "full",
      },
    ],
  },
  {
    name: "contentType",
    type: "select",
    options: [
      {
        label: "Rich Text",
        value: "richText",
      },
      {
        label: "Testimonials",
        value: "testimonials",
      },
    ],
    defaultValue: "richText",
  },
  {
    name: "richText",
    type: "richText",
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
          BlocksFeature({ blocks: [FormBlock, TestimonialsBlock] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ];
      },
    }),
    label: false,
    admin: {
      condition: (_, siblingData) => siblingData.contentType === "richText",
    },
  },
];

export const Content: Block = {
  slug: "content",
  interfaceName: "ContentBlock",
  fields: [
    {
      name: "background",
      type: "select",
      defaultValue: "default",
      options: backgroundOptions,
      admin: {
        description: "Choose a background style for this content block",
      },
    },
    {
      name: "columns",
      type: "array",
      fields: columnFields,
    },
  ],
};
