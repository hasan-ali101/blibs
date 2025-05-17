import { Rnd } from "react-rnd";
import { cn } from "./lib/utils";
import { useState } from "react";
import App from "./App";

function Container() {
  const [isMinimised, setIsMinimised] = useState(false);

  return (
    <div className="w-full h-screen">
      <Rnd
        className="inline-block !bg-blue-500/0 !border-none overflow-clip"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "solid 1px #ddd",
          background: "#f0f0f0",
          pointerEvents: "auto",
        }}
        default={{
          x: window.innerWidth - 400,
          y: window.innerHeight - 400,
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
          onClick={() => {
            if (isMinimised) {
              setIsMinimised(false);
            }
          }}
        >
          <div
            className={`flex px-4 items-center py-2 justify-end drag-handle w-full h-8 bg-slate-100/70 rounded-t-xl cursor-pointer opacity-0 group-hover:opacity-100`}
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
            <div className="drag-handle w-8 h-64 bg-slate-100/70 cursor-pointer opacity-0 group-hover:opacity-100" />
            <App isMinimised={isMinimised} />
            <div className="drag-handle flex justify-end w-8 h-64 bg-slate-100/70 cursor-pointer opacity-0 group-hover:opacity-100" />{" "}
          </div>
          <div className="drag-handle w-full h-8 bg-slate-100/70 rounded-b-xl cursor-pointer opacity-0 group-hover:opacity-100" />
        </div>
      </Rnd>
    </div>
  );
}

export default Container;
