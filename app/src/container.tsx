import { Rnd } from "react-rnd";
import { cn } from "./lib/utils";
import { useState } from "react";
import App from "./App";

function Container() {
  const [isMinimised, setIsMinimised] = useState(false);

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
          x: window.innerWidth - 330,
          y: window.innerHeight - 330,
          width: "auto",
          height: "auto",
        }}
        enableResizing={false}
        bounds="parent"
        dragHandleClassName="drag-handle"
      >
        <div
          className={cn(
            isMinimised && "scale-20 overflow-clip drag-handle cursor-pointer",
            "flex flex-col group rounded-xl !bg-blue-500/0 transition-all"
          )}
          onDoubleClick={() => {
            if (isMinimised) {
              setIsMinimised(false);
            }
          }}
        >
          <div
            className={`flex px-4 items-center py-2 justify-end drag-handle w-full h-8 bg-blue-50/100 rounded-t-xl cursor-pointer opacity-0 group-hover:opacity-100 group-active:opacity-100`}
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
            <div className="drag-handle w-8 flex-1 bg-blue-50/100 cursor-pointer opacity-0 group-hover:opacity-100 group-active:opacity-100" />
            <App isMinimised={isMinimised} />
            <div className="drag-handle flex justify-end w-8 flex-1 bg-blue-50/100 cursor-pointer opacity-0 group-hover:opacity-100 group-active:opacity-100" />{" "}
          </div>
          <div className="drag-handle w-full h-8 bg-blue-50/100 rounded-b-xl cursor-pointer opacity-0 group-hover:opacity-100 group-active:opacity-100" />
        </div>
      </Rnd>
    </div>
  );
}

export default Container;
