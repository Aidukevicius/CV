
import { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ThreeErrorBoundary } from './ErrorBoundary';

function RobotModel() {
  const { scene } = useGLTF('/models/robot/scene.gltf', true);
  const robotRef = useRef<THREE.Group>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const headRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (robotRef.current && !headRef.current) {
      headRef.current = robotRef.current.getObjectByName('Bone.001_0117') || null;
    }
  }, [scene]);

  useFrame(() => {
    if (!headRef.current) return;

    const targetX = mousePos.current.x * 0.3;
    const targetY = mousePos.current.y * 0.2;

    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.1);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetY, 0.1);
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

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="text-white text-sm">Loading 3D model...</div>
    </div>
  );
}

export default function Robot() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost. Attempting to restore...');
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored successfully.');
    };

    const canvas = canvasRef.current?.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);

      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      };
    }
  }, []);

  return (
    <ThreeErrorBoundary>
      <div ref={canvasRef} className="w-full h-full" style={{ background: '#000000' }}>
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{
              antialias: true,
              alpha: false,
              preserveDrawingBuffer: false,
              powerPreference: 'high-performance',
              failIfMajorPerformanceCaveat: false,
            }}
            dpr={[1, 1.5]}
            onCreated={({ gl }) => {
              gl.physicallyCorrectLights = false;
            }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[-5, 5, 5]} intensity={0.5} />
            <RobotModel />
          </Canvas>
        </Suspense>
      </div>
    </ThreeErrorBoundary>
  );
}

useGLTF.preload('/models/robot/scene.gltf');
