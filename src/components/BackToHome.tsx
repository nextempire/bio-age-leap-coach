
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const BackToHome = () => {
  return (
    <Button
      onClick={() => window.open('https://www.metapulse.me', '_blank')}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
    >
      <Home className="w-4 h-4 mr-2" />
      Back to Home
    </Button>
  );
};

export default BackToHome;
