import { Gltf } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { mx_bilerp_0 } from "three/examples/jsm/nodes/materialx/lib/mx_noise.js";


export const CropPotScene = () => {
  return (
    <div className="h-full">
      <Canvas className="h-min" id="cropPot" shadows>
        <Gltf scale={2} position={[0, 0, 0]} src="/potted_plant.glb" />
        <ambientLight intensity={2.5} />
      </Canvas>
    </div>
  );
};
