import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ShaderConfig } from "./BiologicalAgeVisualization";

interface VisualizationControlsProps {
  config: ShaderConfig;
  onChange: (config: ShaderConfig) => void;
  onReset: () => void;
}

const VisualizationControls = ({ config, onChange, onReset }: VisualizationControlsProps) => {
  const updateConfig = (key: keyof ShaderConfig, value: number) => {
    onChange({
      ...config,
      [key]: value
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Shader Animation Controls</CardTitle>
        <CardDescription>
          Customize the shader animation behind the chronological age display
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Animation Controls */}
        <div className="space-y-4">
          <div className="text-sm font-medium">Animation</div>
          
          <div className="space-y-2">
            <Label htmlFor="timeSpeed">Time Speed ({config.timeSpeed.toFixed(1)})</Label>
            <Slider
              id="timeSpeed"
              min={0.0}
              max={2.0}
              step={0.1}
              value={[config.timeSpeed]}
              onValueChange={(value) => updateConfig('timeSpeed', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="intensity">Intensity ({config.intensity.toFixed(1)})</Label>
            <Slider
              id="intensity"
              min={0.1}
              max={3.0}
              step={0.1}
              value={[config.intensity]}
              onValueChange={(value) => updateConfig('intensity', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="complexity">Complexity ({config.complexity.toFixed(0)})</Label>
            <Slider
              id="complexity"
              min={10}
              max={100}
              step={5}
              value={[config.complexity]}
              onValueChange={(value) => updateConfig('complexity', value[0])}
            />
          </div>
        </div>

        <Separator />

        {/* Pattern Controls */}
        <div className="space-y-4">
          <div className="text-sm font-medium">Pattern</div>
          
          <div className="space-y-2">
            <Label htmlFor="mixFactor">Mix Factor ({config.mixFactor.toFixed(2)})</Label>
            <Slider
              id="mixFactor"
              min={0.0}
              max={1.0}
              step={0.05}
              value={[config.mixFactor]}
              onValueChange={(value) => updateConfig('mixFactor', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="scaleFactor">Scale Factor ({config.scaleFactor.toFixed(2)})</Label>
            <Slider
              id="scaleFactor"
              min={0.05}
              max={0.5}
              step={0.05}
              value={[config.scaleFactor]}
              onValueChange={(value) => updateConfig('scaleFactor', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="waveAmplitude">Wave Amplitude ({config.waveAmplitude.toFixed(1)})</Label>
            <Slider
              id="waveAmplitude"
              min={5.0}
              max={50.0}
              step={1.0}
              value={[config.waveAmplitude]}
              onValueChange={(value) => updateConfig('waveAmplitude', value[0])}
            />
          </div>
        </div>

        <Separator />

        {/* Color Controls */}
        <div className="space-y-4">
          <div className="text-sm font-medium">Color Shifts</div>
          
          <div className="space-y-2">
            <Label htmlFor="colorShiftR">Red Shift ({config.colorShiftR.toFixed(1)})</Label>
            <Slider
              id="colorShiftR"
              min={0.0}
              max={10.0}
              step={0.5}
              value={[config.colorShiftR]}
              onValueChange={(value) => updateConfig('colorShiftR', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="colorShiftG">Green Shift ({config.colorShiftG.toFixed(1)})</Label>
            <Slider
              id="colorShiftG"
              min={0.0}
              max={10.0}
              step={0.5}
              value={[config.colorShiftG]}
              onValueChange={(value) => updateConfig('colorShiftG', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="colorShiftB">Blue Shift ({config.colorShiftB.toFixed(1)})</Label>
            <Slider
              id="colorShiftB"
              min={0.0}
              max={10.0}
              step={0.5}
              value={[config.colorShiftB]}
              onValueChange={(value) => updateConfig('colorShiftB', value[0])}
            />
          </div>
        </div>

        <Separator />

        {/* Channel Controls */}
        <div className="space-y-4">
          <div className="text-sm font-medium">Color Channels</div>
          
          <div className="space-y-2">
            <Label htmlFor="redChannel">Red Channel ({config.redChannel.toFixed(2)})</Label>
            <Slider
              id="redChannel"
              min={0.0}
              max={1.0}
              step={0.05}
              value={[config.redChannel]}
              onValueChange={(value) => updateConfig('redChannel', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="greenChannel">Green Channel ({config.greenChannel.toFixed(2)})</Label>
            <Slider
              id="greenChannel"
              min={0.0}
              max={1.0}
              step={0.05}
              value={[config.greenChannel]}
              onValueChange={(value) => updateConfig('greenChannel', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="blueChannel">Blue Channel ({config.blueChannel.toFixed(2)})</Label>
            <Slider
              id="blueChannel"
              min={0.0}
              max={1.0}
              step={0.05}
              value={[config.blueChannel]}
              onValueChange={(value) => updateConfig('blueChannel', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="opacity">Opacity ({config.opacity.toFixed(2)})</Label>
            <Slider
              id="opacity"
              min={0.0}
              max={1.0}
              step={0.05}
              value={[config.opacity]}
              onValueChange={(value) => updateConfig('opacity', value[0])}
            />
          </div>
        </div>

        <Separator />

        <Button onClick={onReset} variant="outline" className="w-full">
          Reset to Default
        </Button>
      </CardContent>
    </Card>
  );
};

export default VisualizationControls;