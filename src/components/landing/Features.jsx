
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

function Features() {
  return (
    <section
      id="features"
      className="bg-[#f8f7f4] py-24 sm:py-28"
    >

      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">

        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">

          {/* Heading */}

          <div>

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

          </div>


          {/* Feature grid */}

          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">

            {features.map((feature) => (
              <div
                key={feature.number}
                className="border-t border-neutral-200 pt-5"
              >

                <div className="flex items-start justify-between">

                  <h3 className="font-display text-2xl">
                    {feature.title}
                  </h3>

                  <span className="text-xs text-neutral-400">
                    {feature.number}
                  </span>

                </div>

                <p className="mt-4 text-sm leading-7 text-neutral-500">
                  {feature.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default Features;