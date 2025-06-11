import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, Plus, Target, Zap } from 'lucide-react';
import HabitForm from '@/components/HabitForm';
import BackToHome from '@/components/BackToHome';

interface Habit {
  id: number;
  name: string;
  streak: number;
  completed: boolean;
  target: number;
  current: number;
  unit: string;
  category: 'movement' | 'nutrition' | 'recovery' | 'mind';
  icon: string;
}

const Habits = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: 'Morning Cardio',
      streak: 5,
      completed: false,
      target: 30,
      current: 24,
      unit: 'minutes',
      category: 'movement',
      icon: '🏃'
    },
    {
      id: 2,
      name: 'Hydration',
      streak: 12,
      completed: false,
      target: 8,
      current: 5,
      unit: 'glasses',
      category: 'nutrition',
      icon: '💧'
    },
    {
      id: 3,
      name: 'Quality Sleep',
      streak: 3,
      completed: true,
      target: 8,
      current: 8.2,
      unit: 'hours',
      category: 'recovery',
      icon: '😴'
    },
    {
      id: 4,
      name: 'Mindfulness',
      streak: 7,
      completed: true,
      target: 10,
      current: 15,
      unit: 'minutes',
      category: 'mind',
      icon: '🧘'
    }
  ]);

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completed: !habit.completed, current: habit.completed ? 0 : habit.target }
        : habit
    ));
  };

  const handleHabitCreate = (newHabitData: {
    name: string;
    category: string;
    target: number;
    unit: string;
    icon: string;
  }) => {
    const newHabit: Habit = {
      id: Date.now(),
      streak: 0,
      completed: false,
      current: 0,
      ...newHabitData,
      category: newHabitData.category as 'movement' | 'nutrition' | 'recovery' | 'mind'
    };
    setHabits([...habits, newHabit]);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      movement: 'bg-red-100 text-red-700',
      nutrition: 'bg-blue-100 text-blue-700',
      recovery: 'bg-purple-100 text-purple-700',
      mind: 'bg-green-100 text-green-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 font-parkinsans">
      <BackToHome />
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold font-parkinsans text-gray-900 mb-2">Daily Habits</h1>
          <p className="text-gray-600 font-light">Build consistency, extend healthspan</p>
        </div>

        {/* Progress Summary */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold font-parkinsans">Today's Progress</h2>
                <p className="text-purple-100 font-light">Keep building those healthy patterns</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold font-parkinsans">{completedToday}/{totalHabits}</div>
                <p className="text-purple-100 font-light">habits completed</p>
              </div>
            </div>
            <Progress value={(completedToday / totalHabits) * 100} className="h-3 bg-purple-300" />
          </CardContent>
        </Card>

        {/* Habit List */}
        <div className="space-y-4">
          {habits.map((habit) => (
            <Card key={habit.id} className={`transition-all duration-200 hover:shadow-md ${habit.completed ? 'ring-2 ring-green-200 bg-green-50' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{habit.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 font-parkinsans">{habit.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className={`${getCategoryColor(habit.category)} font-light`}>
                          {habit.category}
                        </Badge>
                        <Badge variant="outline" className="bg-orange-100 text-orange-700 font-light">
                          🔥 {habit.streak} day streak
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right min-w-[120px]">
                      <div className="flex items-center justify-end space-x-2 mb-2">
                        <Target className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 font-light">
                          {habit.current}/{habit.target} {habit.unit}
                        </span>
                      </div>
                      <div className="flex justify-end">
                        <Progress 
                          value={(habit.current / habit.target) * 100} 
                          className="w-24 h-2"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() => toggleHabit(habit.id)}
                      variant={habit.completed ? "default" : "outline"}
                      size="lg"
                      className={`w-12 h-12 rounded-full ${
                        habit.completed 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {habit.completed ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <Plus className="w-6 h-6" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add New Habit */}
        <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 font-parkinsans">Add New Habit</h3>
              <p className="text-gray-600 mb-4 font-light">Create a custom habit to track</p>
              <Button variant="outline" onClick={() => setShowCreateForm(true)}>
                <Zap className="w-4 h-4 mr-2" />
                Create Habit
              </Button>
            </div>
          </CardContent>
        </Card>

        <HabitForm 
          open={showCreateForm}
          onOpenChange={setShowCreateForm}
          onHabitCreate={handleHabitCreate}
        />
      </div>
    </div>
  );
};

export default Habits;
