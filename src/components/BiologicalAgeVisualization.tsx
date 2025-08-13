import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface PointCloudProps {
  targetAge: number;
  startAge: number;
}

const AnimatedPointCloud = ({ targetAge, startAge }: PointCloudProps) => {
  const ref = useRef<THREE.Points>(null);
  const [currentAge, setCurrentAge] = useState(startAge);
  const particleCount = targetAge * 50; // 50 particles per year

  // Generate sphere distribution for particles
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 4 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [particleCount]);

  // Animate age counting
  useEffect(() => {
    const duration = 3000; // 3 seconds
    const steps = targetAge - startAge;
    const stepDuration = duration / steps;
    
    let step = 0;
    const interval = setInterval(() => {
      if (step < steps) {
        setCurrentAge(startAge + step + 1);
        step++;
      } else {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [targetAge, startAge]);

  // Animate particles appearing based on current age
  const visibleParticles = useMemo(() => {
    const particlesPerAge = 50;
    return Math.min(currentAge * particlesPerAge, particleCount);
  }, [currentAge, particleCount]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors={false}
        opacity={0.8}
      />
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={visibleParticles}
          array={positions.slice(0, visibleParticles * 3)}
          itemSize={3}
        />
      </bufferGeometry>
    </Points>
  );
};

interface BiologicalAgeVisualizationProps {
  biologicalAge: number;
  chronologicalAge: number;
  className?: string;
}

const BiologicalAgeVisualization = ({ 
  biologicalAge, 
  chronologicalAge, 
  className = "" 
}: BiologicalAgeVisualizationProps) => {
  const [currentDisplayAge, setCurrentDisplayAge] = useState(1);

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const steps = biologicalAge - 1;
    const stepDuration = duration / steps;
    
    let step = 0;
    const interval = setInterval(() => {
      if (step < steps) {
        setCurrentDisplayAge(1 + step + 1);
        step++;
      } else {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [biologicalAge]);

  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-48 rounded-lg overflow-hidden bg-card/20 backdrop-blur-sm border border-neon/30">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
          <AnimatedPointCloud targetAge={biologicalAge} startAge={1} />
        </Canvas>
        
        {/* Overlay text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-6xl font-bold font-parkinsans text-neon neon-glow mb-2">
              {currentDisplayAge}
            </div>
            <div className="text-sm text-muted-foreground font-light">
              vs {chronologicalAge} chronological
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiologicalAgeVisualization;