import { useState } from "react";
import { motion } from "motion/react";

const teamMembers = [
  {
    name: "Your Name",
    role: "Founder & CEO",
    image: "",
    description:
      "Building the vision behind AROSE and shaping the future of virtual fashion.",
  },
  {
    name: "Your Name",
    role: "Co-Founder & CTO",
    image: "",
    description:
      "Engineering the technology that powers the AROSE virtual try-on experience.",
  },
  {
    name: "Your Name",
    role: "AI / ML Lead",
    image: "",
    description:
      "Working on the intelligence behind realistic and personalized virtual try-on.",
  },
  {
    name: "Your Name",
    role: "Product Lead",
    image: "",
    description:
      "Turning user needs into simple, thoughtful and useful product experiences.",
  },
  {
    name: "Your Name",
    role: "Design Lead",
    image: "",
    description:
      "Creating the visual language and experience that makes AROSE feel distinctly human.",
  },
];

const headingReveal = {
  hidden: {
    opacity: 0,
    y: 90,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardReveal = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: index * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function TeamCard({ member, index }) {
  const [mouse, setMouse] = useState({
    x: 50,
    y: 50,
  });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setMouse({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      custom={index}
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      whileHover={{
        y: -10,
        transition: {
          duration: 0.35,
          ease: "easeOut",
        },
      }}
      onMouseMove={handleMouseMove}
      className="
        group
        relative
        rounded-none
        bg-[#f8f7f4]
        shadow-[0_0_0_rgba(0,0,0,0)]
        transition-shadow
        duration-500
        hover:shadow-[0_25px_60px_rgba(60,50,40,0.14)]
      "
    >
      {/* NORMAL BORDER */}
      <div className="pointer-events-none absolute inset-0 z-30 border border-neutral-300" />

      {/* CURSOR FOLLOWING GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
        style={{
          boxShadow: `
            inset 0 0 0 1px rgba(120, 100, 80, 0.8),
            0 0 18px rgba(120, 100, 80, 0.18)
          `,
          background: `
            radial-gradient(
              180px circle at ${mouse.x}% ${mouse.y}%,
              rgba(120, 100, 80, 0.18),
              rgba(160, 140, 120, 0.06) 35%,
              transparent 70%
            )
          `,
        }}
      />

      {/* CURSOR LIGHT */}
      <div
        className="
          pointer-events-none
          absolute
          z-40
          h-32
          w-32
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          opacity-0
          blur-2xl
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
        style={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
          background:
            "radial-gradient(circle, rgba(150,130,110,0.22) 0%, rgba(150,130,110,0.08) 35%, transparent 70%)",
        }}
      />

      {/* IMAGE AREA */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#d8d1c8]">
        {member.image ? (
          <motion.img
            src={member.image}
            alt={member.name}
            whileHover={{
              scale: 1.06,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              h-full
              w-full
              object-cover
              grayscale
              transition-all
              duration-700
              group-hover:grayscale-0
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center">
              <div
                className="
                  mx-auto
                  mb-4
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-neutral-400/60
                "
              >
                <span className="text-xs tracking-[0.2em] text-neutral-500">
                  PIC
                </span>
              </div>

              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                Image placeholder
              </p>
            </div>
          </div>
        )}

        {/* HOVER OVERLAY */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#171717]/80
            via-[#171717]/10
            to-transparent
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

        {/* HOVER DESCRIPTION */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            translate-y-5
            p-5
            opacity-0
            transition-all
            duration-500
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <p className="text-xs leading-5 text-white/80">
            {member.description}
          </p>
        </div>
      </div>

      {/* CARD INFO */}
      <div className="relative z-20 bg-[#f8f7f4] p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl leading-tight">
              {member.name}
            </h3>

            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
              {member.role}
            </p>
          </div>

          {/* ARROW */}
          <motion.div
            whileHover={{
              rotate: 45,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-neutral-300
              text-neutral-600
              transition-all
              duration-300
              group-hover:border-[#3a332d]
              group-hover:bg-[#171717]
              group-hover:text-white
            "
          >
            <span className="text-sm">↗</span>
          </motion.div>
        </div>

        {/* BOTTOM LINE */}
        <motion.div
          initial={{
            scaleX: 0,
          }}
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: index * 0.1 + 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mt-6
            h-px
            w-full
            origin-left
            bg-neutral-200
          "
        />
      </div>
    </motion.div>
  );
}

function TeamSection() {
  return (
    <section
      id="team"
      className="overflow-hidden bg-[#f0ede8] py-24 sm:py-32"
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
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Meet the team
          </p>

          <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            The people behind{" "}
            <span className="italic">AROSE.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
            A group of builders, designers and problem-solvers creating
            a more personal way to experience fashion.
          </p>
        </motion.div>

        {/* TEAM CARDS */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              member={member}
              index={index}
            />
          ))}
        </div>

        {/* BOTTOM STATEMENT */}
        <motion.div
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
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto mt-16 max-w-xl text-center"
        >
          <p className="font-display text-2xl leading-relaxed text-[#3a332d] sm:text-3xl">
            Building technology that helps you{" "}
            <span className="italic">
              see yourself differently.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default TeamSection;