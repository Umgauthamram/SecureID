import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import { Button } from "@/components/ui/Button.jsx";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    document.title = "404 Not Found | SecureID";
  }, [location.pathname]);

  return (
    <PageTransition>
      <div style={styles.container}>
        {/* Background Stars */}
        <div className="stars"></div>

        {/* Cute Blockchain Doodle */}
        <img 
          src="data:image/png;base64,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" 
          alt="Cute Blockchain Doodle" 
          className="doodle-image" 
        />

        {/* 404 Text */}
        <h1 style={styles.errorCode}>404</h1>
        <h2 style={styles.errorMessage}>Oops! Page Not Found</h2>
        <p style={styles.errorDescription}>
          Looks like you're lost in the blockchain maze! Let's get you back.
        </p>

        {/* Return Button */}
        <Link to="/">
          <Button style={styles.returnButton}>
            <Home style={styles.homeIcon} />
            Return Home
          </Button>
        </Link>

        {/* Embedded CSS for Animations and Styling */}
        <style>
          {`
            /* Twinkling Stars Animation */
            @keyframes twinkle {
              0% { opacity: 0.5; }
              50% { opacity: 1; }
              100% { opacity: 0.5; }
            }

            .stars {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: url('https://i.imgur.com/YWUgYdm.png') repeat;
              background-size: cover;
              animation: twinkle 2s infinite;
              z-index: -1;
            }

            .doodle-image {
              width: 200px;
              margin-bottom: 20px;
            }
          `}
        </style>
      </div>
    </PageTransition>
  );
};

const styles = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#fff6e6", // Soft white with a hint of orange
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    overflow: "hidden",
  },
  errorCode: {
    fontSize: "6rem",
    fontWeight: "bold",
    color: "#ff8c00", // Vibrant orange
    margin: 0,
  },
  errorMessage: {
    fontSize: "2rem",
    color: "#333",
    margin: "1rem 0",
  },
  errorDescription: {
    fontSize: "1.2rem",
    color: "#666",
    maxWidth: "600px",
    marginBottom: "2rem",
  },
  returnButton: {
    backgroundColor: "#ff8c00",
    color: "#fff",
    fontSize: "1rem",
    padding: "0.75rem 1.5rem",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  homeIcon: {
    marginRight: "0.5rem",
  },
};

export default NotFound;
