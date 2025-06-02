import { JSX, useEffect, useState } from "react";

// Declare chrome as a global variable
declare const chrome: any;
import { useGLTF } from "@react-three/drei";

type Model = JSX.IntrinsicElements["group"] & { modelPath: string };

export function Model(props: Model) {
  // for production
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (chrome.runtime) {
      try {
        const resolved = chrome.runtime.getURL(props.modelPath);
        setUrl(resolved);
      } catch (err) {
        console.error("Error resolving GLB path", err);
      }
    } else {
      setUrl(`/${props.modelPath}`);
    }
  }, []);

  if (!url) return null;

  const { nodes } = useGLTF(url) as any;

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} />
    </group>
  );
}

useGLTF.preload(`/samurai.glb`);
