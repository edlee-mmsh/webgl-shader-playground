import { useEffect, useMemo } from "react";
import { shaderMaterial } from "@react-three/drei";
import frag from "./glsl/fragment.glsl";
import vert from "./glsl/vertex.glsl";

export default function Basic() {
  const ColorMaterial = useMemo(() => shaderMaterial({}, vert, frag), []);

  const colorMaterial = useMemo(() => new ColorMaterial(), [ColorMaterial]);

  useEffect(() => {
    return () => {
      colorMaterial.dispose();
    };
  }, [colorMaterial]);

  return (
    <mesh material={colorMaterial}>
      <planeGeometry args={[1, 1, 1, 1]} attach="geometry" />
    </mesh>
  );
}
