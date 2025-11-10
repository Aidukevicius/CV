import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function RobotModel() {
  const { scene } = useGLTF('/models/robot/scene.gltf');
  const robotRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Object3D | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (robotRef.current) {
      const clippingPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.5);
      
      robotRef.current.traverse((child) => {
        if (!headRef.current) {
          if (child.name === 'Bone001_0117') {
            headRef.current = child;
          }
        }
        
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach(mat => {
              mat.clippingPlanes = [clippingPlane];
              mat.clipShadows = true;
            });
          }
        }
      });
    }
  }, [scene]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (headRef.current) {
      const limitY = 0.5;
      const limitX = 0.25;
      
      const targetRotationY = THREE.MathUtils.clamp(
        mousePosition.x * 0.5,
        -limitY,
        limitY
      );
      const targetRotationX = THREE.MathUtils.clamp(
        mousePosition.y * 0.3,
        -limitX,
        limitX
      );

      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotationY,
        0.08
      );
      
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotationX,
        0.08
      );
    }
  });

  return (
    <group ref={robotRef}>
      <primitive object={scene} scale={3} position={[0, -5.5, 0]} />
    </group>
  );
}

export default function Robot() {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
      data-testid="robot-decoration"
      style={{ width: '400px', height: '400px', margin: 0, padding: 0 }}
    >
      <Canvas
        camera={{
          position: [0, 1, 5],
          fov: 45,
        }}
        gl={{ 
          antialias: true,
          localClippingEnabled: true,
          alpha: true
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 3]} intensity={1.5} castShadow />
        <directionalLight position={[-3, 2, -2]} intensity={0.8} />
        <pointLight position={[0, 2, 2]} intensity={1.0} />
        
        <Suspense fallback={null}>
          <RobotModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/robot/scene.gltf');
