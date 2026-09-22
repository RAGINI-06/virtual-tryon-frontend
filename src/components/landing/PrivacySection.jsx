
function PrivacySection() {
  return (
    <section
      id="privacy"
      className="bg-[#171717] py-24 text-white sm:py-32"
    >

      <div className="mx-auto max-w-[1100px] px-6 text-center sm:px-8">

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Your privacy matters
        </p>

        <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">

          Your photos are yours.

          <br />

          <span className="italic text-neutral-400">
            Always.
          </span>

        </h2>

        <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-neutral-400 sm:text-base">

          AROSE is designed to make virtual try-on simple
          without making your personal images feel like
          they're no longer yours.

        </p>

    <a
  href="/register"
  className="rounded-full bg-[#bfae9c] px-6 py-2.5 text-sm font-medium text-[#302a25] transition hover:bg-[#ad9b87]"
>
          Try AROSE
        </a>

      </div>

    </section>
  );
}

export default PrivacySection;