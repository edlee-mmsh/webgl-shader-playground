import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

type SceneProps = {
  children?: React.ReactNode;
};

export default function Scene({ children }: SceneProps) {
  return (
    <Canvas>
      <color attach="background" args={["black"]} />
      <Perf position="bottom-right" />
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {children}
    </Canvas>
  );
}
