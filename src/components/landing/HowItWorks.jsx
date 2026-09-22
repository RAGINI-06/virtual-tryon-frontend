
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

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-neutral-200 bg-[#f0ede8] py-24 sm:py-28"
    >

      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">

        <div className="max-w-2xl">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            How it works
          </p>

          <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            From photo to{" "}
            <span className="italic">
              possibility.
            </span>
          </h2>

        </div>


        <div className="mt-16 grid gap-5 md:grid-cols-3">

          {steps.map((step) => (
            <div
              key={step.number}
              className="group min-h-[330px] border border-neutral-300 bg-[#f8f7f4] p-7 transition hover:-translate-y-1 hover:shadow-lg"
            >

              <span className="text-xs tracking-[0.2em] text-neutral-400">
                {step.number}
              </span>

              <div className="mt-28">

                <h3 className="font-display text-2xl">
                  {step.title}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-500">
                  {step.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;