import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "../components/Button";
import PageTransition from "../components/layout/PageTransition";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    document.title = "404 Not Found | SecureID";
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <span className="font-mono text-xl font-bold text-primary">404</span>
          </div>
          <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button>
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;