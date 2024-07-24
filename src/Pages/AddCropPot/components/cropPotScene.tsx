import { useEffect, useState } from 'react';
import { Gltf } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export const CropPotScene = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update windowWidth state on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="h-full">
      <Canvas className="h-min" id="cropPot" shadows>
        <Gltf scale={windowWidth <= 640 ? 5 : 3} position={[0, 0, 0]} src="/potted_plant.glb" />
        <ambientLight intensity={2.5} />
      </Canvas>
    </div>
  );
};