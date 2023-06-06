import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { shaderMaterial } from "@react-three/drei";
import frag from "./glsl/fragment.glsl";
import vert from "./glsl/vertex.glsl";

export default function Grid() {
  const { slice } = useControls("params", {
    slice: {
      value: 10,
      min: 1,
      max: 50,
      step: 0.1,
    },
  });

  const { edge } = useControls("params", {
    edge: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
    },
  });

  const ColorMaterial = useMemo(
    () =>
      shaderMaterial(
        { slice, edge, color: new THREE.Color(0.2, 0.0, 0.1) },
        vert,
        frag
      ),
    [edge, slice]
  );

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
