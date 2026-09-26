
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#f8f7f4] text-[#171717]">
      
      <div className="text-center">
        {/* AROSE Logo */}
        <h1 className="arose-logo text-[42px] tracking-[0.28em] font-medium">
          AROSE
        </h1>

        {/* Tagline */}
        <p className="arose-tagline mt-4 text-[11px] tracking-[0.35em] uppercase text-[#777]">
          See yourself differently
        </p>
      </div>

    </div>
  );
}

export default Splash;

