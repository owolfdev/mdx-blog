import React, { type ComponentType, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Update props to accept either an MDX component or raw JSX/text
interface AccordionItemProps {
  trigger: string;
  content: ReactNode | ComponentType<Record<string, never>>; // Accepts text, JSX, or MDX components
}

interface AccordionComponentProps {
  items: AccordionItemProps[];
}

export default function AccordionComponent({ items }: AccordionComponentProps) {
  return (
    <Accordion type="single" collapsible className="w-full text-lg mb-8">
      {items.map((item, i) => (
        <AccordionItem key={`${item.trigger}-${i}`} value={`item-${i + 1}`}>
          <AccordionTrigger className="text-lg">
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent className="text-lg">
            {typeof item.content === "function" ? (
              <item.content /> // Render MDX component
            ) : (
              item.content // Render plain text or JSX
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
