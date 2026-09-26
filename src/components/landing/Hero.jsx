import { Link } from "react-router-dom";
import { motion } from "motion/react";
import InfiniteSpiral from "../InfiniteSpiral";

function Hero() {
  const spiralImages = [
    {
      src: "/images/spiral-1.jpg",
      alt: "Fashion look",
    },
    {
      src: "/images/spiral-2.jpg",
      alt: "Fashion look",
    },
    {
      src: "/images/spiral-3.jpg",
      alt: "Fashion look",
    },
    {
      src: "/images/spiral-4.jpg",
      alt: "Fashion look",
    },
    {
      src: "/images/spiral-5.jpg",
      alt: "Fashion look",
    },
    {
      src: "/images/spiral-6.jpg",
      alt: "Fashion look",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background decoration */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#eee5dc] blur-3xl"
      />

      <div className="mx-auto grid min-h-screen max-w-[1440px] items-center gap-12 px-6 pb-16 pt-32 sm:px-8 lg:grid-cols-2 lg:px-12 lg:pt-20">
        {/* LEFT SIDE */}
        <div className="relative z-10 max-w-[650px]">
          {/* Eyebrow */}
          <motion.p
            initial={{
              opacity: 0,
              x: -80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500"
          >
            AI-powered virtual try-on
          </motion.p>

          {/* Heading */}
          <h1 className="font-display text-[52px] leading-[0.98] tracking-[-0.04em] sm:text-[68px] lg:text-[88px]">
            {/* First line */}
            <span className="block overflow-hidden">
              <motion.span
                initial={{
                  opacity: 0,
                  x: -120,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
              >
                See yourself
              </motion.span>
            </span>

            {/* Second line */}
            <span className="block overflow-hidden">
              <motion.span
                initial={{
                  opacity: 0,
                  x: -120,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block italic"
              >
                differently.
              </motion.span>
            </span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{
              opacity: 0,
              x: -80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 max-w-[500px] text-[15px] leading-7 text-neutral-500 sm:text-base"
          >
            Experience your clothes before you wear them. Upload your photo,
            choose a garment, and let AROSE create your look.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{
              opacity: 0,
              x: -70,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <motion.div
              whileHover={{
                y: -3,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              <Link
                to="/register"
                className="block rounded-full bg-[#b8a99a] px-7 py-4 text-sm font-medium text-[#2f2924] shadow-sm transition hover:bg-[#a99a89]"
              >
                Try it on
              </Link>
            </motion.div>

            <motion.a
              href="#how-it-works"
              whileHover={{
                y: -3,
                backgroundColor: "#f1eee9",
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="rounded-full border border-neutral-300 px-7 py-4 text-sm transition"
            >
              See how it works
            </motion.a>
          </motion.div>

          {/* Privacy */}
          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-9 flex items-center gap-3 text-xs text-neutral-400"
          >
            <motion.span
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                delay: 1.1,
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              className="h-2 w-2 rounded-full bg-green-500"
            />

            <span>Your photos stay private</span>
          </motion.div>
        </div>

        {/* RIGHT SIDE — INFINITE SPIRAL */}
        <motion.div
          initial={{
            opacity: 0,
            x: 80,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.1,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          {/* Subtle floating movement */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]">
              {/* Decorative circles */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  rotate: -20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/40"
              />

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  rotate: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-white/40"
              />

              {/* Infinite Spiral */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.94,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <InfiniteSpiral
                  items={spiralImages}
                  animationMode="auto"
                  speed={0.55}
                  radius={170}
                  cardWidth={110}
                  cardHeight={135}
                  verticalSpacing={65}
                  perspective={1000}
                  cardRadius={10}
                  centerScale={1.2}
                  edgeBlur={5}
                  cardsPerTurn={7}
                  pauseOnHover
                  direction="up"
                  rotation={0}
                  cardTilt={0}
                  edgeFade={0.3}
                  imageFit="cover"
                  grayscale={0}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;