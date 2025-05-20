import { Canvas } from "@react-three/fiber";

import { Model } from "./Bot";
import { OrbitControls } from "@react-three/drei";

const App = ({ isMinimised = false }: { isMinimised?: boolean }) => {
  return (
    <div className="bg-black/0 w-64 h-64">
      <Canvas className="w-full h-full">
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
          {!isMinimised && <OrbitControls enableZoom={false} />}
          <Model rotation-y={-0.3} />
        </mesh>
      </Canvas>
    </div>
  );
};
export default App;
