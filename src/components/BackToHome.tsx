
import { Button } from '@/components/ui/button';

const BackToHome = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50"
      onClick={() => window.open('https://www.metapulse.me', '_blank')}
    >
      <img 
        src="/lovable-uploads/d57514fc-d239-4989-94c7-d71dd11012d6.png" 
        alt="MetaPulse" 
        className="w-4 h-4 mr-2" 
      />
      Back to Home
    </Button>
  );
};

export default BackToHome;
