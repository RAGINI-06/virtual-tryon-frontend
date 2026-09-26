import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Upload yourself",
    description:
      "Upload a clear photo of yourself. This becomes the foundation for your virtual try-on.",
  },
  {
    number: "02",
    title: "Choose a garment",
    description:
      "Select the clothing piece you want to try and upload its image.",
  },
  {
    number: "03",
    title: "See your look",
    description:
      "AROSE uses AI to create a visual preview of how the selected garment could look on you.",
  },
];

/* SECTION HEADING — LEFT TO RIGHT */
const headingReveal = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* CARDS — UPWARD REVEAL */
const cardReveal = {
  hidden: {
    opacity: 0,
    y: 120,
    scale: 0.96,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      delay: index * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/* CARD CONTENT — LEFT TO RIGHT */
const contentReveal = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay: index * 0.12 + 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-neutral-200 bg-[#f0ede8] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">

        {/* SECTION HEADING */}
        <motion.div
          variants={headingReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            How it works
          </p>

          <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            From photo to{" "}
            <span className="italic">possibility.</span>
          </h2>
        </motion.div>

        {/* CARDS */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              custom={index}
              variants={cardReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              }}
              className="
                group
                min-h-[330px]
                border
                border-neutral-300
                bg-[#f8f7f4]
                p-7
                shadow-[0_0_0_rgba(0,0,0,0)]
                transition-shadow
                duration-500
                hover:shadow-[0_20px_50px_rgba(60,50,40,0.08)]
              "
            >
              {/* NUMBER */}
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-[0.2em] text-neutral-400">
                  {step.number}
                </span>

                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12 + 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-px bg-neutral-300"
                />
              </div>

              {/* CONTENT */}
              <motion.div
                custom={index}
                variants={contentReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                className="mt-28"
              >
                <h3 className="font-display text-2xl">
                  {step.title}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-500">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;