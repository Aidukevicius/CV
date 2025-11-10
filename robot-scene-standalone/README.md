# Robot Scene with Head Tracking - Standalone

This folder contains all the files needed to add the robot scene with head tracking to any React Three Fiber project.

## Files Included

### Components
- `components/Robot.tsx` - The robot component with head tracking implementation
- `components/RobotScene.tsx` - The complete scene with lighting and camera setup

### 3D Model Assets
- `models/robot/scene.gltf` - Robot 3D model
- `models/robot/scene.bin` - Binary data for the model
- `models/robot/textures/` - All texture files:
  - material_baseColor.png
  - material_emissive.png
  - material_metallicRoughness.png
  - material_normal.png

## How to Use in Your Project

### 1. Install Required Dependencies

```bash
npm install three @react-three/fiber @react-three/drei
```

### 2. Copy Files to Your Project

- Copy `components/Robot.tsx` to your project's components folder
- Copy `components/RobotScene.tsx` to your project's components folder
- Copy the entire `models/robot/` folder to your `public/models/` directory

### 3. Import and Use

```tsx
import { RobotScene } from './components/RobotScene';

function App() {
  return <RobotScene />;
}
```

## Features

- **Head Tracking**: The robot's head follows your mouse cursor with smooth interpolation
- **Custom Lighting**: Ambient and directional lights with green tones
- **Clipping Plane**: Only the upper body of the robot is visible
- **Responsive**: Works on any screen size

## Customization

### Adjust Head Movement Sensitivity
In `Robot.tsx`, modify the multipliers:
```tsx
const targetRotationY = mousePosition.x * 0.5; // Change 0.5 for horizontal sensitivity
const targetRotationX = mousePosition.y * 0.3; // Change 0.3 for vertical sensitivity
```

### Change Lighting
In `RobotScene.tsx`, adjust the intensity values:
```tsx
<ambientLight intensity={0.6} color="#4a5d4a" />
<directionalLight position={[3, 4, 3]} intensity={0.8} color="#9db89d" castShadow />
```

### Adjust Robot Position/Scale
In `Robot.tsx`:
```tsx
<primitive object={scene} scale={3} position={[0, -5.5, 0]} />
```

## Notes

- The model path in `Robot.tsx` is set to `/models/robot/scene.gltf` - make sure this matches your public folder structure
- The clipping plane is set to show only the upper body (above y=0.5)
- Head bone is identified as 'Bone001_0117' - this is specific to this model
