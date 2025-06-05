
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';

interface HabitFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onHabitCreate: (habit: {
    name: string;
    category: string;
    target: number;
    unit: string;
    icon: string;
  }) => void;
}

const HabitForm = ({ open, onOpenChange, onHabitCreate }: HabitFormProps) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('movement');
  const [target, setTarget] = useState(1);
  const [unit, setUnit] = useState('');

  const categories = {
    movement: { icon: '🏃', color: 'bg-red-100 text-red-700' },
    nutrition: { icon: '🥗', color: 'bg-blue-100 text-blue-700' },
    recovery: { icon: '😴', color: 'bg-purple-100 text-purple-700' },
    mind: { icon: '🧘', color: 'bg-green-100 text-green-700' }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !unit) return;

    onHabitCreate({
      name,
      category,
      target,
      unit,
      icon: categories[category as keyof typeof categories].icon
    });

    // Reset form
    setName('');
    setCategory('movement');
    setTarget(1);
    setUnit('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Habit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Habit Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Morning Run"
              required
            />
          </div>

          <div>
            <Label>Category</Label>
            <RadioGroup value={category} onValueChange={setCategory} className="mt-2">
              {Object.entries(categories).map(([key, { icon, color }]) => (
                <div key={key} className="flex items-center space-x-2">
                  <RadioGroupItem value={key} id={key} />
                  <Label htmlFor={key} className="flex items-center space-x-2 cursor-pointer">
                    <span className="text-lg">{icon}</span>
                    <Badge variant="secondary" className={color}>
                      {key}
                    </Badge>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="target">Daily Target</Label>
              <Input
                id="target"
                type="number"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                min="1"
                required
              />
            </div>
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g., minutes, glasses"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Habit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HabitForm;
