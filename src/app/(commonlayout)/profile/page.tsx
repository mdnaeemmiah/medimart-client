"use client";

import Link from "next/link";
import { CalendarDays, LayoutDashboard, Mail, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role || "Guest";
  const dashboardRoute =
    role === "admin"
      ? "/dashboard/admin/adminDashboard"
      : role === "customer"
      ? "/dashboard/customer/customerDashboard"
      : "/login";

  return (
    <section className="section-shell py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="section-kicker">Profile</p>
          <h1 className="section-title mt-3">Your MediMart Account</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            A compact view of your account identity and care workspace access.
          </p>
        </div>

        <div className="surface-card grid overflow-hidden rounded-lg md:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-teal-700 p-8 text-white dark:bg-teal-500 dark:text-slate-950">
            <div className="grid size-24 place-items-center rounded-full bg-white/15 text-4xl font-bold ring-1 ring-white/25">
              {(user?.name || user?.email || "M").charAt(0).toUpperCase()}
            </div>
            <h2 className="mt-6 text-3xl font-bold">{user?.name || "MediMart User"}</h2>
            <p className="mt-2 capitalize text-teal-50 dark:text-slate-800">{role}</p>
            <Button asChild className="mt-8 h-11 rounded-lg bg-white text-teal-800 hover:bg-teal-50 dark:bg-slate-950 dark:text-white">
              <Link href={dashboardRoute}>
                <LayoutDashboard className="size-4" />
                Open dashboard
              </Link>
            </Button>
          </div>

          <div className="p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-950 dark:text-white">Account details</h3>
            <div className="mt-6 grid gap-4">
              <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                <UserRound className="size-5 text-teal-700 dark:text-teal-300" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Name</p>
                  <p className="font-semibold text-slate-950 dark:text-white">{user?.name || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                <Mail className="size-5 text-teal-700 dark:text-teal-300" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Email</p>
                  <p className="font-semibold text-slate-950 dark:text-white">{user?.email || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                <ShieldCheck className="size-5 text-teal-700 dark:text-teal-300" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Role</p>
                  <p className="font-semibold capitalize text-slate-950 dark:text-white">{role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                <CalendarDays className="size-5 text-teal-700 dark:text-teal-300" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Session</p>
                  <p className="font-semibold text-slate-950 dark:text-white">
                    {user?.exp ? `Expires ${new Date(user.exp * 1000).toLocaleDateString()}` : "Active when logged in"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
