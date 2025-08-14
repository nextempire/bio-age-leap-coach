import { useState } from "react";
import BiologicalAgeVisualization from "./BiologicalAgeVisualization";
import VisualizationControls, { VisualizationConfig } from "./VisualizationControls";

const defaultConfig: VisualizationConfig = {
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