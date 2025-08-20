import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

// Shader background component
interface ShaderBackgroundProps {
  config?: ShaderConfig;
}

const ShaderBackground = ({ config }: ShaderBackgroundProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const defaultConfig = {
    timeSpeed: 0.5,
    intensity: 1.0,
    colorShiftR: 6.0,
    colorShiftG: 1.0,
    colorShiftB: 2.0,
    complexity: 50.0,
    mixFactor: 0.3,
    scaleFactor: 0.2,
    waveAmplitude: 16.0,
    opacity: 0.6,
    redChannel: 0.3,
    greenChannel: 0.3,
    blueChannel: 0.3
  };

  const activeConfig = { ...defaultConfig, ...config };
  
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        t: { value: 0.0 },
        r: { value: new THREE.Vector2(1.0, 1.0) },
        timeSpeed: { value: activeConfig.timeSpeed },
        intensity: { value: activeConfig.intensity },
        colorShiftR: { value: activeConfig.colorShiftR },
        colorShiftG: { value: activeConfig.colorShiftG },
        colorShiftB: { value: activeConfig.colorShiftB },
        complexity: { value: activeConfig.complexity },
        mixFactor: { value: activeConfig.mixFactor },
        scaleFactor: { value: activeConfig.scaleFactor },
        waveAmplitude: { value: activeConfig.waveAmplitude },
        opacity: { value: activeConfig.opacity },
        redChannel: { value: activeConfig.redChannel },
        greenChannel: { value: activeConfig.greenChannel },
        blueChannel: { value: activeConfig.blueChannel },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float t;
        uniform vec2 r;
        uniform float timeSpeed;
        uniform float intensity;
        uniform float colorShiftR;
        uniform float colorShiftG;
        uniform float colorShiftB;
        uniform float complexity;
        uniform float mixFactor;
        uniform float scaleFactor;
        uniform float waveAmplitude;
        uniform float opacity;
        uniform float redChannel;
        uniform float greenChannel;
        uniform float blueChannel;
        varying vec2 vUv;
        
        void main() {
          vec2 FC = vUv * r;
          vec4 o = vec4(0.0);
          vec3 x = vec3(0.0), c, p;
          x.x += 9.0;
          
          float animTime = t * timeSpeed;
          
          for(float i = 0.0, z, f; i < complexity; i++) {
            p = mix(c, p, mixFactor);
            z += f = scaleFactor * (abs(p.z + p.x + waveAmplitude + tanh(p.y) / 0.1) + sin(p.x - p.z + animTime + animTime) + 1.0);
            o += (cos(p.x * 0.2 + f + vec4(colorShiftR, colorShiftG, colorShiftB, 0.0)) + 2.0) / f / z * intensity;
            
            for(c = p = z * normalize(vec3(FC, 0.0) * 2.0 - vec3(r, 0.0)), p.y *= f = 0.3; f < 5.0; f++) {
              p += cos(p.yzx * f + i + z + x * animTime) / f;
            }
          }
          
          o = tanh(o / 30.0);
          gl_FragColor = vec4(o.r * redChannel, o.g * greenChannel, o.b * blueChannel, opacity);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, [activeConfig]);

  useFrame((state) => {
    if (meshRef.current) {
      shaderMaterial.uniforms.t.value = state.clock.elapsedTime;
      shaderMaterial.uniforms.r.value.set(
        state.viewport.width,
        state.viewport.height
      );
      
      // Update uniforms from config
      shaderMaterial.uniforms.timeSpeed.value = activeConfig.timeSpeed;
      shaderMaterial.uniforms.intensity.value = activeConfig.intensity;
      shaderMaterial.uniforms.colorShiftR.value = activeConfig.colorShiftR;
      shaderMaterial.uniforms.colorShiftG.value = activeConfig.colorShiftG;
      shaderMaterial.uniforms.colorShiftB.value = activeConfig.colorShiftB;
      shaderMaterial.uniforms.complexity.value = activeConfig.complexity;
      shaderMaterial.uniforms.mixFactor.value = activeConfig.mixFactor;
      shaderMaterial.uniforms.scaleFactor.value = activeConfig.scaleFactor;
      shaderMaterial.uniforms.waveAmplitude.value = activeConfig.waveAmplitude;
      shaderMaterial.uniforms.opacity.value = activeConfig.opacity;
      shaderMaterial.uniforms.redChannel.value = activeConfig.redChannel;
      shaderMaterial.uniforms.greenChannel.value = activeConfig.greenChannel;
      shaderMaterial.uniforms.blueChannel.value = activeConfig.blueChannel;
    }
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial} position={[0, 0, -2]}>
      <planeGeometry args={[20, 20]} />
    </mesh>
  );
};

interface ShaderConfig {
  timeSpeed: number;
  intensity: number;
  colorShiftR: number;
  colorShiftG: number;
  colorShiftB: number;
  complexity: number;
  mixFactor: number;
  scaleFactor: number;
  waveAmplitude: number;
  opacity: number;
  redChannel: number;
  greenChannel: number;
  blueChannel: number;
}

interface BiologicalAgeVisualizationProps {
  biologicalAge: number;
  chronologicalAge: number;
  className?: string;
  config?: ShaderConfig;
}

const BiologicalAgeVisualization = ({ 
  biologicalAge, 
  chronologicalAge, 
  className = "",
  config
}: BiologicalAgeVisualizationProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="h-64 rounded-lg overflow-hidden bg-card/20 backdrop-blur-sm border border-neon/30">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <ShaderBackground config={config} />
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
      </div>
    </div>
  );
};

export default BiologicalAgeVisualization;
export type { ShaderConfig };