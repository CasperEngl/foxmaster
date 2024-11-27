import RichText from "@/components/RichText";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { AccordionBlock as AccordionBlockType } from "@/payload-types";

type AccordionBlockProps = {
  items: AccordionBlockType["items"];
};

export const AccordionBlock: React.FC<AccordionBlockProps> = ({ items }) => {
  return (
    <Accordion type="multiple">
      {items?.map((item, index) => (
        <AccordionItem key={index} value={item.title}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>
            {item.content.split("\n\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
