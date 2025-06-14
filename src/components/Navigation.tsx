
import { NavLink } from 'react-router-dom';
import { Home, Target, MessageSquare, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

const Navigation = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/habits', icon: Target, label: 'Habits' },
    { to: '/coach', icon: MessageSquare, label: 'Coach' },
    { to: '/biomarkers', icon: Activity, label: 'Tests' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-2 z-50 md:relative md:border-t-0 md:border-r md:w-20 md:min-h-screen md:flex-col md:justify-start md:pt-8">
      <div className="flex justify-around md:flex-col md:space-y-6 md:space-x-0 space-x-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center p-2 rounded-lg transition-colors',
                isActive
                  ? 'text-primary bg-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )
            }
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1 hidden md:block">{label}</span>
          </NavLink>
        ))}
        
        {/* Theme Toggle - only visible on desktop */}
        <div className="hidden md:flex md:mt-auto md:mb-4">
          <ThemeToggle />
        </div>
        
        {/* Theme Toggle - visible on mobile in the nav bar */}
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
