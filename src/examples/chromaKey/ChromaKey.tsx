import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { shaderMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useControls } from "leva";
import frag from "./glsl/fragment.glsl";
import vert from "./glsl/vertex.glsl";

export default function ChromaKey() {
  /**
   * -------------------------------------------------------------
   * Chroma Key Material
   */
  const { keyColor } = useControls("params", {
    keyColor: {
      value: "#ff0000",
      label: "Key Color",
      color: true,
    },
  });

  const colorMap = useLoader(TextureLoader, "/andy-warhol-marilyn1.png");
  const ColorMaterial = useMemo(
    () =>
      shaderMaterial(
        { uTexture: colorMap, uKeyColor: new THREE.Color(keyColor) },
        vert,
        frag
      ),
    [colorMap, keyColor]
  );

  const colorMaterial = useMemo(() => new ColorMaterial(), [ColorMaterial]);
  colorMaterial.transparent = true;

  useEffect(() => {
    return () => {
      colorMaterial.dispose();
    };
  }, [colorMaterial]);
  /**
   * -------------------------------------------------------------
   */

  /**
   * Box Material
   */
  const { boxColor } = useControls("params", {
    boxColor: {
      value: "#eeeeee",
      label: "Box Color",
      color: true,
    },
  });
  const boxMaterial = new THREE.MeshStandardMaterial({
    color: boxColor,
    roughness: 0.4,
    metalness: 0.2,
    side: THREE.DoubleSide,
  });

  return (
    <>
      <mesh material={boxMaterial}>
        <boxGeometry args={[10, 10, 10]} attach="geometry" />
      </mesh>
      <mesh material={colorMaterial}>
        <planeGeometry args={[1, 1, 1, 1]} attach="geometry" />
      </mesh>
    </>
  );
}
