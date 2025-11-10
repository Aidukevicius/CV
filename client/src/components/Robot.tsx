
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function RobotModel() {
  const { scene } = useGLTF('/models/robot/scene.gltf');
  const robotRef = useRef<THREE.Group>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!robotRef.current) return;

    const head = robotRef.current.getObjectByName('Bone.001_0117');
    if (head) {
      const targetX = mousePos.current.x * 0.3;
      const targetY = mousePos.current.y * 0.2;

      head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, targetX, 0.1);
      head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetY, 0.1);
    }
  });

  return (
    <group 
      ref={robotRef}
      onPointerMove={(e) => {
        mousePos.current = {
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        };
      }}
    >
      <primitive object={scene} scale={2.5} position={[0, -1.5, 0]} />
    </group>
  );
}

export default function Robot() {
  return (
    <div className="w-full h-full" style={{ background: '#000000' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: true,
          alpha: false,
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />
        <RobotModel />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/robot/scene.gltf');
