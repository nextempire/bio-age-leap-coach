
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, CheckCircle, AlertCircle, Clock, TrendingUp } from 'lucide-react';

const Biomarkers = () => {
  const [biomarkers] = useState([
    {
      id: 1,
      name: 'Complete Blood Panel',
      category: 'Blood',
      status: 'completed',
      lastTest: '2 weeks ago',
      nextDue: 'In 10 weeks',
      impact: 'High',
      description: 'Comprehensive metabolic panel, lipids, CBC',
      results: {
        cholesterol: { value: 180, range: '<200', status: 'good' },
        glucose: { value: 92, range: '70-100', status: 'good' },
        hemoglobin: { value: 14.2, range: '12-16', status: 'good' }
      }
    },
    {
      id: 2,
      name: 'Continuous Glucose Monitor',
      category: 'Wearable',
      status: 'active',
      lastTest: 'Real-time',
      nextDue: 'Ongoing',
      impact: 'High',
      description: 'Real-time glucose monitoring and trends',
      results: {
        avgGlucose: { value: 95, range: '70-140', status: 'good' },
        timeInRange: { value: 87, range: '>70%', status: 'good' },
        variability: { value: 15, range: '<20%', status: 'good' }
      }
    },
    {
      id: 3,
      name: 'Hormone Panel',
      category: 'Blood',
      status: 'overdue',
      lastTest: '6 months ago',
      nextDue: 'Overdue by 2 months',
      impact: 'Medium',
      description: 'Testosterone, cortisol, thyroid function',
      results: null
    },
    {
      id: 4,
      name: 'Microbiome Analysis',
      category: 'Stool',
      status: 'recommended',
      lastTest: 'Never',
      nextDue: 'Recommended',
      impact: 'Medium',
      description: 'Gut health and microbiome diversity',
      results: null
    },
    {
      id: 5,
      name: 'Heart Rate Variability',
      category: 'Wearable',
      status: 'active',
      lastTest: 'Real-time',
      nextDue: 'Ongoing',
      impact: 'High',
      description: 'Autonomic nervous system function',
      results: {
        rmssd: { value: 45, range: '>30', status: 'good' },
        stress: { value: 28, range: '<50', status: 'good' }
      }
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'active':
        return <div className="w-5 h-5 bg-green-500 rounded-full animate-pulse" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'recommended':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      case 'recommended':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const completedTests = biomarkers.filter(b => b.status === 'completed' || b.status === 'active').length;
  const totalTests = biomarkers.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Biomarker Tracking</h1>
          <p className="text-gray-600">Monitor your health at the cellular level</p>
        </div>

        {/* Progress Overview */}
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">Testing Progress</h2>
                <p className="text-orange-100">Complete your health picture</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{completedTests}/{totalTests}</div>
                <p className="text-orange-100">tests completed</p>
              </div>
            </div>
            <Progress value={(completedTests / totalTests) * 100} className="h-3 bg-orange-300" />
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">3</div>
              <p className="text-sm text-gray-600">Active monitors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <p className="text-sm text-gray-600">Recent tests</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">1</div>
              <p className="text-sm text-gray-600">Overdue</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">1</div>
              <p className="text-sm text-gray-600">Recommended</p>
            </CardContent>
          </Card>
        </div>

        {/* Biomarker List */}
        <div className="space-y-4">
          {biomarkers.map((biomarker) => (
            <Card key={biomarker.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">
                      {getStatusIcon(biomarker.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{biomarker.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{biomarker.description}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{biomarker.category}</Badge>
                        <Badge variant="secondary" className={getStatusColor(biomarker.status)}>
                          {biomarker.status}
                        </Badge>
                        <Badge variant="outline" className={
                          biomarker.impact === 'High' ? 'bg-red-100 text-red-700' :
                          biomarker.impact === 'Medium' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }>
                          {biomarker.impact} impact
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Last: {biomarker.lastTest}</p>
                    <p className="text-sm text-gray-600">Next: {biomarker.nextDue}</p>
                  </div>
                </div>

                {biomarker.results && (
                  <div className="bg-gray-50 rounded-lg p-4 mt-4">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Latest Results
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {Object.entries(biomarker.results).map(([key, result]) => (
                        <div key={key} className="text-center">
                          <p className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="text-lg font-semibold text-gray-900">{result.value}</p>
                          <p className="text-xs text-gray-500">Range: {result.range}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {biomarker.status === 'overdue' || biomarker.status === 'recommended' ? (
                  <div className="mt-4">
                    <Button className="w-full" variant={biomarker.status === 'overdue' ? 'default' : 'outline'}>
                      <Upload className="w-4 h-4 mr-2" />
                      {biomarker.status === 'overdue' ? 'Schedule Test' : 'Learn More'}
                    </Button>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add New Test */}
        <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Upload Lab Results</h3>
              <p className="text-gray-600 mb-4">Add new test results or connect a device</p>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Results
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Biomarkers;
