import { motion } from "motion/react";

const features = [
  {
    number: "01",
    title: "Simple",
    description:
      "Upload your photos and start experimenting with different looks without complicated setup.",
  },
  {
    number: "02",
    title: "Personal",
    description:
      "Your own photo becomes the starting point for every virtual try-on experience.",
  },
  {
    number: "03",
    title: "AI-powered",
    description:
      "Generative AI helps create a visual representation of your selected garment.",
  },
  {
    number: "04",
    title: "Private",
    description:
      "Your personal images are handled with privacy in mind throughout the experience.",
  },
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function Features() {
  return (
    <section
      id="features"
      className="bg-[#f8f7f4] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">

          {/* HEADING */}

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Why AROSE
            </p>

            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Designed around
              <br />
              <span className="italic">
                you.
              </span>
            </h2>
          </motion.div>

          {/* FEATURE GRID */}

          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.number}
                custom={index * 0.1}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                whileHover={{
                  y: -6,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                }}
                className="
                  group
                  border-t
                  border-neutral-200
                  pt-5
                "
              >
                {/* TOP LINE */}

                <div className="flex items-start justify-between">
                  <h3 className="font-display text-2xl">
                    {feature.title}
                  </h3>

                  <motion.span
                    initial={{
                      opacity: 0,
                      x: 10,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1 + 0.25,
                    }}
                    className="text-xs text-neutral-400"
                  >
                    {feature.number}
                  </motion.span>
                </div>

                {/* DESCRIPTION */}

                <p className="mt-4 text-sm leading-7 text-neutral-500">
                  {feature.description}
                </p>

                {/* HOVER LINE */}

                <motion.div
                  initial={{
                    scaleX: 0,
                    transformOrigin: "left",
                  }}
                  whileInView={{
                    scaleX: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1 + 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-6 h-px w-full origin-left bg-neutral-200"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;