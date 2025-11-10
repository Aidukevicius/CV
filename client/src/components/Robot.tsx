import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function RobotModel() {
  const { scene } = useGLTF('/models/robot/scene.gltf');
  const robotRef = useRef<THREE.Group>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!robotRef.current) return;

    const head = robotRef.current.getObjectByName('Head');
    if (head) {
      const targetX = mousePos.current.x * 0.3;
      const targetY = mousePos.current.y * 0.2;

      head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, targetX, 0.1);
      head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetY, 0.1);
    }
  });

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = (mesh.material as THREE.Material).clone();

          if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene]);

  return (
    <group ref={robotRef}>
      <primitive object={scene} scale={2.5} position={[0, -1.5, 0]} />
    </group>
  );
}

export default function Robot() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />
        <Suspense fallback={null}>
          <RobotModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/robot/scene.gltf');