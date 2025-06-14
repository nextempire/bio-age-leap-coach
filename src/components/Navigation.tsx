
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-2 z-50 md:relative md:border-t-0 md:border-r md:border-r-gray-200 dark:md:border-r-gray-700 md:w-20 md:min-h-screen md:flex-col md:justify-start md:pt-8">
      <div className="flex justify-around md:flex-col md:space-y-6 md:space-x-0 space-x-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center p-2 rounded-lg transition-colors',
                isActive
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
              )
            }
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1 hidden md:block">{label}</span>
          </NavLink>
        ))}
        <div className="md:mt-6 md:pt-6 md:border-t md:border-gray-200 dark:md:border-gray-700">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
