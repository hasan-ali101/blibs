import { Minus, Store, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
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
      className="flex w-full items-center justify-center px-4"
    >
      <CarouselPrevious className="min-h-6 min-w-6" />
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem
            key={item.id}
            className="flex flex-col items-center justify-center"
            onClick={() => {
              item.owned && setOptionedItem(item);
            }}
          >
            <div className="relative m-2 h-36 w-36 rounded-4xl">
              {!item.owned && (
                <div className="absolute flex h-full w-full items-center justify-center rounded-xl bg-[#758A8C]/40">
                  {/* <Lock className="h-full w-full text-[#758A8C]/20"></Lock> */}
                </div>
              )}
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={cn(
                    optionedItem?.id === item.id &&
                      "border-3 border-[#00ffe584]",
                    item.owned && "cursor-pointer",
                    "h-full w-full rounded-xl object-cover",
                  )}
                />
              )}
            </div>
            <p className="text-xs font-medium text-[#758A8C]">{item.name}</p>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="min-h-6 min-w-6" />
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
    <div
      className={cn(
        isMinimised && "scale-25",
        "drag-handle m-4 flex cursor-move flex-col items-center gap-2 rounded-xl border border-solid border-[#7BA7AA] bg-[#ecf6f6] px-4 py-2",
      )}
      onDoubleClick={() => {
        if (isMinimised) {
          setIsMinimised(false);
        }
      }}
    >
      <div className="flex w-full justify-between">
        <p className="w-full text-left font-semibold text-[#758A8C] underline">
          My Collection
        </p>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <Store className="mr-4 h-5 w-5 rounded-full border border-[#758A8C] p-0.5 text-[#758A8C] hover:bg-[#758A8C]/10" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Visit store</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <X className="h-4 w-4 cursor-pointer rounded-full border border-[#758A8C] p-0.5 text-[#758A8C] hover:bg-[#758A8C]/10" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Hide</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Minus
                onClick={() => {
                  setIsMinimised(!isMinimised);
                }}
                className="h-4 w-4 cursor-pointer rounded-full border border-[#758A8C] p-0.5 text-[#758A8C] hover:bg-[#758A8C]/10"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Minimise</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex cursor-auto flex-col">
        <Accordion
          type="single"
          collapsible
          className="no-scrollbar max-h-72 w-72 overflow-auto rounded-t-xl border-x border-t border-slate-200 bg-white"
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
        <div className="h-5 w-full rounded-b-xl border-x border-b border-slate-200 bg-white"></div>
      </div>
      <Button
        disabled={
          !optionedItem || !optionedItem.modelPath || !optionedItem.owned
        }
        className="w-fit border border-[#758A8C] bg-white text-[#758A8C] hover:bg-white/80"
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
