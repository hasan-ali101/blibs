import { cn } from "../lib/utils";

type SceneWrapper = {
  isMinimised: boolean;
  setIsMinimised: (value: boolean) => void;
  children?: React.ReactNode;
};

const SceneWrapper = ({
  isMinimised,
  setIsMinimised,
  children,
}: SceneWrapper) => {
  return (
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
        {children}
        <div className="drag-handle flex justify-end w-8 flex-1 bg-[#ecf6f6] cursor-pointer opacity-0 group-hover:opacity-100 group-active:opacity-100" />{" "}
      </div>
      <div className="drag-handle w-full h-8 bg-[#ecf6f6] rounded-b-xl cursor-pointer opacity-0 group-hover:opacity-100 group-active:opacity-100" />
    </div>
  );
};

export default SceneWrapper;
