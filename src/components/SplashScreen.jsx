import { useEffect, useState } from "react";
import { motion } from "motion/react";
import "./SplashScreen.css";

const FRAME = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

export default function SplashScreen({ onComplete }) {
  const [frame, setFrame] = useState(FRAME.ONE);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timers = [];

    // Frame 1 → Frame 2
    timers.push(
      setTimeout(() => {
        setFrame(FRAME.TWO);
      }, 500)
    );

    // Frame 2 → Frame 3
    timers.push(
      setTimeout(() => {
        setFrame(FRAME.THREE);
      }, 500 + 1500 + 1)
    );

    // Frame 3 → Frame 4
    timers.push(
      setTimeout(() => {
        setFrame(FRAME.FOUR);
      }, 500 + 1500 + 1 + 2050 + 1)
    );

    // Frame 4 → Frame 5
    timers.push(
      setTimeout(() => {
        setFrame(FRAME.FIVE);
      }, 500 + 1500 + 1 + 2050 + 1 + 990 + 1)
    );

    /*
      Frame 5 stays visible until 6.5 seconds,
      then smoothly fades out.
    */
    timers.push(
      setTimeout(() => {
        setIsFadingOut(true);

        /*
          Wait for fade animation to finish
          before removing splash.
        */
        setTimeout(() => {
          onComplete();
        }, 400);
      }, 6500)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [onComplete]);

  /* =========================================
     PLATFORM / MASK GROUP POSITIONS
  ========================================= */

  const platform =
    frame === FRAME.ONE
      ? {
          x: 77,
          y: 259,
          width: 297,
          height: 313,
        }
      : frame === FRAME.TWO
        ? {
            x: 112,
            y: 259,
            width: 262,
            height: 313,
          }
        : frame === FRAME.THREE
          ? {
              x: 90,
              y: 321,
              width: 297,
              height: 290,
            }
          : frame === FRAME.FOUR
            ? {
                x: 79,
                y: 246,
                width: 319,
                height: 313,
              }
            : {
                x: 77,
                y: 259,
                width: 297,
                height: 313,
              };

  /* =========================================
     LOGO POSITIONS
  ========================================= */

  const logo =
    frame === FRAME.ONE
      ? {
          x: 183,
          y: 583,
          width: 72,
          height: 72,
        }
      : frame === FRAME.TWO
        ? {
            x: 203.1,
            y: 310.6,
            width: 80.8,
            height: 80.8,
          }
        : frame === FRAME.THREE
          ? {
              x: 185,
              y: 518,
              width: 73,
              height: 73,
            }
          : frame === FRAME.FOUR
            ? {
                x: 101,
                y: 483,
                width: 73,
                height: 73,
              }
            : {
                x: 77,
                y: 486,
                width: 73,
                height: 73,
              };

  /* =========================================
     WORDMARK
  ========================================= */

  const wordmark =
    frame === FRAME.FOUR
      ? {
          x: 164.3,
          y: 480.4,
          width: 172,
          height: 77,
        }
      : {
          x: 164,
          y: 481,
          width: 210,
          height: 77,
        };

  const isFrameTwo = frame === FRAME.TWO;
  const isFrameThree = frame === FRAME.THREE;

  /* =========================================
     FRAME 1 → 2
     Figma:
     Smart Animate
     Cubic Bezier
     1.5s
  ========================================= */

  const frameOneToTwoTransition = {
    duration: 1.5,
    ease: [0.97, 0, 0, 0.98],
  };

  /* =========================================
     FRAME 2 → 3
     Figma:
     Spring
     mass: 1
     stiffness: 101.7
     damping: 7.06
  ========================================= */

  const frameTwoToThreeTransition = {
    type: "spring",
    mass: 1,
    stiffness: 101.7,
    damping: 7.06,
  };

  /* =========================================
     FRAME 3 → 4
     FRAME 4 → 5

     Quick transition
     ~0.99s
  ========================================= */

  const smartAnimateTransition = {
    duration: 0.99,
    ease: "easeInOut",
  };

  const platformTransition = isFrameTwo
    ? frameOneToTwoTransition
    : isFrameThree
      ? frameTwoToThreeTransition
      : smartAnimateTransition;

  const logoTransition = isFrameTwo
    ? frameOneToTwoTransition
    : isFrameThree
      ? frameTwoToThreeTransition
      : smartAnimateTransition;

  return (
    <motion.div
      className="splash-screen"
      animate={{
        opacity: isFadingOut ? 0 : 1,
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    >
      <div className="splash-canvas">

        {/* =====================================
            MASK / UNION GROUP
        ===================================== */}

        <motion.div
          className="arose-mask-group"
          animate={{
            left: platform.x,
            top: platform.y,
            width: platform.width,
            height: platform.height,
          }}
          transition={platformTransition}
        >
          <div className="union-rectangle" />

          <div className="union-bottom" />
        </motion.div>


        {/* =====================================
            AROSE LOGO
        ===================================== */}

        <motion.div
          className="arose-logo"
          animate={{
            left: logo.x,
            top: logo.y,
            width: logo.width,
            height: logo.height,
          }}
          transition={logoTransition}
        >
          <img
            src="/images/arose-logo.png"
            alt="AROSE"
          />
        </motion.div>


        {/* =====================================
            AROSE WORDMARK

            Appears only on Frame 4 & 5
        ===================================== */}

        <motion.div
          className="arose-wordmark"
          animate={{
            left: wordmark.x,
            top: wordmark.y,
            width: wordmark.width,
            height: wordmark.height,

            opacity:
              frame === FRAME.FOUR ||
              frame === FRAME.FIVE
                ? 1
                : 0,
          }}
          transition={{
            left: smartAnimateTransition,
            top: smartAnimateTransition,
            width: smartAnimateTransition,
            height: smartAnimateTransition,

            opacity: {
              duration: 0.3,
              ease: "easeOut",
            },
          }}
        >
          Arose
        </motion.div>

      </div>
    </motion.div>
  );
}