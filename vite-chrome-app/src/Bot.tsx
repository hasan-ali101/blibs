// @ts-nocheck

import { JSX, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props: JSX.IntrinsicElements["group"]) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      const resolved = chrome.runtime.getURL("bot.glb");
      setUrl(resolved);
    } catch (err) {
      console.error("Error resolving GLB path", err);
    }
  }, []);

  if (!url) return null;

  const { nodes, materials } = useGLTF(url);
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} />
    </group>
  );
}

useGLTF.preload("/bot.glb");
