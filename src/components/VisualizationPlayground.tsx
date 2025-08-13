import { useState } from "react";
import BiologicalAgeVisualization from "./BiologicalAgeVisualization";
import VisualizationControls, { VisualizationConfig } from "./VisualizationControls";

const defaultConfig: VisualizationConfig = {
  nodeCount: 8,
  connectionDistance: 4.0,
  lineColor1: "#ffff00", // Yellow
  lineColor2: "#8b5cf6", // Purple
  lineColor3: "#00ffff", // Cyan
  animationSpeed: 4.0,
  electrodeSize: 0.06,
  glowIntensity: 2.0,
  rotationSpeed: 0.008,
  pulseIntensity: 1.0,
  cycleTime: 0.8,
  fadingSpeed: 2.0
};

interface VisualizationPlaygroundProps {
  biologicalAge: number;
  chronologicalAge: number;
  className?: string;
}

const VisualizationPlayground = ({ 
  biologicalAge, 
  chronologicalAge, 
  className = "" 
}: VisualizationPlaygroundProps) => {
  const [config, setConfig] = useState<VisualizationConfig>(defaultConfig);

  const handleReset = () => {
    setConfig(defaultConfig);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls Panel */}
        <div className="order-2 lg:order-1">
          <VisualizationControls
            config={config}
            onChange={setConfig}
            onReset={handleReset}
          />
        </div>
        
        {/* Visualization */}
        <div className="order-1 lg:order-2">
          <BiologicalAgeVisualization
            biologicalAge={biologicalAge}
            chronologicalAge={chronologicalAge}
            config={config}
          />
        </div>
      </div>
      
      {/* Configuration Preview */}
      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-muted-foreground mb-2">
          Show Configuration JSON
        </summary>
        <pre className="text-xs bg-muted p-3 rounded overflow-auto">
          {JSON.stringify(config, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default VisualizationPlayground;