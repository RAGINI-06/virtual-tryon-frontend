import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // =====================================================
  // HANDLE LOGIN
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await loginUser(
        formData.email,
        formData.password
      );

      localStorage.setItem(
        "arose_token",
        response.token
      );

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-[#f8f7f4] text-[#171717]">

      {/* =====================================================
          MAIN LAYOUT
      ===================================================== */}

      <div className="grid h-full lg:grid-cols-2">

        {/* =====================================================
            LEFT — IMAGE SECTION
        ===================================================== */}

        <div className="relative hidden h-full overflow-hidden lg:block">

          {/* Background image */}

 <img
  src="/images/d-model.jpeg"
  alt="AROSE virtual try-on"
  className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
/>
          {/* Dark overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10" />

          {/* Content */}

          <div className="relative z-10 flex h-full flex-col justify-between p-8 xl:p-12">

            {/* Logo */}

            <Link
              to="/"
              className="text-xl font-semibold tracking-[0.3em] text-white"
            >
              AROSE
            </Link>

            {/* Bottom text */}

            <div className="max-w-xl text-white">

              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/70">
                Virtual try-on
              </p>

              <h2 className="font-display text-5xl leading-[1.02] tracking-[-0.035em] xl:text-6xl">
                See yourself
                <br />
                differently.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-white/75">
                Experience your clothes before you wear them
                with AI-powered virtual try-on.
              </p>

            </div>

          </div>
        </div>

        {/* =====================================================
            RIGHT — LOGIN SECTION
        ===================================================== */}

        <div className="flex h-full items-center justify-center overflow-y-auto px-6 py-12 sm:px-10 lg:px-16">

          <div className="my-auto w-full max-w-md">

            {/* =================================================
                MOBILE LOGO
            ================================================= */}

            <div className="mb-12 lg:hidden">

              <Link
                to="/"
                className="text-xl font-semibold tracking-[0.3em]"
              >
                AROSE
              </Link>

            </div>

            {/* =================================================
                HEADING
            ================================================= */}

            <div className="mb-9">

              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Welcome back
              </p>

              <h1 className="font-display text-4xl tracking-[-0.025em] sm:text-5xl">
                Sign in to AROSE.
              </h1>

              <p className="mt-4 text-sm leading-6 text-neutral-500">
                Continue your virtual try-on experience.
              </p>

            </div>

            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (
              <div className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* =================================================
                LOGIN FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* =================================================
                  EMAIL
              ================================================= */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em]"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={loading}
                  className="w-full border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-black disabled:cursor-not-allowed disabled:opacity-60"
                />

              </div>

              {/* =================================================
                  PASSWORD
              ================================================= */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-xs font-semibold uppercase tracking-[0.15em]"
                  >
                    Password
                  </label>

                  {/* Forgot password — UI only for now */}

                  <button
                    type="button"
                    onClick={() => {
                      setError(
                        "Password reset is not available yet."
                      );
                    }}
                    disabled={loading}
                    className="text-xs text-neutral-400 transition hover:text-black disabled:opacity-50"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                    className="w-full border border-neutral-300 bg-white px-4 py-3.5 pr-20 text-sm outline-none transition focus:border-black disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  {/* Show / Hide */}

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    disabled={loading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 transition hover:text-black disabled:opacity-50"
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>

              {/* =================================================
                  SUBMIT BUTTON
              ================================================= */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black px-5 py-4 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Signing in..."
                  : "Sign in"}
              </button>

            </form>

            {/* =================================================
                REGISTER LINK
            ================================================= */}

            <p className="mt-8 text-center text-sm text-neutral-500">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-medium text-black underline underline-offset-4 hover:no-underline"
              >
                Create an account
              </Link>

            </p>

            {/* =================================================
                BACK TO HOME
            ================================================= */}

            <div className="mt-8 text-center">

              <Link
                to="/"
                className="text-xs uppercase tracking-[0.15em] text-neutral-400 transition hover:text-black"
              >
                ← Back to AROSE
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;