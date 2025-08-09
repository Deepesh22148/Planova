import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sky, ContactShadows, MeshReflectorMaterial, RoundedBox, Environment, Cloud } from '@react-three/drei';
import type { ElementRef } from 'react';


type SkyImpl = ElementRef<typeof Sky>;
import * as THREE from 'three';

function Car({ color = 0xff0000, position, userData }: {
  color?: number;
  position: [number, number, number];
  userData?: { angle: number; radius: number; speed: number } ;
}) {
  const carRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (carRef.current && userData) {
      userData.angle += userData.speed;
      carRef.current.position.set(
        Math.cos(userData.angle) * userData.radius,
        0,
        Math.sin(userData.angle) * userData.radius
      );
      carRef.current.rotation.y = -userData.angle + Math.PI / 2;
    }
  });

  return (
    <group ref={carRef} position={position}>
      {/* Body */}
      <RoundedBox position={[0, 0.5, 0]} args={[2, 0.6, 1]} radius={0.15} smoothness={4} castShadow>
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.5} />
      </RoundedBox>

      {/* Cabin */}
      <RoundedBox position={[0, 0.9, 0]} args={[1.2, 0.5, 0.9]} radius={0.12} smoothness={3} castShadow>
        <meshStandardMaterial color={0xdddddd} metalness={0.2} roughness={0.3} />
      </RoundedBox>

      {/* Wheels */}
      <mesh position={[-0.7, 0.2, 0.45]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.4, 24]} />
        <meshStandardMaterial color={0x222222} metalness={0.1} roughness={0.8} />
      </mesh>
      <mesh position={[0.7, 0.2, 0.45]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.4, 24]} />
        <meshStandardMaterial color={0x222222} metalness={0.1} roughness={0.8} />
      </mesh>
      <mesh position={[-0.7, 0.2, -0.45]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.4, 24]} />
        <meshStandardMaterial color={0x222222} metalness={0.1} roughness={0.8} />
      </mesh>
      <mesh position={[0.7, 0.2, -0.45]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.4, 24]} />
        <meshStandardMaterial color={0x222222} metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.6, 0.35, 0.52]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial emissive={0xffffcc} emissiveIntensity={2} color={0xffffff} />
      </mesh>
      <mesh position={[0.6, 0.35, 0.52]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial emissive={0xffffcc} emissiveIntensity={2} color={0xffffff} />
      </mesh>
    </group>
  );
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group>
      {/* Trunk */}
      <mesh position={[position[0], 1, position[2]]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 2]} />
        <meshStandardMaterial color={0x8b4513} />
      </mesh>

      {/* Foliage */}
      <mesh position={[position[0], 2.5, position[2]]} castShadow>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color={0x228b22} />
      </mesh>
    </group>
  );
}

function Scene() {
  const { scene, camera, gl } = useThree();


  const skyRef = useRef<SkyImpl>(null);
  const sunLightRef = useRef<THREE.DirectionalLight>(null);
  const moonLightRef = useRef<THREE.DirectionalLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const sunMeshRef = useRef<THREE.Mesh>(null);
  const moonMeshRef = useRef<THREE.Mesh>(null);
  const starsRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    // Set up atmospheric fog for smooth horizon blending
    scene.fog = new THREE.FogExp2(0xb7d6ff, 0.018);

    // Set initial camera position
    camera.position.set(0, 5, 12);

    // Configure renderer like original
    gl.setPixelRatio(window.devicePixelRatio);
    gl.shadowMap.enabled = true;
  }, [scene, camera, gl]);

  // Day-Night cycle animation
  useFrame((state, delta) => {
    timeRef.current = (timeRef.current + delta * 0.02) % 1;
    const t = timeRef.current;
    const theta = t * Math.PI * 2;
    const radius = 60;
    const height = 30;
    const sunPos = new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * height, Math.sin(theta) * radius);
    const moonPos = sunPos.clone().multiplyScalar(-1);

    if (skyRef.current?.material?.uniforms?.sunPosition?.value) {
      skyRef.current.material.uniforms.sunPosition.value.set(sunPos.x, sunPos.y, sunPos.z);
    }

    if (sunLightRef.current) {
      const dayFactor = Math.max(0, sunPos.y / height);
      sunLightRef.current.position.copy(sunPos);
      sunLightRef.current.intensity = 0.2 + dayFactor * 1.3;
      sunLightRef.current.color.setHSL(0.12, 0.6, 0.9 - 0.2 * (1 - dayFactor));
    }

    if (moonLightRef.current) {
      const nightFactor = Math.max(0, -sunPos.y / height);
      moonLightRef.current.position.copy(moonPos);
      moonLightRef.current.intensity = nightFactor * 0.25;
    }

    if (hemiRef.current) {
      const dayFactor = Math.max(0, sunPos.y / height);
      hemiRef.current.intensity = 0.2 + dayFactor * 0.3;
    }

    const dayFog = new THREE.Color(0xb7d6ff);
    const nightFog = new THREE.Color(0x0b1020);
    const blend = Math.max(0, Math.min(1, (sunPos.y / height) * 0.5 + 0.5));
    const fogColor = nightFog.clone().lerp(dayFog, blend);
    if (scene.fog) scene.fog.color.copy(fogColor);

    if (sunMeshRef.current) {
      sunMeshRef.current.position.copy(sunPos);
      sunMeshRef.current.visible = sunPos.y > -2;
    }
    if (moonMeshRef.current) {
      moonMeshRef.current.position.copy(moonPos);
      moonMeshRef.current.visible = sunPos.y < 0;
    }

    if (starsRef.current) {
      starsRef.current.visible = sunPos.y < 0;
    }
  });

  // Create moving cars data
  const movingCarsData = [];
  for (let i = 0; i < 5; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 12 + Math.random() * 5;
    movingCarsData.push({
      color: Math.random() * 0xffffff,
      position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number, number, number],
      userData: {
        angle,
        radius,
        speed: 0.002 + Math.random() * 0.003
      }
    });
  }

  // Create trees data
  const treesData = [];
  for (let i = 0; i < 15; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 15 + Math.random() * 10;
    treesData.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number, number, number]);
  }

  return (
      <>
        {/* Sky / Sun */}
        <Sky ref={skyRef} sunPosition={[10, 25, -10]} turbidity={7} rayleigh={2.8} mieCoefficient={0.003} mieDirectionalG={0.8} />
        <Cloud position={[10, 20, -30]} scale={10} opacity={0.25} speed={0.1} />
        <Cloud position={[-15, 18, -20]} scale={12} opacity={0.2} speed={0.12} />

        {/* Visible sun and moon discs */}
        <mesh ref={sunMeshRef} castShadow={false}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshBasicMaterial color="#fff0b3" />
        </mesh>
        <mesh ref={moonMeshRef} castShadow={false}>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshBasicMaterial color="#cfe6ff" />
        </mesh>
        <hemisphereLight ref={hemiRef} args={[0xb1e1ff, 0x8f8f8f, 0.35]} />
        <ambientLight color={0xffffff} intensity={0.4} />
        <directionalLight
          ref={sunLightRef}
          color={0xfff2cc}
          intensity={1.25}
          position={[10, 25, -10]}
          castShadow
        />
        <directionalLight
          ref={moonLightRef}
          color={0xaaccff}
          intensity={0}
          position={[-10, -25, 10]}
        />
        <Environment preset="dawn" background={false} />

      {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[400, 400]} />
          <meshStandardMaterial color={0x5b7d3a} roughness={0.95} metalness={0.0} />
        </mesh>

      {/* Destination area (parking lot) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <MeshReflectorMaterial
            color="#333333"
            metalness={0.2}
            roughness={0.3}
            blur={[200, 100]}
            mixBlur={1}
            mixStrength={2}
            resolution={1024}
            mirror={0.3}
            depthScale={0.2}
            minDepthThreshold={0.8}
            maxDepthThreshold={1}
          />
        </mesh>

        {/* Soft contact shadows */}
        <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={20} blur={2.5} far={10} />
        {/* Main parked car */}
        <Car color={0xff4444} position={[0, 0, 0]} />

      {/* Moving cars */}
      {movingCarsData.map((carData, index) => (
        <Car
          key={index}
          color={carData.color}
          position={carData.position}
          userData={carData.userData}
        />
      ))}

      {/* Trees */}
      {treesData.map((position, index) => (
        <Tree key={index} position={position} />
      ))}
    </>
  );
}

export default function RoadScene() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{
          fov: 60,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.1,
          far: 1000
        }}
        shadows
        gl={{ antialias: true }}
        style={{ background: '#222222' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
