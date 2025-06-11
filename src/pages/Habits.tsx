import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, CheckCircle, Circle, Flame, Target, TrendingUp } from 'lucide-react';
import HabitForm from '@/components/HabitForm';
import BackToHome from '@/components/BackToHome';

const Habits = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink 8 glasses of water', completed: true },
    { id: 2, name: '30 minutes of exercise', completed: false },
    { id: 3, name: 'Read for 20 minutes', completed: false },
  ]);
  const [showForm, setShowForm] = useState(false);

  const toggleHabit = (id: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const addHabit = (name: string) => {
    const newHabit = {
      id: habits.length + 1,
      name: name,
      completed: false,
    };
    setHabits([...habits, newHabit]);
    setShowForm(false);
  };

  const calculateStreak = () => {
    // In a real app, you'd fetch and calculate the streak from a backend
    return 5; // Example streak
  };

  const streak = calculateStreak();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <BackToHome />
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Habit Tracker</h1>
          <p className="text-gray-600">Build and maintain healthy habits</p>
        </div>

        {/* Streak */}
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">{streak}</div>
              <p className="text-sm text-gray-600">Current Streak</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </CardContent>
        </Card>

        {/* Add Habit Form */}
        {showForm ? (
          <HabitForm onAdd={addHabit} onCancel={() => setShowForm(false)} />
        ) : (
          <Button onClick={() => setShowForm(true)} className="w-full justify-start">
            <Plus className="w-4 h-4 mr-2" />
            Add New Habit
          </Button>
        )}

        {/* Habit List */}
        <div className="space-y-3">
          {habits.map((habit) => (
            <Card key={habit.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0"
                    onClick={() => toggleHabit(habit.id)}
                  >
                    {habit.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-300" />
                    )}
                  </Button>
                  <span>{habit.name}</span>
                </div>
                <Badge variant="secondary">
                  <Flame className="w-3 h-3 mr-1" />
                  3 days left
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips and Motivation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Tips to Stay Consistent</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <ul className="list-disc pl-5 space-y-1">
              <li>Start small and gradually increase the difficulty.</li>
              <li>Tie new habits to existing routines.</li>
              <li>Track your progress to stay motivated.</li>
              <li>Reward yourself for achieving milestones.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Habits;
