import type { Block } from "payload";

export const AccordionBlock: Block = {
  slug: "accordion",
  interfaceName: "AccordionBlock",
  fields: [
    {
      name: "items",
      type: "array",
      label: "Accordion Items",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title",
          required: true,
        },
        {
          name: "content",
          type: "textarea",
          label: "Content",
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: "Accordions",
    singular: "Accordion",
  },
};
