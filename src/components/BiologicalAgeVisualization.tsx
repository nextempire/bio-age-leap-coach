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

interface NucleusVisualizationProps {
  age: number;
  onNodeClick: () => void;
  config?: VisualizationConfig;
}

const NucleusVisualization = ({ age, onNodeClick, config }: NucleusVisualizationProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const nucleusRef = useRef<THREE.Mesh>(null);
  const electrodesRef = useRef<THREE.Group>(null);
  const [pulseTime, setPulseTime] = useState(0);
  const { raycaster, camera, gl } = useThree();
  
  // Default config values
  const defaultConfig = {
    electrodeCount: 6,
    orbitRadius: 2.5,
    nucleusColor: "#ffffff",
    electrodeColor: "#00ffff",
    electricityColor: "#ffff00",
    animationSpeed: 1.0,
    electrodeSize: 0.08,
    nucleusSize: 0.4,
    electricityIntensity: 1.0,
    rotationSpeed: 0.5,
    pulseIntensity: 1.0,
    orbitSpeed: 0.3
  };

  const activeConfig = { ...defaultConfig, ...config };
  
  // Generate orbiting electrodes
  const electrodes = useMemo(() => {
    const electrodeCount = activeConfig.electrodeCount;
    const electrodes: { 
      id: number, 
      orbitRadius: number, 
      orbitSpeed: number, 
      orbitOffset: number,
      verticalOffset: number 
    }[] = [];
    
    for (let i = 0; i < electrodeCount; i++) {
      electrodes.push({
        id: i,
        orbitRadius: activeConfig.orbitRadius + (Math.random() - 0.5) * 0.8,
        orbitSpeed: activeConfig.orbitSpeed + (Math.random() - 0.5) * 0.3,
        orbitOffset: (i / electrodeCount) * Math.PI * 2,
        verticalOffset: (Math.random() - 0.5) * 1.0
      });
    }
    
    return electrodes;
  }, [age, activeConfig.electrodeCount, activeConfig.orbitRadius, activeConfig.orbitSpeed]);

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
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y += activeConfig.rotationSpeed * 0.01;
    }
    
    setPulseTime(state.clock.elapsedTime * activeConfig.animationSpeed);
    
    // Animate nucleus pulsing
    if (nucleusRef.current) {
      const pulseIntensity = Math.sin(state.clock.elapsedTime * 4) * 0.2 * activeConfig.pulseIntensity + 1.0;
      nucleusRef.current.scale.setScalar(pulseIntensity);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Nucleus */}
      <mesh ref={nucleusRef} position={[0, 0, 0]}>
        <sphereGeometry args={[activeConfig.nucleusSize, 32, 32]} />
        <meshBasicMaterial 
          color={activeConfig.nucleusColor}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* Nucleus glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[activeConfig.nucleusSize * 1.5, 16, 16]} />
        <meshBasicMaterial 
          color={activeConfig.nucleusColor}
          transparent
          opacity={Math.sin(pulseTime * 2) * 0.2 + 0.3}
        />
      </mesh>
      
      {/* Age Number Display */}
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[activeConfig.nucleusSize * 1.8, activeConfig.nucleusSize * 2.2, 8]} />
        <meshBasicMaterial 
          color={activeConfig.nucleusColor}
          transparent
          opacity={Math.sin(pulseTime) * 0.3 + 0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Orbiting Electrodes */}
      <group ref={electrodesRef}>
        {electrodes.map((electrode, index) => {
          const time = pulseTime * electrode.orbitSpeed;
          const angle = time + electrode.orbitOffset;
          
          // Calculate orbital position
          const position = new THREE.Vector3(
            Math.cos(angle) * electrode.orbitRadius,
            electrode.verticalOffset + Math.sin(time * 2) * 0.3,
            Math.sin(angle) * electrode.orbitRadius
          );
          
          // Electricity arc to nucleus
          const electricityIntensity = Math.sin(time * 3 + index) * 0.5 + 0.5;
          const arcMidPoint = position.clone().multiplyScalar(0.5);
          const arcDistance = position.length();
          
          return (
            <group key={`electrode-${index}`}>
              {/* Orbiting electrode */}
              <mesh position={position}>
                <sphereGeometry args={[activeConfig.electrodeSize, 12, 12]} />
                <meshBasicMaterial 
                  color={activeConfig.electrodeColor}
                  transparent
                  opacity={0.9}
                />
              </mesh>
              
              {/* Electrode glow */}
              <mesh position={position}>
                <sphereGeometry args={[activeConfig.electrodeSize * 2, 8, 8]} />
                <meshBasicMaterial 
                  color={activeConfig.electrodeColor}
                  transparent
                  opacity={0.3}
                />
              </mesh>
              
              {/* Electricity arc connection to nucleus */}
              <mesh position={arcMidPoint}>
                <ringGeometry args={[arcDistance * 0.01, arcDistance * 0.03, 8]} />
                <meshBasicMaterial 
                  color={activeConfig.electricityColor}
                  transparent
                  opacity={electricityIntensity * activeConfig.electricityIntensity * 0.8}
                  side={THREE.DoubleSide}
                />
              </mesh>
              
              {/* Electric spark particles */}
              {Array.from({ length: 3 }).map((_, sparkIndex) => {
                const sparkProgress = (sparkIndex + 1) / 4;
                const sparkPosition = new THREE.Vector3()
                  .lerpVectors(new THREE.Vector3(0, 0, 0), position, sparkProgress)
                  .add(new THREE.Vector3(
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1
                  ));
                
                return (
                  <mesh key={`spark-${sparkIndex}`} position={sparkPosition}>
                    <sphereGeometry args={[0.01 * (1 - sparkProgress), 4, 4]} />
                    <meshBasicMaterial 
                      color={activeConfig.electricityColor}
                      transparent
                      opacity={(1 - sparkProgress) * electricityIntensity * activeConfig.electricityIntensity}
                    />
                  </mesh>
                );
              })}
              
              {/* Orbital trail */}
              <mesh position={position}>
                <ringGeometry args={[electrode.orbitRadius * 0.98, electrode.orbitRadius * 1.02, 64]} />
                <meshBasicMaterial 
                  color={activeConfig.electrodeColor}
                  transparent
                  opacity={0.1}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
};

interface VisualizationConfig {
  electrodeCount: number;
  orbitRadius: number;
  nucleusColor: string;
  electrodeColor: string;
  electricityColor: string;
  animationSpeed: number;
  electrodeSize: number;
  nucleusSize: number;
  electricityIntensity: number;
  rotationSpeed: number;
  pulseIntensity: number;
  orbitSpeed: number;
}

interface BiologicalAgeVisualizationProps {
  biologicalAge: number;
  chronologicalAge: number;
  className?: string;
  config?: VisualizationConfig;
}

const BiologicalAgeVisualization = ({ 
  biologicalAge, 
  chronologicalAge, 
  className = "",
  config
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
          <NucleusVisualization age={chronologicalAge} onNodeClick={handleNodeClick} config={config} />
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