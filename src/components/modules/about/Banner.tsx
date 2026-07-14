import Image from "next/image";
import img1 from "../../../app/assets/img1.avif";

const Banner = () => {
  return (
    <section className="section-shell">
    <div className="surface-card grid items-center gap-8 rounded-lg p-6 md:grid-cols-2 md:p-10">
      <div className="w-full">
        <Image
          src={img1}
          alt="MediMart healthcare team"
          width={600}
          height={400}
          className="h-auto w-full rounded-lg object-cover"
        />
      </div>

      <div className="text-center md:text-left">
  <p className="section-kicker">About MediMart</p>
  <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">Healthcare access made simpler</h1>
  <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
    Discover trusted healthcare solutions and essential medicines in one place.
    Whether you are seeking reliable products or connecting with providers,
    MediMart keeps the experience clear, secure, and easy to navigate.
  </p>
  <button className="primary-action mt-6 rounded-lg px-6 py-3 font-semibold transition">
    Explore More
  </button>
</div>
    </div>
    </section>
  );
};

export default Banner;
