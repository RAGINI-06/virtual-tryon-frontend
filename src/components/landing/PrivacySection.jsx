import { motion } from "motion/react";

function PrivacySection() {
  return (
    <section
      id="privacy"
      className="overflow-hidden bg-[#171717] py-24 text-white sm:py-32"
    >
      <div className="mx-auto max-w-[1100px] px-6 text-center sm:px-8">

        {/* EYEBROW */}

        <motion.p
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.3em]
            text-neutral-500
          "
        >
          Your privacy matters
        </motion.p>

        {/* HEADING */}

        <h2
          className="
            mx-auto
            mt-6
            max-w-4xl
            font-display
            text-4xl
            leading-tight
            sm:text-5xl
            lg:text-6xl
          "
        >
          <span className="block overflow-hidden">
            <motion.span
              initial={{
                opacity: 0,
                y: "100%",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block"
            >
              Your photos are yours.
            </motion.span>
          </span>

          <span className="block overflow-hidden">
            <motion.span
              initial={{
                opacity: 0,
                y: "100%",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 1,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block italic text-neutral-400"
            >
              Always.
            </motion.span>
          </span>
        </h2>

        {/* DESCRIPTION */}

        <motion.p
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.9,
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mx-auto
            mt-7
            max-w-2xl
            text-sm
            leading-7
            text-neutral-400
            sm:text-base
          "
        >
          AROSE is designed to make virtual try-on simple
          without making your personal images feel like
          they're no longer yours.
        </motion.p>

        {/* BUTTON */}

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-9"
        >
          <motion.a
            href="/register"
            whileHover={{
              y: -4,
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="
              inline-block
              rounded-full
              bg-[#bfae9c]
              px-6
              py-3
              text-sm
              font-medium
              text-[#302a25]
              transition-colors
              hover:bg-[#ad9b87]
            "
          >
            Try AROSE
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default PrivacySection;