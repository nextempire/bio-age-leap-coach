
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const BackToHome = () => {
  return (
    <Button
      onClick={() => window.open('https://www.metapulse.me', '_blank')}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-50 bg-card/70 supports-[backdrop-filter]:bg-card/60 backdrop-blur border-border hover:bg-card/80 shadow-md neon-border"
      aria-label="Back to Metapulse home"
    >
      <Home className="w-4 h-4 mr-2" />
      Back to Home
    </Button>
  );
};

export default BackToHome;
