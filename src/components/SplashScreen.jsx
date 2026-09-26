import { useEffect } from "react";
import "./SplashScreen.css";

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <div className="splash-content">

        <div className="splash-logo">
          AROSE
        </div>

        <div className="splash-line" />

        <p className="splash-tagline">
          See yourself differently.
        </p>

      </div>

      <div className="splash-bottom">
        AI-POWERED VIRTUAL TRY-ON
      </div>
    </div>
  );
}