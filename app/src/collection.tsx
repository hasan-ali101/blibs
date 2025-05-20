import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";

const Collection = () => {
  return (
    <div className="px-6 flex flex-col gap-4 py-4 !border-2 !border-black rounded-xl m-4 bg-[#E7EFEF]">
      <p className="underline font-semibold text-[#758A8C] text-lg">
        My Collection
      </p>
      <Accordion
        type="single"
        collapsible
        className="w-80 bg-white rounded-xl px-2 "
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Basic</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Rare</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Epic</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Collection;
