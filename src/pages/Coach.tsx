import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Sparkles, TrendingUp } from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import { usePageSEO } from '@/hooks/usePageSEO';

const Coach = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI health coach. I've analyzed your recent data and noticed some great progress with your sleep consistency. How are you feeling today?",
      sender: 'ai',
      timestamp: '9:30 AM'
    },
    {
      id: 2,
      text: "I'm feeling pretty good! I've been sleeping better, but I'm struggling with staying hydrated throughout the day.",
      sender: 'user',
      timestamp: '9:32 AM'
    },
    {
      id: 3,
      text: "That's fantastic about your sleep improvement! I can see your average sleep duration increased by 45 minutes over the past week, which could reduce your biological age by 0.2-0.4 years over time.\n\nFor hydration, I have a few science-backed strategies that work well:",
      sender: 'ai',
      timestamp: '9:33 AM'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user' as const,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newUserMessage]);
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: "Great question! Based on your recent biomarker data and habits, I'd recommend focusing on your hydration timing. Your glucose stability improves significantly when you're well-hydrated before meals.",
        sender: 'ai' as const,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const quickPrompts = [
    "How is my biological age trending?",
    "What should I focus on today?",
    "Explain my latest lab results",
    "Help me build a morning routine"
  ];

  usePageSEO({
    title: 'Coach - Metapulse Demo',
    description: 'AI health coach with personalized insights and guidance.',
    canonicalPath: '/coach'
  });

  return (
    <div className="min-h-screen bg-app p-4 font-parkinsans">
      <BackToHome />
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold font-parkinsans text-foreground mb-2">AI Health Coach</h1>
          <p className="text-muted-foreground font-light">Personalized guidance based on your data</p>
        </div>

        {/* Chat Interface */}
        <Card className="h-96">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center space-x-2 font-parkinsans">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span>MetaPulse</span>
              <Badge variant="secondary" className="bg-accent/20 text-accent-foreground font-light">
                Online
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap font-light">{message.text}</p>
                    <p className={`text-xs mt-1 font-light ${
                      message.sender === 'user' ? 'text-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask about your health data, habits, or goals..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 font-light"
                />
                <Button onClick={sendMessage} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Prompts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2 font-parkinsans">
              <MessageSquare className="w-5 h-5" />
              <span>Quick Questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto p-3 text-left hover:bg-accent/10 font-light"
                  onClick={() => setInputMessage(prompt)}
                >
                  <TrendingUp className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{prompt}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-parkinsans">Today's AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-card/60 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-foreground font-parkinsans">Optimize meal timing</p>
                  <p className="text-sm text-muted-foreground font-light">Your glucose stability improves 23% when you eat within 2 hours of waking. Try having breakfast by 9 AM today.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-card/60 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-foreground font-parkinsans">Extend your walk</p>
                  <p className="text-sm text-muted-foreground font-light">Adding 8 more minutes to your morning walk could improve your cardiovascular age by 0.1 years based on your current fitness level.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Coach;
