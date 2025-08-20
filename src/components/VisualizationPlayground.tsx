import { useState } from "react";
import BiologicalAgeVisualization, { ShaderConfig } from "./BiologicalAgeVisualization";
import VisualizationControls from "./VisualizationControls";

const defaultConfig: ShaderConfig = {
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
  const [config, setConfig] = useState<ShaderConfig>(defaultConfig);

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