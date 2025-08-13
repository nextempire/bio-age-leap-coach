import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface VisualizationConfig {
  nodeCount: number;
  connectionDistance: number;
  lineColor1: string;
  lineColor2: string;
  animationSpeed: number;
  electrodeSize: number;
  glowIntensity: number;
  rotationSpeed: number;
  pulseIntensity: number;
  cycleTime: number;
}

interface VisualizationControlsProps {
  config: VisualizationConfig;
  onChange: (config: VisualizationConfig) => void;
  onReset: () => void;
}

const VisualizationControls = ({ config, onChange, onReset }: VisualizationControlsProps) => {
  const updateConfig = (key: keyof VisualizationConfig, value: number | string) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg">Visualization Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Node Configuration */}
        <div className="space-y-2">
          <Label>Node Count: {config.nodeCount}</Label>
          <Slider
            value={[config.nodeCount]}
            onValueChange={([value]) => updateConfig('nodeCount', value)}
            min={4}
            max={20}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Connection Distance: {config.connectionDistance.toFixed(1)}</Label>
          <Slider
            value={[config.connectionDistance]}
            onValueChange={([value]) => updateConfig('connectionDistance', value)}
            min={1.5}
            max={6.0}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Line Color 1</Label>
            <Input
              type="color"
              value={config.lineColor1}
              onChange={(e) => updateConfig('lineColor1', e.target.value)}
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label>Line Color 2</Label>
            <Input
              type="color"
              value={config.lineColor2}
              onChange={(e) => updateConfig('lineColor2', e.target.value)}
              className="h-10"
            />
          </div>
        </div>

        {/* Animation Settings */}
        <div className="space-y-2">
          <Label>Animation Speed: {config.animationSpeed.toFixed(1)}x</Label>
          <Slider
            value={[config.animationSpeed]}
            onValueChange={([value]) => updateConfig('animationSpeed', value)}
            min={0.1}
            max={5.0}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Rotation Speed: {config.rotationSpeed.toFixed(3)}</Label>
          <Slider
            value={[config.rotationSpeed]}
            onValueChange={([value]) => updateConfig('rotationSpeed', value)}
            min={0.001}
            max={0.02}
            step={0.001}
            className="w-full"
          />
        </div>

        {/* Electrode Settings */}
        <div className="space-y-2">
          <Label>Electrode Size: {config.electrodeSize.toFixed(2)}</Label>
          <Slider
            value={[config.electrodeSize]}
            onValueChange={([value]) => updateConfig('electrodeSize', value)}
            min={0.02}
            max={0.15}
            step={0.01}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Glow Intensity: {config.glowIntensity.toFixed(1)}</Label>
          <Slider
            value={[config.glowIntensity]}
            onValueChange={([value]) => updateConfig('glowIntensity', value)}
            min={0.1}
            max={3.0}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Cycle Time: {config.cycleTime.toFixed(1)}s</Label>
          <Slider
            value={[config.cycleTime]}
            onValueChange={([value]) => updateConfig('cycleTime', value)}
            min={0.2}
            max={3.0}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Pulse Intensity: {config.pulseIntensity.toFixed(1)}</Label>
          <Slider
            value={[config.pulseIntensity]}
            onValueChange={([value]) => updateConfig('pulseIntensity', value)}
            min={0.1}
            max={2.0}
            step={0.1}
            className="w-full"
          />
        </div>

        <Button onClick={onReset} variant="outline" className="w-full">
          Reset to Defaults
        </Button>
      </CardContent>
    </Card>
  );
};

export default VisualizationControls;
export type { VisualizationConfig };