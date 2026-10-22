import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const techItems = [
  { name: "JAVA", sub: "Spigot & Core" },
  { name: "PYTHON", sub: "Backend & Tools" },
  { name: "DOCKER", sub: "Containers" },
  { name: "SUPABASE", sub: "Postgres & BaaS" },
  { name: "LINUX", sub: "VPS & Ubuntu" },
  { name: "GODOT", sub: "Game Engine" },
  { name: "NODE.JS", sub: "APIs & Services" },
  { name: "TYPESCRIPT", sub: "Full Stack" },
  { name: "MINECRAFT", sub: "Modding & Mixins" },
  { name: "MYSQL", sub: "Databases" },
  { name: "CLOUDFLARE", sub: "CDN & Security" },
  { name: "C#", sub: "Launchers & UX" },
];

function createTechTexture(name: string, sub: string) {
  if (typeof document === "undefined") return new THREE.Texture();
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  ctx.fillStyle = "#07120a";
  ctx.fillRect(0, 0, 512, 512);

  // Outer ring
  ctx.strokeStyle = "#10b981";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(256, 256, 230, 0, Math.PI * 2);
  ctx.stroke();

  // Subtle inner grid lines
  ctx.strokeStyle = "rgba(16, 185, 129, 0.12)";
  ctx.lineWidth = 2;
  for (let i = 80; i < 512; i += 60) {
    ctx.beginPath();
    ctx.moveTo(i, 60);
    ctx.lineTo(i, 452);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(60, i);
    ctx.lineTo(452, i);
    ctx.stroke();
  }

  // Radial green glow
  const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 230);
  grad.addColorStop(0, "rgba(52, 211, 153, 0.35)");
  grad.addColorStop(0.7, "rgba(16, 185, 129, 0.15)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0.85)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(256, 256, 222, 0, Math.PI * 2);
  ctx.fill();

  // Center badge pill
  ctx.fillStyle = "rgba(16, 185, 129, 0.25)";
  ctx.strokeStyle = "#34d399";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.rect(86, 170, 340, 110);
  ctx.fill();
  ctx.stroke();

  // Main Text
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 50px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(name, 256, 225);

  // Subtitle
  ctx.fillStyle = "#6ee7b7";
  ctx.font = "600 24px Arial, sans-serif";
  ctx.fillText(sub, 256, 325);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(24)].map(() => ({
  scale: [0.75, 0.9, 0.8, 1, 0.85][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!api.current) return;
    const translation = api.current.translation();

    // Strict containment bounds so spheres NEVER fly outside
    if (
      Math.abs(translation.x) > 13 ||
      Math.abs(translation.y) > 8 ||
      Math.abs(translation.z) > 8
    ) {
      api.current.setTranslation(
        {
          x: THREE.MathUtils.clamp(translation.x, -11, 11),
          y: THREE.MathUtils.clamp(translation.y, -6, 6),
          z: THREE.MathUtils.clamp(translation.z, -6, 6),
        },
        true
      );
      api.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }

    if (!isActive) return;
    delta = Math.min(0.05, delta);
    const impulse = vec
      .copy(translation)
      .normalize()
      .multiply(
        new THREE.Vector3(
          -35 * delta * scale,
          -80 * delta * scale,
          -35 * delta * scale
        )
      );

    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.85}
      angularDamping={0.3}
      friction={0.3}
      position={[r(12), r(10), r(8)]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2.2,
        (pointer.y * viewport.height) / 2.2,
        0
      ),
      0.15
    );
    ref.current.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[1.8]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const materials = useMemo(() => {
    const textures = techItems.map((item) =>
      createTechTexture(item.name, item.sub)
    );
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#10b981",
          emissiveMap: texture,
          emissiveIntensity: 0.25,
          metalness: 0.6,
          roughness: 0.8,
          clearcoat: 0.2,
        })
    );
  }, []);

  return (
    <div className="techstack" ref={containerRef}>
      <h2> My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 60 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1.2} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="#34d399"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} color="#10b981" />
        <Physics gravity={[0, 0, 0]} paused={!isActive}>
          <Pointer isActive={isActive} />
          {/* Boundary colliders to keep spheres inside the canvas */}
          <CuboidCollider args={[15, 1, 10]} position={[0, -9, 0]} />
          <CuboidCollider args={[15, 1, 10]} position={[0, 9, 0]} />
          <CuboidCollider args={[1, 10, 10]} position={[-14, 0, 0]} />
          <CuboidCollider args={[1, 10, 10]} position={[14, 0, 0]} />
          <CuboidCollider args={[15, 10, 1]} position={[0, 0, -8]} />
          <CuboidCollider args={[15, 10, 1]} position={[0, 0, 8]} />

          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[i % materials.length]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#01170d" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
