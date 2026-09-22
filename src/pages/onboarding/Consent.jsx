import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ShieldCheck,
  Image,
  Sparkles,
  ArrowRight,
  Lock,
  Loader2,
} from "lucide-react";

import { giveConsent } from "../../services/consentService";

function Consent() {
  const navigate = useNavigate();

  const [consent, setConsent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!consent) return;

    try {
      setSaving(true);
      setError("");

      await giveConsent();

      /*
       * Consent is now saved in the backend.
       *
       * Send the user to Try-On instead of dashboard,
       * because this consent was requested while trying
       * to generate a look.
       */
      navigate("/try-on");
    } catch (err) {
      console.error("Consent failed:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to save your consent. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#171717]">

      {/* Header */}

      <header className="border-b border-neutral-200">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:px-12">

          <Link
            to="/dashboard"
            className="text-xl font-semibold tracking-[0.3em]"
          >
            AROSE
          </Link>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Lock size={14} strokeWidth={1.5} />
            <span>Private by design</span>
          </div>

        </div>
      </header>

      {/* Main */}

      <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center px-6 py-16 sm:px-8">

        <div className="w-full">

          {/* Intro */}

          <div className="mx-auto max-w-2xl text-center">

            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white">
              <ShieldCheck
                size={26}
                strokeWidth={1.5}
              />
            </div>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              One last step
            </p>

            <h1 className="font-display text-4xl leading-tight sm:text-5xl">
              Your privacy comes first.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-500">
              AROSE needs your consent before processing
              your images for virtual try-on generation.
              Here's what happens with the images you provide.
            </p>

          </div>

          {/* Information cards */}

          <div className="mx-auto mt-14 grid max-w-4xl gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-3">

            {/* Card 1 */}

            <div className="bg-[#f8f7f4] p-8">

              <div className="mb-6 flex h-11 w-11 items-center justify-center border border-neutral-200 bg-white">
                <Image
                  size={20}
                  strokeWidth={1.5}
                />
              </div>

              <h2 className="text-sm font-semibold">
                Your images
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                You choose which photos and garment images
                you want to upload for your try-on experience.
              </p>

            </div>

            {/* Card 2 */}

            <div className="bg-[#f8f7f4] p-8">

              <div className="mb-6 flex h-11 w-11 items-center justify-center border border-neutral-200 bg-white">
                <Sparkles
                  size={20}
                  strokeWidth={1.5}
                />
              </div>

              <h2 className="text-sm font-semibold">
                AI processing
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Your images are processed by our AI pipeline
                to generate your virtual try-on result.
              </p>

            </div>

            {/* Card 3 */}

            <div className="bg-[#f8f7f4] p-8">

              <div className="mb-6 flex h-11 w-11 items-center justify-center border border-neutral-200 bg-white">
                <ShieldCheck
                  size={20}
                  strokeWidth={1.5}
                />
              </div>

              <h2 className="text-sm font-semibold">
                Your control
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                You control the images you upload and can
                manage your account and generated results.
              </p>

            </div>

          </div>

          {/* Consent */}

          <div className="mx-auto mt-10 max-w-4xl border border-neutral-200 bg-white p-6 sm:p-7">

            <label className="flex cursor-pointer items-start gap-4">

              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => {
                  setConsent(event.target.checked);
                  setError("");
                }}
                className="mt-1 h-4 w-4 accent-black"
                disabled={saving}
              />

              <span className="text-sm leading-6 text-neutral-600">
                I understand that AROSE will process the
                images I upload to provide the virtual
                try-on service, and I agree to the processing
                described above.
              </span>

            </label>

          </div>

          {/* Error */}

          {error && (
            <div className="mx-auto mt-4 max-w-4xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Continue */}

          <div className="mx-auto mt-6 flex max-w-4xl flex-col items-center gap-5 sm:flex-row sm:justify-between">

            <Link
              to="/dashboard"
              className="text-xs uppercase tracking-[0.15em] text-neutral-400 transition hover:text-black"
            >
              ← Back
            </Link>

            <button
              type="button"
              onClick={handleContinue}
              disabled={!consent || saving}
              className="flex w-full items-center justify-center gap-3 bg-black px-7 py-4 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300 sm:w-auto"
            >

              {saving ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  Continue to AROSE
                  <ArrowRight
                    size={17}
                    strokeWidth={1.7}
                  />
                </>
              )}

            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Consent;