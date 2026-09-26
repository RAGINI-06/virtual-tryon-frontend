import { motion } from "motion/react";

function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-[#f8f7f4]">
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:px-8 lg:px-12">

        <div className="grid gap-12 md:grid-cols-4">

          {/* BRAND */}

          <motion.div
            initial={{
              opacity: 0,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="md:col-span-2"
          >
            <div className="text-xl font-semibold tracking-[0.25em]">
              AROSE
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-500">
              See yourself differently. Experience your clothes
              before you wear them with AI-powered virtual
              try-on technology.
            </p>
          </motion.div>

          {/* PRODUCT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em]">
              Product
            </p>

            <div className="flex flex-col gap-3 text-sm text-neutral-500">
              <a
                href="#how-it-works"
                className="transition hover:translate-x-1 hover:text-black"
              >
                How it works
              </a>

              <a
                href="#features"
                className="transition hover:translate-x-1 hover:text-black"
              >
                Features
              </a>

              <a
                href="#privacy"
                className="transition hover:translate-x-1 hover:text-black"
              >
                Privacy
              </a>
            </div>
          </motion.div>

          {/* COMPANY */}

          <motion.div
            initial={{
              opacity: 0,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              delay: 0.24,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em]">
              Company
            </p>

            <div className="flex flex-col gap-3 text-sm text-neutral-500">
              <a
                href="#"
                className="transition hover:translate-x-1 hover:text-black"
              >
                About
              </a>

              <a
                href="#"
                className="transition hover:translate-x-1 hover:text-black"
              >
                Contact
              </a>

              <a
                href="#"
                className="transition hover:translate-x-1 hover:text-black"
              >
                Terms
              </a>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mt-14
            flex
            flex-col
            gap-3
            border-t
            border-neutral-200
            pt-6
            text-xs
            text-neutral-400
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()} AROSE. All rights reserved.
          </p>

          <p>
            AI-powered virtual try-on
          </p>
        </motion.div>

      </div>
    </footer>
  );
}

export default Footer;