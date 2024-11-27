import type { Block, Field } from "payload";

import { FormBlock } from "@/blocks/Form/config";
import { TestimonialsBlock } from "@/blocks/TestimonialsBlock/config";
import { AccordionBlock } from "@/blocks/Accordion/config";
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

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
    name: "richText",
    type: "richText",
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
          BlocksFeature({
            blocks: [FormBlock, TestimonialsBlock, AccordionBlock],
          }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ];
      },
    }),
    label: false,
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
