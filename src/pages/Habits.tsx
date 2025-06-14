
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
      movement: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
      nutrition: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      recovery: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      mind: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-2 sm:p-4 font-parkinsans">
      <BackToHome />
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-center py-4 sm:py-6">
          <h1 className="text-2xl sm:text-3xl font-bold font-parkinsans text-gray-900 dark:text-white mb-2">Daily Habits</h1>
          <p className="text-gray-600 dark:text-gray-300 font-light">Build consistency, extend healthspan</p>
        </div>

        {/* Progress Summary */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-700 dark:to-pink-700 text-white border-none shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold font-parkinsans">Today's Progress</h2>
                <p className="text-purple-100 dark:text-purple-200 font-light">Keep building those healthy patterns</p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-2xl sm:text-3xl font-bold font-parkinsans">{completedToday}/{totalHabits}</div>
                <p className="text-purple-100 dark:text-purple-200 font-light">habits completed</p>
              </div>
            </div>
            <Progress value={(completedToday / totalHabits) * 100} className="h-3 bg-purple-300 dark:bg-purple-600" />
          </CardContent>
        </Card>

        {/* Habit List */}
        <div className="space-y-3 sm:space-y-4">
          {habits.map((habit) => (
            <Card key={habit.id} className={`transition-all duration-200 hover:shadow-md dark:bg-gray-800 dark:border-gray-700 ${habit.completed ? 'ring-2 ring-green-200 dark:ring-green-700 bg-green-50 dark:bg-green-900/20' : ''}`}>
              <CardContent className="p-3 sm:p-6">
                <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                    <div className="text-xl sm:text-2xl flex-shrink-0">{habit.icon}</div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white font-parkinsans text-sm sm:text-base truncate">{habit.name}</h3>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                        <Badge variant="secondary" className={`${getCategoryColor(habit.category)} font-light text-xs`}>
                          {habit.category}
                        </Badge>
                        <Badge variant="outline" className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700 font-light text-xs">
                          🔥 {habit.streak} day streak
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-6">
                    <div className="flex-1 sm:text-right sm:min-w-[120px]">
                      <div className="flex items-center justify-start sm:justify-end space-x-2 mb-2">
                        <Target className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-light truncate">
                          {habit.current}/{habit.target} {habit.unit}
                        </span>
                      </div>
                      <div className="flex justify-start sm:justify-end">
                        <Progress 
                          value={(habit.current / habit.target) * 100} 
                          className="w-20 sm:w-24 h-2"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() => toggleHabit(habit.id)}
                      variant={habit.completed ? "default" : "outline"}
                      size="icon"
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0 ${
                        habit.completed 
                          ? 'bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600'
                      }`}
                    >
                      {habit.completed ? (
                        <Check className="w-4 h-4 sm:w-6 sm:h-6" />
                      ) : (
                        <Plus className="w-4 h-4 sm:w-6 sm:h-6" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add New Habit */}
        <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors dark:bg-gray-800">
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 font-parkinsans text-sm sm:text-base">Add New Habit</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 font-light text-xs sm:text-sm">Create a custom habit to track</p>
              <Button variant="outline" onClick={() => setShowCreateForm(true)} className="text-sm dark:border-gray-600 dark:hover:bg-gray-700">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
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
