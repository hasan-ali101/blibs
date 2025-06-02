import { Cross, Lock, Minus, Store, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Robot } from "../app";
import { capitalise, cn } from "../lib/utils";

const dummyData: { [rarity: string]: Robot[] } = {
  common: [
    {
      id: 1,
      name: "common Item 1",
      owned: false,
      modelPath: "",
      imageUrl: "/image.png",
    },
    {
      id: 2,
      name: "common Item 2",
      owned: false,
      modelPath: "",
      imageUrl: "/image.png",
    },
    {
      id: 3,
      name: "common Item 3",
      owned: false,
      modelPath: "",
      imageUrl: "/image.png",
    },
  ],
  rare: [
    {
      id: 4,
      name: "Rare Item 1",
      owned: false,
      modelPath: "",
      imageUrl: "/image.png",
    },
    {
      id: 5,
      name: "Rare Item 2",
      owned: false,
      modelPath: "",
      imageUrl: "/image.png",
    },
    {
      id: 6,
      name: "Rare Item 3",
      owned: false,
      modelPath: "",
      imageUrl: "/image.png",
    },
  ],
  epic: [
    {
      id: 7,
      name: "Epic Item 1",
      owned: false,
      modelPath: "",
      imageUrl: "/image.png",
    },
    {
      id: 8,
      name: "Epic Item 2",
      owned: false,
      modelPath: "",
      imageUrl: "/image.png",
    },
    {
      id: 9,
      name: "Epic Item 3",
      owned: false,
      modelPath: "",
      imageUrl: "/image.png",
    },
  ],
  legendary: [
    {
      id: 10,
      name: "Samurai",
      owned: true,
      modelPath: "samurai.glb",
      imageUrl: "/image.png",
    },
    {
      id: 11,
      name: "Dark samurai",
      owned: true,
      modelPath: "samurai-dark.glb",
      imageUrl: "/image.png",
    },
    { id: 12, name: "Legendary Item 3", owned: false, imageUrl: "/image.png" },
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
            }}
          >
            <div
              className={cn(
                optionedItem?.id === item.id && "border-2 border-[#00ffe584]",
                "w-36 h-36 m-2 rounded-4xl relative"
              )}
            >
              {!item.owned && (
                <div className="absolute w-full h-full bg-slate-200/50 flex items-center justify-center">
                  <Lock className="h-full w-full text-slate-600/50"></Lock>
                </div>
              )}
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover "
                />
              )}
            </div>
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
  isMinimised,
  setIsMinimised,
}: {
  setSelectedRobot: Dispatch<SetStateAction<Robot | undefined>>;
  isMinimised: boolean;
  setIsMinimised: Dispatch<SetStateAction<boolean>>;
}) => {
  type Collection = {
    [rarity: string]: Robot[];
  };
  const [collection, setCollection] = useState<Collection>(dummyData);
  const [optionedItem, setOptionedItem] = useState<Robot | null>(null);

  return (
    <div className="drag-handle px-4 items-center cursor-pointer flex flex-col gap-2 py-2 border border-solid border-[#7BA7AA] rounded-xl m-4 bg-[#ecf6f6]">
      <div className="flex w-full justify-between">
        <p className="underline w-full text-left font-semibold text-[#758A8C]">
          My Collection
        </p>
        <div className="flex items-center gap-2">
          <Store className="border border-[#758A8C] mr-4 w-5 h-5 text-[#758A8C] hover:bg-[#758A8C]/10 rounded-full p-0.5" />
          <Minus
            onClick={() => {
              setIsMinimised(!isMinimised);
            }}
            className="border border-[#758A8C] w-4 h-4 text-[#758A8C] hover:bg-[#758A8C]/10 rounded-full p-0.5"
          >
            -
          </Minus>
          <X className="border border-[#758A8C] w-4 h-4 text-[#758A8C] hover:bg-[#758A8C]/10 rounded-full p-0.5" />
        </div>
      </div>
      <div className="flex flex-col">
        <Accordion
          type="single"
          collapsible
          className="w-72 bg-white rounded-t-xl max-h-72 overflow-auto no-scrollbar border-t border-x border-slate-200"
          defaultValue="item-1"
        >
          {Object.keys(collection).map((rarity, index) => {
            return (
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger className="pl-4 text-xs">
                  {capitalise(rarity)}
                </AccordionTrigger>
                <AccordionContent>
                  <CollectionCarousel
                    items={collection[rarity]}
                    optionedItem={optionedItem}
                    setOptionedItem={setOptionedItem}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        <div className="w-full h-3 bg-white rounded-b-xl border-x border-b border-slate-200"></div>
      </div>
      <Button
        disabled={
          !optionedItem || !optionedItem.modelPath || !optionedItem.owned
        }
        className="w-fit border-[#758A8C] border bg-white text-[#758A8C] hover:bg-white/80"
        size="sm"
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
