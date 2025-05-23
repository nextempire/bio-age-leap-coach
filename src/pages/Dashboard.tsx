
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Heart, Activity, Clock } from 'lucide-react';

const Dashboard = () => {
  const [biologicalAge] = useState(28);
  const [chronologicalAge] = useState(32);
  const [improvementPercent] = useState(12.5);

  const improvement = chronologicalAge - biologicalAge;
  const isImproving = improvement > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Health Journey</h1>
          <p className="text-gray-600">Track your progress toward optimal health</p>
        </div>

        {/* Biological Age Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-none shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Biological Age</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold">{biologicalAge}</div>
                <div className="text-blue-100 mt-1">vs {chronologicalAge} chronological</div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-200">
                  <TrendingUp className="w-5 h-5 mr-1" />
                  <span className="text-lg font-semibold">
                    {isImproving ? `${improvement} years younger` : 'On track'}
                  </span>
                </div>
                <div className="text-blue-100 text-sm">
                  {improvementPercent}% improvement
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Habits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Heart className="w-6 h-6 text-red-500" />
                <Badge variant="secondary" className="bg-red-100 text-red-700">
                  5 day streak
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900">Cardio</h3>
              <p className="text-sm text-gray-600 mb-3">30 min target</p>
              <Progress value={80} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">24/30 minutes</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Activity className="w-6 h-6 text-blue-500" />
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  12 day streak
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900">Hydration</h3>
              <p className="text-sm text-gray-600 mb-3">8 glasses target</p>
              <Progress value={62} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">5/8 glasses</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Clock className="w-6 h-6 text-purple-500" />
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  3 day streak
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900">Sleep</h3>
              <p className="text-sm text-gray-600 mb-3">8 hours target</p>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">8.2/8 hours</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🧘</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  7 day streak
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900">Mindfulness</h3>
              <p className="text-sm text-gray-600 mb-3">10 min target</p>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">15/10 minutes</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Great sleep consistency!</p>
                  <p className="text-sm text-gray-600">Your 7+ hour sleep streak is helping lower your biological age by an estimated 0.3 years.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Hydration opportunity</p>
                  <p className="text-sm text-gray-600">You're 3 glasses behind. Try drinking a full glass now to boost cellular function.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Cardio boost needed</p>
                  <p className="text-sm text-gray-600">6 more minutes of movement will complete your cardiovascular health goal for today.</p>
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
