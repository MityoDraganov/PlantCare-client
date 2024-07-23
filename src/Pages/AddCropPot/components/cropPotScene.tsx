import { Gltf } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const CropPotScene = () => {
  return (
    <div>
      <Canvas className="h-min" id="farmer" shadows>
        <Gltf scale={2} position={[0, -1, 0]} src="potted_plant.glb" />
        <ambientLight intensity={8} />
      </Canvas>
    </div>
  );
};
