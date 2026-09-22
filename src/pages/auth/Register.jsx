import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

import { registerUser } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword,
    } = formData;

    // Name validation
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (name.trim().length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    // Email validation
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    // Password validation
    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await registerUser(
        name.trim(),
        email.trim(),
        password
      );

      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#171717]">

      <div className="grid min-h-screen lg:grid-cols-[48%_52%]">

        {/* =====================================================
            LEFT SIDE — IMAGE
        ===================================================== */}

        <div className="relative hidden min-h-screen overflow-hidden bg-[#e9e5df] lg:block">

          {/* Image */}

          <img
            src="/images/register-page.png"
            alt="AROSE virtual try-on"
    className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
          />

          {/* Soft overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/5" />

          {/* Logo */}

          <div className="absolute left-10 top-9 z-10 xl:left-12 xl:top-10">

            <Link
              to="/"
              className="text-xl font-semibold tracking-[0.3em] text-white"
            >
              AROSE
            </Link>

          </div>

          {/* Image text */}

          <div className="absolute bottom-10 left-10 right-10 z-10 xl:left-12 xl:right-12">

            <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-white/70">
              Virtual try-on
            </p>

            <h2 className="max-w-lg font-display text-5xl leading-[1.04] tracking-[-0.035em] text-white xl:text-6xl">
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

        {/* =====================================================
            RIGHT SIDE — REGISTER FORM
        ===================================================== */}

        <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-20">

          <div className="w-full max-w-md">

            {/* Mobile logo */}

            <div className="mb-12 lg:hidden">

              <Link
                to="/"
                className="font-display text-3xl tracking-tight"
              >
                AROSE
              </Link>

            </div>

            {/* Heading */}

            <div className="mb-9">

              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-neutral-500">
                Welcome to AROSE
              </p>

              <h1 className="font-display text-4xl leading-tight tracking-[-0.025em] sm:text-5xl">
                Create your account
              </h1>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
                Create your account and start experiencing
                virtual try-on with AROSE.
              </p>

            </div>

            {/* Error */}

            {error && (
              <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}

              <div>

                <label
                  htmlFor="name"
                  className="mb-2 block text-xs uppercase tracking-[0.18em] text-neutral-500"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="name"
                  disabled={loading}
                  className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-black disabled:opacity-50"
                />

              </div>

              {/* Email */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-xs uppercase tracking-[0.18em] text-neutral-500"
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
                  className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-black disabled:opacity-50"
                />

              </div>

              {/* Password */}

              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block text-xs uppercase tracking-[0.18em] text-neutral-500"
                >
                  Password
                </label>

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
                    placeholder="Minimum 8 characters"
                    autoComplete="new-password"
                    disabled={loading}
                    className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 pr-10 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-black disabled:opacity-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    disabled={loading}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-black"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff
                        size={18}
                        strokeWidth={1.5}
                      />
                    ) : (
                      <Eye
                        size={18}
                        strokeWidth={1.5}
                      />
                    )}
                  </button>

                </div>

              </div>

              {/* Confirm Password */}

              <div>

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs uppercase tracking-[0.18em] text-neutral-500"
                >
                  Confirm password
                </label>

                <div className="relative">

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    disabled={loading}
                    className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 pr-10 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-black disabled:opacity-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                    disabled={loading}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-black"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff
                        size={18}
                        strokeWidth={1.5}
                      />
                    ) : (
                      <Eye
                        size={18}
                        strokeWidth={1.5}
                      />
                    )}
                  </button>

                </div>

              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="group mt-3 flex w-full items-center justify-between bg-black px-5 py-4 text-sm text-white transition-all hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
              >

                <span>
                  {loading
                    ? "Creating account..."
                    : "Create account"}
                </span>

                {!loading && (
                  <ArrowRight
                    size={18}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}

              </button>

            </form>

            {/* Login */}

            <div className="mt-7 text-center">

              <p className="text-sm text-neutral-500">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="text-black underline underline-offset-4 hover:no-underline"
                >
                  Sign in
                </Link>

              </p>

            </div>

            {/* Privacy */}

            <p className="mt-8 text-center text-[11px] leading-relaxed text-neutral-400">

              By creating an account, you agree to use AROSE
              responsibly and understand that uploaded images
              are processed to provide the virtual try-on
              experience.

            </p>

          </div>

        </div>

      </div>
    </div>
  );
}