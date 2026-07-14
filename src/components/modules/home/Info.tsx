"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, UserRoundCheck } from "lucide-react";
import img1 from "../../../app/assets/photo-1576086213369-97a306d36557.avif";

export default function Info() {
  return (
    <section className="relative min-h-[calc(100vh-10rem)] overflow-hidden text-white">
      <Image
        src={img1}
        alt="Healthcare professional preparing medicine"
        fill
        priority
        sizes="100vw"
        quality={100}
        className="z-0 object-cover"
      />

      <div className="absolute inset-0 z-10 bg-slate-950/60" />

      <div className="section-shell relative z-20 flex min-h-[calc(100vh-10rem)] items-center py-16">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-teal-100 backdrop-blur">
            Pharmacy, doctors, and patient support in one place
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            MediMart
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-100 sm:text-lg">
            Order trusted medicines, find available doctors, and request help
            from a healthcare platform designed to feel simple, fast, and
            dependable.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/medicine"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-teal-500 px-6 font-semibold text-slate-950 shadow-lg shadow-teal-950/20 transition hover:bg-teal-400"
            >
              Shop medicines <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/doctor"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-6 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
            >
              Find doctors
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, label: "Verified care" },
              { icon: Truck, label: "Fast order flow" },
              { icon: UserRoundCheck, label: "Doctor access" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 px-4 py-3 backdrop-blur"
              >
                <Icon className="size-5 text-teal-200" />
                <span className="text-sm font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
