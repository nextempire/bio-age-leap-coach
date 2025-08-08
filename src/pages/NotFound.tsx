
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { usePageSEO } from "@/hooks/usePageSEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  usePageSEO({ title: '404 - Metapulse Demo', description: 'Page not found', canonicalPath: location.pathname });

  return (
    <div className="min-h-screen flex items-center justify-center bg-app font-parkinsans">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 font-parkinsans">404</h1>
        <p className="text-xl text-muted-foreground mb-4 font-light">Oops! Page not found</p>
        <a href="/" className="text-accent hover:opacity-90 underline font-light">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
