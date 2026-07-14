/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { ArrowRight, HeartPulse, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/veryfyToken";
import heroImage from "@/app/assets/photo-1580281657702-257584239a55.avif";

const Login = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login] = useLoginMutation();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Logging in...");

    try {
      const res = await login({ email: data.email, password: data.password }).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in successfully.", { id: toastId });
      window.location.href = "/";
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed", { id: toastId });
    }
  };

  return (
    <main className="grid min-h-screen bg-slate-50 text-slate-950 lg:grid-cols-[0.95fr_1.05fr] dark:bg-slate-950 dark:text-white">
      <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 inline-flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-teal-50 text-teal-700 ring-1 ring-teal-100 dark:bg-teal-400/10 dark:text-teal-300 dark:ring-teal-400/20">
              <HeartPulse className="size-5" />
            </span>
            <span className="text-lg font-bold">MediMart</span>
          </Link>

          <div className="surface-card rounded-lg p-6 sm:p-8">
            <p className="section-kicker">Welcome back</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
              Sign in to your care account
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Continue to medicine orders, doctor bookings, and patient support
              requests from one calm workspace.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Email is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-white/10 dark:bg-white/5"
                      />
                    )}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-rose-600">Email is required.</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-white/10 dark:bg-white/5"
                      />
                    )}
                  />
                </div>
                {errors.password && <p className="mt-1 text-xs text-rose-600">Password is required.</p>}
              </div>

              <Button type="submit" className="primary-action h-11 w-full rounded-lg">
                Login <ArrowRight className="size-4" />
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-teal-700 hover:underline dark:text-teal-300">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="relative hidden min-h-screen overflow-hidden lg:block">
        <Image
          src={heroImage}
          alt="Doctor reviewing healthcare information"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="absolute inset-x-10 bottom-10 rounded-lg border border-white/15 bg-white/10 p-6 text-white backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-100">
            Secure care access
          </p>
          <p className="mt-3 text-2xl font-bold">
            Medicines, doctors, and support requests stay organized from the
            first sign in.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
