import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.15 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const navLinks = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Team", href: "#team" },
    { label: "Privacy", href: "#privacy" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute left-0 top-0 z-50 w-full"
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 sm:px-8 lg:px-12">

        {/* LOGO */}
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            letterSpacing: "0.34em",
            transition: { duration: 0.25 },
          }}
          className="text-[20px] font-semibold tracking-[0.28em]"
        >
          AROSE
        </motion.a>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((item, index) => (
            <motion.a
              key={item.label}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              href={item.href}
              className="group relative py-1 text-sm text-neutral-600 transition-colors duration-300 hover:text-[#3a332d]"
            >
              {item.label}

              {/* UNDERLINE */}
              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-px
                  w-full
                  origin-left
                  scale-x-0
                  bg-[#3a332d]
                  transition-transform
                  duration-300
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:scale-x-100
                "
              />
            </motion.a>
          ))}

          {/* SIGN IN */}
          <motion.a
            custom={4}
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="/login"
            className="rounded-full border border-[#bdb1a4] bg-white/20 px-5 py-2.5 text-sm text-[#3a332d] backdrop-blur-md transition hover:bg-white/50"
          >
            Sign in
          </motion.a>

          {/* TRY IT ON */}
          <motion.a
            custom={5}
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
            whileHover={{
              y: -2,
              scale: 1.02,
            }}
            whileTap={{ scale: 0.97 }}
            href="/register"
            className="rounded-full border border-white/30 bg-[#d6c8b8]/80 px-6 py-2.5 text-sm font-medium text-[#3a332d] shadow-sm backdrop-blur-md transition hover:bg-[#c9b9a8]"
          >
            Try it on
          </motion.a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.25,
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9d0c6] bg-white/30 backdrop-blur-md md:hidden"
          aria-label="Open navigation"
          aria-expanded={open}
        >
          <div className="relative flex h-4 w-5 flex-col justify-center gap-1.5">
            <motion.span
              animate={
                open
                  ? { rotate: 45, y: 4.5 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.25 }}
              className="block h-px w-5 origin-center bg-[#3a332d]"
            />

            <motion.span
              animate={
                open
                  ? { rotate: -45, y: -2 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.25 }}
              className="block h-px w-5 origin-center bg-[#3a332d]"
            />
          </div>
        </motion.button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -12,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -12,
              scale: 0.97,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-4 rounded-2xl border border-white/40 bg-[#f8f7f4]/75 p-6 shadow-xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((item, index) => (
                <motion.a
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + index * 0.05 }}
                  href={item.href}
                  onClick={closeMenu}
                  className="group relative w-fit py-1 text-sm text-[#3a332d]"
                >
                  {item.label}

                  {/* MOBILE UNDERLINE */}
                  <span
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-px
                      w-full
                      origin-left
                      scale-x-0
                      bg-[#3a332d]
                      transition-transform
                      duration-300
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:scale-x-100
                    "
                  />
                </motion.a>
              ))}

              {/* SIGN IN */}
              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                whileTap={{ scale: 0.98 }}
                href="/login"
                onClick={closeMenu}
                className="rounded-full border border-[#bdb1a4] bg-white/40 py-3 text-center text-sm text-[#3a332d] backdrop-blur-md transition hover:bg-white/70"
              >
                Sign in
              </motion.a>

              {/* TRY IT ON */}
              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.33 }}
                whileTap={{ scale: 0.98 }}
                href="/register"
                onClick={closeMenu}
                className="rounded-full bg-[#d6c8b8]/90 py-3 text-center text-sm text-[#3a332d] shadow-sm backdrop-blur-md transition hover:bg-[#c9b9a8]"
              >
                Try it on
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;