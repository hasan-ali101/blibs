import { Rnd } from "react-rnd";
import { cn } from "./lib/utils";
import { useState } from "react";
import Scene from "./components/Scene";
import Collection from "./collection";

export type Robot = {
  id: number;
  name: string;
  rarity?: string;
  imageUrl?: string;
  modelPath?: string;
  owned: boolean;
};

function App() {
  const [isMinimised, setIsMinimised] = useState(false);
  const [selectedRobot, setSelectedRobot] = useState<Robot>();

  return (
    <div className="w-full h-screen">
      <Rnd
        className={cn(isMinimised && "!w-40 !h-40", "inline-block")}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
        }}
        default={{
          x: window.innerWidth - 1030,
          y: window.innerHeight - 530,
          width: "auto",
          height: "auto",
        }}
        enableResizing={false}
        bounds="parent"
        dragHandleClassName="drag-handle"
      >
        {!selectedRobot ? (
          <Collection setSelectedRobot={setSelectedRobot} />
        ) : (
          <div
            className={cn(
              isMinimised &&
                "scale-20 overflow-clip drag-handle cursor-pointer",
              "flex flex-col group rounded-xl !bg-blue-500/0 transition-all"
            )}
            onDoubleClick={() => {
              if (isMinimised) {
                setIsMinimised(false);
              }
            }}
          >
            <div
              className={`flex px-4 items-center py-2 justify-end drag-handle w-full h-8 bg-[#ecf6f6] rounded-t-xl cursor-pointer opacity-0 group-hover:opacity-100 group-active:opacity-100`}
            >
              {!isMinimised && (
                <p
                  onClick={() => {
                    setIsMinimised(!isMinimised);
                  }}
                  className="text-5xl text-slate-400"
                >
                  -
                </p>
              )}
            </div>
            <div className="flex">
              <div className="drag-handle w-8 flex-1 bg-[#ecf6f6] cursor-pointer opacity-0 group-hover:opacity-100 group-active:opacity-100" />
              <Scene isMinimised={isMinimised} selectedRobot={selectedRobot} />
              <div className="drag-handle flex justify-end w-8 flex-1 bg-[#ecf6f6] cursor-pointer opacity-0 group-hover:opacity-100 group-active:opacity-100" />{" "}
            </div>
            <div className="drag-handle w-full h-8 bg-[#ecf6f6] rounded-b-xl cursor-pointer opacity-0 group-hover:opacity-100 group-active:opacity-100" />
          </div>
        )}
      </Rnd>
    </div>
  );
}

export default App;
