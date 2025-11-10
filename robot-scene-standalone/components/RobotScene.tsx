import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { Robot } from './Robot';

export function RobotScene() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0f' }}>
      <Canvas
        camera={{
          position: [0, 1, 5],
          fov: 45,
        }}
        gl={{ 
          antialias: true,
          localClippingEnabled: true
        }}
      >
        <color attach="background" args={['#0a0a0f']} />
        
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 3]} intensity={1.5} castShadow />
        <directionalLight position={[-3, 2, -2]} intensity={0.8} />
        <pointLight position={[0, 2, 2]} intensity={1.0} />
        
        <Suspense fallback={null}>
          <Robot />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
      
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white',
        fontFamily: 'Inter, sans-serif',
        fontSize: '18px',
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '15px 20px',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)',
      }}>
        Move your cursor to control the robot's head!
      </div>
    </div>
  );
}
