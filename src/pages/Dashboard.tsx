import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Heart, Brain, Zap, Calendar, Target } from 'lucide-react';
import BackToHome from '@/components/BackToHome';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <BackToHome />
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Health Dashboard</h1>
          <p className="text-gray-600">Track your progress and optimize your healthspan</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Biological Age</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">28.5</div>
              <p className="text-sm text-gray-600">Based on your biomarkers</p>
              <Progress value={65} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Cardiovascular Health</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">Excellent</div>
              <p className="text-sm text-gray-600">Consistent exercise & diet</p>
              <Progress value={90} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>Cognitive Function</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">87</div>
              <p className="text-sm text-gray-600">Memory, focus, and processing</p>
              <Progress value={87} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Metabolic Health</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">Good</div>
              <p className="text-sm text-gray-600">Glucose, insulin, and lipids</p>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Morning walk</span>
                </div>
                <Badge variant="outline">30 mins</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Target className="w-4 h-4 text-gray-500" />
                  <span>Mediterranean diet</span>
                </div>
                <Badge variant="outline">Consistent</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
