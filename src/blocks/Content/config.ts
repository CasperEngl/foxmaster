import type { Block, Field } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { link } from "@/fields/link";

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

const columnFields: Field[] = [
  {
    name: "icon",
    type: "select",
    defaultValue: "none",
    options: iconOptions,
    admin: {
      description: "Select an icon to display before the content",
    },
  },
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
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ];
      },
    }),
    label: false,
  },
  {
    name: "enableLink",
    type: "checkbox",
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
];

export const Content: Block = {
  slug: "content",
  interfaceName: "ContentBlock",
  fields: [
    {
      name: "columns",
      type: "array",
      fields: columnFields,
    },
  ],
};
