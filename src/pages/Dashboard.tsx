import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Heart, Activity, Clock, Brain } from 'lucide-react';
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

const Dashboard = () => {
  const [biologicalAge] = useState(28);
  const [chronologicalAge] = useState(32);
  const [improvementPercent] = useState(12.5);

  // Sample habits data (in a real app, this would come from context/state management)
  const habits: Habit[] = [
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
      name: 'Strength Training',
      streak: 3,
      completed: true,
      target: 45,
      current: 45,
      unit: 'minutes',
      category: 'movement',
      icon: '💪'
    },
    {
      id: 3,
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
      id: 4,
      name: 'Protein Intake',
      streak: 7,
      completed: true,
      target: 120,
      current: 120,
      unit: 'grams',
      category: 'nutrition',
      icon: '🥩'
    },
    {
      id: 5,
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
      id: 6,
      name: 'Mindfulness',
      streak: 7,
      completed: true,
      target: 10,
      current: 15,
      unit: 'minutes',
      category: 'mind',
      icon: '🧘'
    }
  ];

  const categoryAggregations = useMemo(() => {
    const categories = {
      movement: { icon: Heart, name: 'Movement', color: 'text-red-500', bgColor: 'bg-red-100 text-red-700' },
      nutrition: { icon: Activity, name: 'Nutrition', color: 'text-blue-500', bgColor: 'bg-blue-100 text-blue-700' },
      recovery: { icon: Clock, name: 'Recovery', color: 'text-purple-500', bgColor: 'bg-purple-100 text-purple-700' },
      mind: { icon: Brain, name: 'Mind', color: 'text-green-500', bgColor: 'bg-green-100 text-green-700' }
    };

    return Object.entries(categories).map(([categoryKey, categoryInfo]) => {
      const categoryHabits = habits.filter(habit => habit.category === categoryKey);
      const completedHabits = categoryHabits.filter(habit => habit.completed);
      const totalProgress = categoryHabits.reduce((sum, habit) => sum + (habit.current / habit.target), 0);
      const averageProgress = categoryHabits.length > 0 ? (totalProgress / categoryHabits.length) * 100 : 0;
      const averageStreak = categoryHabits.length > 0 ? Math.round(categoryHabits.reduce((sum, habit) => sum + habit.streak, 0) / categoryHabits.length) : 0;

      return {
        key: categoryKey,
        ...categoryInfo,
        habitsCount: categoryHabits.length,
        completedCount: completedHabits.length,
        progress: Math.min(100, averageProgress),
        streak: averageStreak
      };
    });
  }, [habits]);

  const improvement = chronologicalAge - biologicalAge;
  const isImproving = improvement > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 font-parkinsans">
      <BackToHome />
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold font-parkinsans text-gray-900 mb-2">Your Health Journey</h1>
          <p className="text-gray-600 font-light">Track your progress toward optimal health</p>
        </div>

        {/* Biological Age Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-none shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold font-parkinsans">Biological Age</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold font-parkinsans">{biologicalAge}</div>
                <div className="text-blue-100 mt-1 font-light">vs {chronologicalAge} chronological</div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-200">
                  <TrendingUp className="w-5 h-5 mr-1" />
                  <span className="text-lg font-semibold font-parkinsans">
                    {isImproving ? `${improvement} years younger` : 'On track'}
                  </span>
                </div>
                <div className="text-blue-100 text-sm font-light">
                  {improvementPercent}% improvement
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Overview Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryAggregations.map(({ key, icon: Icon, name, color, bgColor, habitsCount, completedCount, progress, streak }) => (
            <Card key={key} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-6 h-6 ${color}`} />
                  <Badge variant="secondary" className={`${bgColor} font-light`}>
                    {streak} avg streak
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900 font-parkinsans">{name}</h3>
                <p className="text-sm text-gray-600 mb-3 font-light">{completedCount}/{habitsCount} habits completed</p>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-gray-500 mt-1 font-light">{Math.round(progress)}% average progress</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-parkinsans">Today's Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900 font-parkinsans">Great sleep consistency!</p>
                  <p className="text-sm text-gray-600 font-light">Your recovery habits are helping lower your biological age by an estimated 0.3 years.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900 font-parkinsans">Nutrition opportunity</p>
                  <p className="text-sm text-gray-600 font-light">Complete your hydration goal to boost cellular function and energy levels.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900 font-parkinsans">Movement boost needed</p>
                  <p className="text-sm text-gray-600 font-light">6 more minutes of cardio will complete your movement goals for today.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
