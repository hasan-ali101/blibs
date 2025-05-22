import { Store } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import { Button } from "./components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./components/ui/carousel";
import { Robot } from "./app";
import { cn } from "./lib/utils";

const dummyData: { [rarity: string]: Robot[] } = {
  common: [
    { id: 1, name: "common Item 1", owned: false, modelPath: "" },
    { id: 2, name: "common Item 2", owned: false, modelPath: "" },
    { id: 3, name: "common Item 3", owned: false, modelPath: "" },
  ],
  rare: [
    { id: 4, name: "Rare Item 1", owned: false, modelPath: "" },
    { id: 5, name: "Rare Item 2", owned: false, modelPath: "" },
    { id: 6, name: "Rare Item 3", owned: false, modelPath: "" },
  ],
  epic: [
    { id: 7, name: "Epic Item 1", owned: false, modelPath: "" },
    { id: 8, name: "Epic Item 2", owned: false, modelPath: "" },
    { id: 9, name: "Epic Item 3", owned: false, modelPath: "" },
  ],
  legendary: [
    {
      id: 10,
      name: "Samurai",
      owned: true,
      modelPath: "samurai.glb",
    },
    {
      id: 11,
      name: "Dark samurai",
      owned: true,
      modelPath: "samurai-dark.glb",
    },
    { id: 12, name: "Legendary Item 3", owned: false },
  ],
};

const CollectionCarousel = ({
  items,
  optionedItem,
  setOptionedItem,
}: {
  items: Robot[];
  optionedItem: Robot | null;
  setOptionedItem: Dispatch<SetStateAction<Robot | null>>;
}) => {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full flex items-center justify-center px-4"
    >
      <CarouselPrevious className="min-w-6 min-h-6" />
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem
            key={item.id}
            className="flex justify-center items-center flex-col"
            onClick={() => {
              item.owned && setOptionedItem(item);
              // else show popup redirect to store
            }}
          >
            <div
              className={cn(
                optionedItem?.id === item.id && "border-2 border-[#758A8C]",
                "bg-slate-100 w-40 h-40 m-2 rounded-4xl"
              )}
            />
            <p className="text-[#758A8C] text-xs font-medium">{item.name}</p>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="min-w-6 min-h-6 " />
    </Carousel>
  );
};

const Collection = ({
  setSelectedRobot,
}: {
  setSelectedRobot: Dispatch<SetStateAction<Robot | undefined>>;
}) => {
  const [optionedItem, setOptionedItem] = useState<Robot | null>(null);

  return (
    <div className="drag-handle px-6 items-center cursor-pointer flex flex-col gap-4 py-4 border-2 border-solid border-[#7BA7AA] rounded-xl m-4 bg-[#ecf6f6]">
      <div className="flex w-full justify-between">
        <p className="underline w-full text-left font-semibold text-[#758A8C] text-lg">
          My Collection
        </p>
        <Store className="border border-[#758A8C] min-w-7 min-h-7 text-[#758A8C] hover:bg-[#758A8C]/10 rounded-full p-0.5" />
      </div>
      <div className="flex flex-col">
        <Accordion
          type="single"
          collapsible
          className="w-72 bg-white rounded-t-xl max-h-64 px-2 overflow-auto no-scrollbar border-t border-x border-slate-200"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="pl-4">Common</AccordionTrigger>
            <AccordionContent>
              <CollectionCarousel
                items={dummyData.common}
                optionedItem={optionedItem}
                setOptionedItem={setOptionedItem}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="pl-4">Rare</AccordionTrigger>
            <AccordionContent>
              <CollectionCarousel
                items={dummyData.rare}
                optionedItem={optionedItem}
                setOptionedItem={setOptionedItem}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="pl-4">Epic</AccordionTrigger>
            <AccordionContent>
              <CollectionCarousel
                items={dummyData.epic}
                optionedItem={optionedItem}
                setOptionedItem={setOptionedItem}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="pl-4">Legendary</AccordionTrigger>
            <AccordionContent>
              <CollectionCarousel
                items={dummyData.legendary}
                optionedItem={optionedItem}
                setOptionedItem={setOptionedItem}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="w-full h-6 bg-white rounded-b-xl border-x border-b border-slate-200"></div>
      </div>
      <Button
        disabled={
          !optionedItem || !optionedItem.modelPath || !optionedItem.owned
        }
        className="w-fit border-[#758A8C] border bg-white text-[#758A8C] hover:bg-white/80"
        onClick={() => {
          optionedItem && setSelectedRobot(optionedItem);
        }}
      >
        CONFIRM
      </Button>
    </div>
  );
};

export default Collection;
