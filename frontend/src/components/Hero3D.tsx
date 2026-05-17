import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import { useReducedMotion } from "../hooks/useReducedMotion";

function Shape() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.08;
      ref.current.rotation.y += delta * 0.22;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} position={[0, 0.15, 0]}>
        <icosahedronGeometry args={[1.6, 2]} />
        <MeshDistortMaterial color="#4dd7b0" roughness={0.35} metalness={0.4} distort={0.22} speed={1.2} />
      </mesh>
    </Float>
  );
}

function Satellites() {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z -= delta * 0.16;
  });

  return (
    <group ref={group}>
      {[
        { position: [-2.15, -0.85, -0.25] as [number, number, number], color: "#f4bf62" },
        { position: [2.05, 0.95, 0.2] as [number, number, number], color: "#d7dde8" },
        { position: [1.85, -1.35, -0.05] as [number, number, number], color: "#4dd7b0" }
      ].map(({ position, color }) => (
        <mesh key={position.join("-")} position={position}>
          <octahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial color={color} roughness={0.28} metalness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

export function Hero3D() {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className="min-h-[320px] rounded-lg border border-accent/30 bg-accent/10 shadow-glow lg:min-h-[480px]" aria-hidden />;
  }
  return (
    <div className="relative h-[360px] min-h-[320px] overflow-hidden rounded-lg border border-white/10 bg-panel/30 shadow-glow md:h-[500px]" aria-label="Interactive abstract full-stack identity object">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(77,215,176,0.18),transparent_36%),radial-gradient(circle_at_70%_68%,rgba(244,191,98,0.14),transparent_28%)]" />
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[4, 3, 4]} intensity={2.4} />
        <pointLight position={[-3, -2, 2]} color="#f4bf62" intensity={1.1} />
        <Shape />
        <Satellites />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.45} />
      </Canvas>
    </div>
  );
}
