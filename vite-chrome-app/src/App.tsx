import { Canvas } from "@react-three/fiber";

import { Model } from "./Bot";
import { OrbitControls } from "@react-three/drei";

const App = ({ isMinimised = false }: { isMinimised?: boolean }) => {
  return (
    <div className="w-64 h-64 bg-black/0">
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <mesh position={[0, -0.4, 0]} scale={2.5}>
          {!isMinimised && <OrbitControls enableZoom={false} />}
          <Model />
        </mesh>
      </Canvas>
    </div>
  );
};
export default App;
