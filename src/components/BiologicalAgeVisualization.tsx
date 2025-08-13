import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
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

interface WireframeNetworkProps {
  age: number;
  onNodeClick: () => void;
}

const WireframeNetwork = ({ age, onNodeClick }: WireframeNetworkProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const [pulseTime, setPulseTime] = useState(0);
  const { raycaster, camera, gl } = useThree();
  
  // Generate network nodes based on age
  const { nodes, connections } = useMemo(() => {
    const nodeCount = Math.min(age, 20); // Max 20 nodes for performance
    const nodes: THREE.Vector3[] = [];
    const connections: [number, number][] = [];
    
    // Create nodes in a sphere formation
    for (let i = 0; i < nodeCount; i++) {
      const radius = 2 + Math.random() * 1.5;
      const theta = (i / nodeCount) * Math.PI * 2;
      const phi = Math.acos(1 - 2 * Math.random());
      
      nodes.push(new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ));
    }
    
    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.5) {
          connections.push([i, j]);
        }
      }
    }
    
    return { nodes, connections };
  }, [age]);

  // Handle click detection
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!groupRef.current) return;
      
      const rect = gl.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(groupRef.current.children, true);
      
      if (intersects.length > 0) {
        onNodeClick();
      }
    };
    
    gl.domElement.addEventListener('click', handleClick);
    return () => gl.domElement.removeEventListener('click', handleClick);
  }, [raycaster, camera, gl, onNodeClick]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    
    // Continuous pulsing animation
    setPulseTime(state.clock.elapsedTime * 2);
    
    // Update text color and scale based on pulse
    if (textRef.current) {
      const pulseIntensity = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 0.7;
      textRef.current.scale.setScalar(0.8 + pulseIntensity * 0.2);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Age Display */}
      <mesh ref={textRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial 
          color="#ff00ff"
          transparent
          opacity={0.3}
          wireframe={true}
        />
      </mesh>
      
      {/* Age Number as 3D Text using basic geometry */}
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[0.8, 1.2, 8]} />
        <meshBasicMaterial 
          color="#00ffff"
          transparent
          opacity={Math.sin(pulseTime) * 0.3 + 0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Render nodes */}
      {nodes.map((node, index) => {
        const intensity = Math.sin(pulseTime * 2 - index * 0.2) * 0.5 + 0.5;
        return (
          <mesh key={`node-${index}`} position={node}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial 
              color="#00ffff" 
              transparent
              opacity={0.5 + intensity * 0.5}
            />
          </mesh>
        );
      })}
      
      {/* Render connections */}
      {connections.map(([start, end], index) => {
        const points = [nodes[start], nodes[end]];
        const intensity = Math.sin(pulseTime * 3 - index * 0.1) * 0.5 + 0.5;
        
        return (
          <Line
            key={`connection-${index}`}
            points={points}
            color="#ff00ff"
            lineWidth={1}
            transparent
            opacity={intensity * 0.8}
          />
        );
      })}
    </group>
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

  const handleNodeClick = () => {
    console.log('Network node clicked! Energy pulse activated.');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="h-64 rounded-lg overflow-hidden bg-card/20 backdrop-blur-sm border border-neon/30 cursor-pointer">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[8, 8, 8]} intensity={0.8} color="#00ffff" />
          <pointLight position={[-8, -8, -8]} intensity={0.4} color="#ff00ff" />
          <WireframeNetwork age={chronologicalAge} onNodeClick={handleNodeClick} />
        </Canvas>
        
        {/* Floating Chronological Age Display */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-6xl font-bold font-parkinsans text-neon neon-glow mb-2 animate-pulse">
              {chronologicalAge}
            </div>
            <div className="text-sm text-muted-foreground font-light">
              chronological age
            </div>
          </div>
        </div>
        
        {/* Click hint */}
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground/70 font-light pointer-events-none">
          click network to pulse
        </div>
      </div>
    </div>
  );
};

export default BiologicalAgeVisualization;