
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const BackToHome = () => {
  return (
    <Button
      onClick={() => window.open('https://www.metapulse.me', '_blank')}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg dark:border-gray-600"
    >
      <Home className="w-4 h-4 mr-2" />
      Back to Home
    </Button>
  );
};

export default BackToHome;
