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

  useEffect(() => {
    /*
     * =========================================================
     * FIGMA AUTO ANIMATION
     * =========================================================
     *
     * FRAME 1 → FRAME 2
     * After Timeout: 0.5s
     * Smart Animate
     * Cubic Bezier: (0.97, 0, 0, 0.98)
     * Duration: 1.5s
     *
     * FRAME 2 → FRAME 3
     * After Timeout: ~0.001s
     * Smart Animate
     * Spring:
     * mass: 1
     * stiffness: 101.7
     * damping: 7.06
     * Duration: ~2.05s
     *
     * FRAME 3 → FRAME 4
     * After Timeout: ~0.001s
     * Smart Animate
     * Quick
     * Duration: ~0.99s
     *
     * FRAME 4 → FRAME 5
     * After Timeout: ~0.001s
     * Smart Animate
     * Quick
     * Duration: ~0.99s
     */

    const timers = [];

    // FRAME 1 → FRAME 2
    timers.push(
      setTimeout(() => {
        setFrame(FRAME.TWO);
      }, 500)
    );

    // FRAME 2 → FRAME 3
    timers.push(
      setTimeout(() => {
        setFrame(FRAME.THREE);
      }, 500 + 1500 + 1)
    );

    // FRAME 3 → FRAME 4
    timers.push(
      setTimeout(() => {
        setFrame(FRAME.FOUR);
      }, 500 + 1500 + 1 + 2050 + 1)
    );

    // FRAME 4 → FRAME 5
    timers.push(
      setTimeout(() => {
        setFrame(FRAME.FIVE);
      }, 500 + 1500 + 1 + 2050 + 1 + 990 + 1)
    );

    /*
     * Keep final frame visible briefly,
     * then reveal the actual landing page.
     */
   timers.push(setTimeout(() => onComplete(), 6500));

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [onComplete]);

  /*
   * =========================================================
   * PLATFORM / UNION POSITIONS
   * =========================================================
   *
   * These come directly from your Figma measurements.
   */

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

  /*
   * =========================================================
   * LOGO POSITIONS
   * =========================================================
   *
   * Directly from Figma.
   */

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

  /*
   * =========================================================
   * SHADOW / DARK ELLIPSE
   * =========================================================
   *
   * Visible ONLY in Frames 1 and 2.
   */

  const shadow =
    frame === FRAME.ONE
      ? {
          x: 375,
          y: 572,
          width: 297,
          height: 92,
        }
      : {
          x: 167.4,
          y: 823,
          width: 79.4,
          height: 90,
        };

  /*
   * =========================================================
   * WORDMARK
   * =========================================================
   *
   * Frame 4:
   * x=164.3 y=480.4 w=172 h=77
   *
   * Frame 5:
   * x=164 y=481 w=210 h=77
   */

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

  /*
   * =========================================================
   * TRANSITIONS
   * =========================================================
   */

  const isFrameTwo = frame === FRAME.TWO;
  const isFrameThree = frame === FRAME.THREE;
  const isFrameFour = frame === FRAME.FOUR;
  const isFrameFive = frame === FRAME.FIVE;

  const smartAnimateTransition = {
    duration: 0.99,
    ease: "easeInOut",
  };

  const frameOneToTwoTransition = {
    duration: 1.5,
    ease: [0.97, 0, 0, 0.98],
  };

  const frameTwoToThreeTransition = {
    type: "spring",
    mass: 1,
    stiffness: 101.7,
    damping: 7.06,
  };

  /*
   * =========================================================
   * PLATFORM TRANSITION
   * =========================================================
   */

  const platformTransition = isFrameTwo
    ? frameOneToTwoTransition
    : isFrameThree
      ? frameTwoToThreeTransition
      : smartAnimateTransition;

  /*
   * =========================================================
   * LOGO TRANSITION
   * =========================================================
   */

  const logoTransition = isFrameTwo
    ? frameOneToTwoTransition
    : isFrameThree
      ? frameTwoToThreeTransition
      : smartAnimateTransition;

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="splash-screen">

      {/* =====================================================
          430 × 932 FIGMA CANVAS
          ===================================================== */}

      <div className="splash-canvas">

        {/* ===================================================
            MASK GROUP / UNION
            =================================================== */}

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

          {/* Rectangle part of Union */}
          <div className="union-rectangle" />

          {/* Bottom ellipse part of Union */}
          <div className="union-bottom" />

        </motion.div>


        {/* ===================================================
            DARK ELLIPSE / SHADOW
            =================================================== */}



        {/* ===================================================
            LOGO IMAGE
            =================================================== */}

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


        {/* ===================================================
            AROSE WORDMARK
            =================================================== */}

        <motion.div
          className="arose-wordmark"
          animate={{
            left: wordmark.x,
            top: wordmark.y,
            width: wordmark.width,
            height: wordmark.height,

            opacity:
              frame === FRAME.FOUR || frame === FRAME.FIVE
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
    </div>
  );
}