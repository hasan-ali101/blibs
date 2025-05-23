import { JSX, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";

type Model = JSX.IntrinsicElements["group"] & { modelPath: string };

export function Model(props: Model) {
  // for production
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      // @ts-ignore
      const resolved = chrome.runtime.getURL(props.modelPath);
      setUrl(resolved);
    } catch (err) {
      console.error("Error resolving GLB path", err);
    }
  }, []);

  if (!url) return null;

  const { nodes } = useGLTF(url) as any;

  // for development
  // const { nodes } = useGLTF(`/${props.modelPath}`) as any;

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} />
    </group>
  );
}

useGLTF.preload(`/samurai.glb`);
