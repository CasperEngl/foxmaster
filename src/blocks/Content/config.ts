import type { Block, Field } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { Testimonials } from "@/blocks/Testimonials/config";

// Add icon options
const iconOptions = [
  {
    label: "None",
    value: "none",
  },
  {
    label: "Star",
    value: "star",
  },
  {
    label: "Check",
    value: "check",
  },
  {
    label: "Info",
    value: "info",
  },
  {
    label: "Warning",
    value: "warning",
  },
];

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
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ];
      },
    }),
    label: false,
    admin: {
      condition: (_, siblingData) => {
        console.log("rich text data", siblingData);
        return siblingData.contentType === "richText";
      },
    },
  },
  {
    name: "testimonials",
    type: "blocks",
    blocks: [Testimonials],
    admin: {
      condition: (_, siblingData) => {
        console.log("testimonials data", siblingData);
        return siblingData.contentType === "testimonials";
      },
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
