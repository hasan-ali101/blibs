import { Rnd } from "react-rnd";
import { cn } from "./lib/utils";
import { useState } from "react";
import Scene from "./components/scene";
import Collection from "./components/collection";
import SceneWrapper from "./components/scene-wrapper";

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
        className={cn(isMinimised && "!w-40 !h-40")}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
        }}
        default={{
          x: window.innerWidth - 375,
          y: window.innerHeight - 430,
          width: "auto",
          height: "auto",
        }}
        enableResizing={false}
        bounds="parent"
        dragHandleClassName="drag-handle"
      >
        {!selectedRobot ? (
          <Collection
            setSelectedRobot={setSelectedRobot}
            isMinimised={isMinimised}
            setIsMinimised={setIsMinimised}
          />
        ) : (
          <SceneWrapper
            isMinimised={isMinimised}
            setIsMinimised={setIsMinimised}
          >
            <Scene isMinimised={isMinimised} selectedRobot={selectedRobot} />
          </SceneWrapper>
        )}
      </Rnd>
    </div>
  );
}

export default App;
