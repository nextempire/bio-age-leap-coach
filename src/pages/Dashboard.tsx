import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Heart, Activity, Clock, Brain } from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import { usePageSEO } from '@/hooks/usePageSEO';
import VisualizationPlayground from '@/components/VisualizationPlayground';

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
      movement: { icon: Heart, name: 'Movement', color: 'text-accent', bgColor: 'bg-accent/20 text-accent-foreground' },
      nutrition: { icon: Activity, name: 'Nutrition', color: 'text-accent', bgColor: 'bg-accent/20 text-accent-foreground' },
      recovery: { icon: Clock, name: 'Recovery', color: 'text-accent', bgColor: 'bg-accent/20 text-accent-foreground' },
      mind: { icon: Brain, name: 'Mind', color: 'text-accent', bgColor: 'bg-accent/20 text-accent-foreground' }
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

  usePageSEO({
    title: 'Dashboard - Metapulse Demo',
    description: 'Track your health journey, biological age, and habit progress.',
    canonicalPath: '/'
  });

  return (
    <div className="min-h-screen bg-app p-4 font-parkinsans">
      <BackToHome />
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold font-parkinsans text-foreground mb-4">Your Health Journey</h1>
          <div className="neon-line w-32 mx-auto mb-4"></div>
          <p className="text-muted-foreground font-light">Track your progress toward optimal health</p>
        </div>

        {/* Biological Age Visualization */}
        <Card className="minimal-border bg-card/30 backdrop-blur-sm hover-float overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold font-parkinsans text-center">Biological Age</CardTitle>
            <div className="neon-line w-16 mx-auto mt-2"></div>
          </CardHeader>
          <CardContent className="p-6">
            <VisualizationPlayground 
              biologicalAge={biologicalAge} 
              chronologicalAge={chronologicalAge}
              className="mb-6"
            />
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center text-accent mb-2">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span className="text-lg font-semibold font-parkinsans">
                    {isImproving ? `${improvement} years younger` : 'On track'}
                  </span>
                </div>
                <div className="text-muted-foreground text-sm font-light">
                  {improvementPercent}% improvement over time
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Overview Grid */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold font-parkinsans text-foreground mb-2">Health Categories</h2>
            <div className="neon-line w-24 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryAggregations.map(({ key, icon: Icon, name, color, bgColor, habitsCount, completedCount, progress, streak }) => (
              <Card key={key} className="minimal-border bg-card/20 backdrop-blur-sm hover-float transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-6 h-6 text-neon`} />
                    <Badge variant="secondary" className="bg-accent/20 text-accent font-light border border-accent/30">
                      {streak} streak
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground font-parkinsans mb-1">{name}</h3>
                  <div className="neon-line w-8 mb-2"></div>
                  <p className="text-sm text-muted-foreground mb-3 font-light">{completedCount}/{habitsCount} completed</p>
                  <Progress value={progress} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground font-light">{Math.round(progress)}% progress</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Insights */}
        <Card className="minimal-border bg-card/20 backdrop-blur-sm hover-float">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-parkinsans text-center">Today's Insights</CardTitle>
            <div className="neon-line w-16 mx-auto mt-2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-card/30 border border-neon/20">
                <div className="w-2 h-2 bg-neon rounded-full mt-2 shadow-sm shadow-neon"></div>
                <div>
                  <p className="font-medium text-foreground font-parkinsans">Great sleep consistency!</p>
                  <p className="text-sm text-muted-foreground font-light">Your recovery habits are helping lower your biological age by an estimated 0.3 years.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-card/30 border border-neon/20">
                <div className="w-2 h-2 bg-neon rounded-full mt-2 shadow-sm shadow-neon"></div>
                <div>
                  <p className="font-medium text-foreground font-parkinsans">Nutrition opportunity</p>
                  <p className="text-sm text-muted-foreground font-light">Complete your hydration goal to boost cellular function and energy levels.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-card/30 border border-neon/20">
                <div className="w-2 h-2 bg-neon rounded-full mt-2 shadow-sm shadow-neon"></div>
                <div>
                  <p className="font-medium text-foreground font-parkinsans">Movement boost needed</p>
                  <p className="text-sm text-muted-foreground font-light">6 more minutes of cardio will complete your movement goals for today.</p>
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
