import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

interface VisualizationControlsProps {
  config: VisualizationConfig;
  onChange: (config: VisualizationConfig) => void;
  onReset: () => void;
}

const VisualizationControls = ({ config, onChange, onReset }: VisualizationControlsProps) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Nucleus Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Structure */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Structure</h3>
          
          <div className="space-y-2">
            <Label>Electrode Count: {config.electrodeCount}</Label>
            <Slider
              value={[config.electrodeCount]}
              onValueChange={(value) => onChange({ ...config, electrodeCount: value[0] })}
              max={12}
              min={3}
              step={1}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Orbit Radius: {config.orbitRadius.toFixed(1)}</Label>
            <Slider
              value={[config.orbitRadius]}
              onValueChange={(value) => onChange({ ...config, orbitRadius: value[0] })}
              max={4.0}
              min={1.5}
              step={0.1}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Nucleus Size: {config.nucleusSize.toFixed(2)}</Label>
            <Slider
              value={[config.nucleusSize]}
              onValueChange={(value) => onChange({ ...config, nucleusSize: value[0] })}
              max={0.8}
              min={0.2}
              step={0.05}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Electrode Size: {config.electrodeSize.toFixed(3)}</Label>
            <Slider
              value={[config.electrodeSize]}
              onValueChange={(value) => onChange({ ...config, electrodeSize: value[0] })}
              max={0.15}
              min={0.03}
              step={0.01}
              className="w-full"
            />
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Colors</h3>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-2">
              <Label>Nucleus</Label>
              <Input
                type="color"
                value={config.nucleusColor}
                onChange={(e) => onChange({ ...config, nucleusColor: e.target.value })}
                className="h-8 w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Electrodes</Label>
              <Input
                type="color"
                value={config.electrodeColor}
                onChange={(e) => onChange({ ...config, electrodeColor: e.target.value })}
                className="h-8 w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Electricity</Label>
              <Input
                type="color"
                value={config.electricityColor}
                onChange={(e) => onChange({ ...config, electricityColor: e.target.value })}
                className="h-8 w-full"
              />
            </div>
          </div>
        </div>

        {/* Animation */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Animation</h3>
          
          <div className="space-y-2">
            <Label>Animation Speed: {config.animationSpeed.toFixed(1)}</Label>
            <Slider
              value={[config.animationSpeed]}
              onValueChange={(value) => onChange({ ...config, animationSpeed: value[0] })}
              max={3.0}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Orbit Speed: {config.orbitSpeed.toFixed(1)}</Label>
            <Slider
              value={[config.orbitSpeed]}
              onValueChange={(value) => onChange({ ...config, orbitSpeed: value[0] })}
              max={1.0}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Rotation Speed: {config.rotationSpeed.toFixed(1)}</Label>
            <Slider
              value={[config.rotationSpeed]}
              onValueChange={(value) => onChange({ ...config, rotationSpeed: value[0] })}
              max={2.0}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Pulse Intensity: {config.pulseIntensity.toFixed(1)}</Label>
            <Slider
              value={[config.pulseIntensity]}
              onValueChange={(value) => onChange({ ...config, pulseIntensity: value[0] })}
              max={2.0}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        {/* Electricity Effects */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Electricity</h3>
          
          <div className="space-y-2">
            <Label>Electricity Intensity: {config.electricityIntensity.toFixed(1)}</Label>
            <Slider
              value={[config.electricityIntensity]}
              onValueChange={(value) => onChange({ ...config, electricityIntensity: value[0] })}
              max={2.0}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>
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