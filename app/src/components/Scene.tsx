import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";

import { Model } from "./model";
import { Robot } from "../app";

type SceneType = {
  selectedRobot: Robot;
};

const Scene = ({ selectedRobot }: SceneType) => {
  return (
    <div className="h-64 w-64">
      <Canvas className="h-full w-full">
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <mesh position={[0, -0.2, 0]} scale={2.8}>
          {/* {!isMinimised && <OrbitControls enableZoom={false} />} */}
          <PresentationControls
            global
            snap={true}
            rotation={[0, -0.3, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            // azimuth={[-Math.PI, Math.PI]}
          >
            <Model modelPath={selectedRobot.modelPath || ""} />
          </PresentationControls>
        </mesh>
      </Canvas>
    </div>
  );
};

export default Scene;
