import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SplashScreen from "./components/SplashScreen";

import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Consent from "./pages/onboarding/Consent";
import Dashboard from "./pages/dashboard/Dashboard";
import TryOn from "./pages/tryon/TryOn";
import Profile from "./pages/profile/Profile";
import History from "./pages/history/History";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && (
        <SplashScreen
          onComplete={() => setShowSplash(false)}
        />
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/consent" element={<Consent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/try-on" element={<TryOn />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;