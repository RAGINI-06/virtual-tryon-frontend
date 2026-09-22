import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 sm:px-8 lg:px-12">

        {/* Logo */}
        <a
          href="/"
          className="text-[20px] font-semibold tracking-[0.28em]"
        >
          AROSE
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <a
            href="#how-it-works"
            className="text-sm text-neutral-600 transition hover:text-[#3a332d]"
          >
            How it works
          </a>

          <a
            href="#features"
            className="text-sm text-neutral-600 transition hover:text-[#3a332d]"
          >
            Features
          </a>

          <a
            href="#privacy"
            className="text-sm text-neutral-600 transition hover:text-[#3a332d]"
          >
            Privacy
          </a>

          {/* Sign In */}
          <a
            href="/login"
            className="rounded-full border border-[#bdb1a4] px-5 py-2.5 text-sm text-[#3a332d] transition hover:bg-[#eee7df]"
          >
            Sign in
          </a>

          {/* Try It On */}
          <a
            href="/register"
            className="rounded-full bg-[#d6c8b8] px-6 py-2.5 text-sm font-medium text-[#3a332d] transition hover:bg-[#c9b9a8]"
          >
            Try it on
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label="Open navigation"
        >
          <div className="space-y-1.5">
            <span className="block h-px w-5 bg-[#3a332d]" />
            <span className="block h-px w-5 bg-[#3a332d]" />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="mx-4 rounded-2xl border border-[#e3dbd2] bg-[#f8f7f4] p-6 shadow-xl md:hidden">
          <div className="flex flex-col gap-5">

            <a
              href="#how-it-works"
              onClick={closeMenu}
              className="text-sm text-[#3a332d]"
            >
              How it works
            </a>

            <a
              href="#features"
              onClick={closeMenu}
              className="text-sm text-[#3a332d]"
            >
              Features
            </a>

            <a
              href="#privacy"
              onClick={closeMenu}
              className="text-sm text-[#3a332d]"
            >
              Privacy
            </a>

            {/* Mobile Sign In */}
            <a
              href="/login"
              onClick={closeMenu}
              className="rounded-full bg-[#d6c8b8] py-3 text-center text-sm text-[#3a332d] transition hover:bg-[#c9b9a8]"
            >
              Sign in
            </a>

            {/* Mobile Try It On */}
            <a
              href="/register"
              onClick={closeMenu}
              className="rounded-full bg-[#d6c8b8] py-3 text-center text-sm text-[#3a332d] transition hover:bg-[#c9b9a8]"
            >
              Try it on
            </a>

          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;