import { Dispatch, SetStateAction } from "react";
import { Bot, Minus, Store, X } from "lucide-react";

import { cn } from "../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { Robot } from "../app";

type SceneWrapper = {
  isMinimised: boolean;
  setIsMinimised: Dispatch<SetStateAction<boolean>>;
  setSelectedRobot: Dispatch<SetStateAction<Robot | undefined>>;
  children?: React.ReactNode;
};

const SceneWrapper = ({
  isMinimised,
  setIsMinimised,
  children,
  setSelectedRobot,
}: SceneWrapper) => {
  return (
    <div
      className={cn(
        isMinimised && "drag-handle scale-20 cursor-pointer overflow-clip",
        "group flex flex-col rounded-xl border-solid !bg-blue-500/0 transition-all",
      )}
      onDoubleClick={() => {
        if (isMinimised) {
          setIsMinimised(false);
        }
      }}
    >
      <div
        className={`drag-handle flex h-8 w-full cursor-pointer items-center justify-between rounded-t-xl border-x border-t border-solid border-[#7BA7AA] bg-[#ecf6f6] px-4 py-2 opacity-0 group-hover:opacity-100 group-active:opacity-100`}
      >
        <div className="flex gap-2">
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
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger>
              <Bot
                onClick={() => {
                  setSelectedRobot(undefined);
                }}
                className="h-5 w-5 cursor-pointer rounded-full border border-[#758A8C] p-0.5 text-[#758A8C] hover:bg-[#758A8C]/10"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Bot select</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Store className="h-5 w-5 cursor-pointer rounded-full border border-[#758A8C] p-0.5 text-[#758A8C] hover:bg-[#758A8C]/10" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Visit store</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex">
        <div className="drag-handle w-8 flex-1 cursor-pointer border-l border-solid border-[#7BA7AA] bg-[#ecf6f6] opacity-0 group-hover:opacity-100 group-active:opacity-100" />
        {children}
        <div className="drag-handle flex w-8 flex-1 cursor-pointer justify-end border-r border-solid border-[#7BA7AA] bg-[#ecf6f6] opacity-0 group-hover:opacity-100 group-active:opacity-100" />{" "}
      </div>
      <div className="drag-handle h-8 w-full cursor-pointer rounded-b-xl border-x border-b border-solid border-[#7BA7AA] bg-[#ecf6f6] opacity-0 group-hover:opacity-100 group-active:opacity-100" />
    </div>
  );
};

export default SceneWrapper;
