
// function Hero() {
//   return (
//     <section className="relative min-h-screen overflow-hidden">

//       {/* Background decoration */}
//       <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#eee5dc] blur-3xl" />

//       <div className="mx-auto grid min-h-screen max-w-[1440px] items-center gap-12 px-6 pb-16 pt-32 sm:px-8 lg:grid-cols-2 lg:px-12 lg:pt-20">

//         {/* LEFT SIDE */}
//         <div className="relative z-10 max-w-[650px]">

//           <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
//             AI-powered virtual try-on
//           </p>

//           <h1 className="font-display text-[52px] leading-[0.98] tracking-[-0.04em] sm:text-[68px] lg:text-[88px]">

//             See yourself

//             <br />

//             <span className="italic">
//               differently.
//             </span>

//           </h1>

//           <p className="mt-8 max-w-[500px] text-[15px] leading-7 text-neutral-500 sm:text-base">

//             Experience your clothes before you wear them.
//             Upload your photo, choose a garment, and let
//             AROSE create your look.

//           </p>

//           <div className="mt-9 flex flex-wrap gap-4">

//  <a
//   href="/register"
//   className="rounded-full bg-[#b8a99a] px-7 py-4 text-sm font-medium text-[#2f2924] transition hover:bg-[#a99a89]"
// >
//               Try it on
//             </a>

//             <a
//               href="#how-it-works"
//               className="rounded-full border border-neutral-300 px-7 py-4 text-sm transition hover:border-black"
//             >
//               See how it works
//             </a>

//           </div>

//           <div className="mt-9 flex items-center gap-3 text-xs text-neutral-400">

//             <span className="h-2 w-2 rounded-full bg-green-500" />

//             Your photos stay private

//           </div>

//         </div>


//         {/* RIGHT SIDE */}
//         <div className="relative mx-auto w-full max-w-[560px]">

//           <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-[#e7dfd7]">

//             {/* Decorative circles */}
//             <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/40" />

//             <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-white/40" />
// <div className="absolute inset-0 flex items-center justify-center">
//   <div className="relative h-[82%] w-[65%]">
//     <img
//       src="/images/landing-model.png"
//       alt="AROSE fashion model"
//       className="h-full w-full object-contain object-center"
//     />
//   </div>
// </div>


//             {/* Bottom information card */}
//             <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/75 p-4 backdrop-blur-md">

//               <div className="flex items-center justify-between">

//                 <div>

//                   <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
//                     AROSE
//                   </p>

//                   <p className="mt-1 text-sm font-medium">
//                     Your look, reimagined.
//                   </p>

//                 </div>

//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
//                   →
//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }

// export default Hero;
import { Link } from "react-router-dom";
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
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#eee5dc] blur-3xl" />

      <div className="mx-auto grid min-h-screen max-w-[1440px] items-center gap-12 px-6 pb-16 pt-32 sm:px-8 lg:grid-cols-2 lg:px-12 lg:pt-20">

        {/* LEFT SIDE */}
        <div className="relative z-10 max-w-[650px]">

          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
            AI-powered virtual try-on
          </p>

          <h1 className="font-display text-[52px] leading-[0.98] tracking-[-0.04em] sm:text-[68px] lg:text-[88px]">
            See yourself
            <br />
            <span className="italic">
              differently.
            </span>
          </h1>

          <p className="mt-8 max-w-[500px] text-[15px] leading-7 text-neutral-500 sm:text-base">
            Experience your clothes before you wear them.
            Upload your photo, choose a garment, and let
            AROSE create your look.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="rounded-full bg-[#b8a99a] px-7 py-4 text-sm font-medium text-[#2f2924] transition hover:bg-[#a99a89]"
            >
              Try it on
            </Link>

            <a
              href="#how-it-works"
              className="rounded-full border border-neutral-300 px-7 py-4 text-sm transition hover:border-black"
            >
              See how it works
            </a>
          </div>

          <div className="mt-9 flex items-center gap-3 text-xs text-neutral-400">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Your photos stay private
          </div>

        </div>

        {/* RIGHT SIDE — INFINITE SPIRAL */}
        <div className="relative mx-auto w-full max-w-[560px]">

          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]">

            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/40" />

            <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-white/40" />

            {/* Infinite Spiral */}
            <div className="absolute inset-0">
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
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;