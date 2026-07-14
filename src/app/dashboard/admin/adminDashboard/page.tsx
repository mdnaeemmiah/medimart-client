import AdminGraph from "@/components/modules/graph/AdminGraph";


export default function UserDashboard() {
    return (
      <div className="space-y-6 py-4">
        <section className="dashboard-card relative overflow-hidden p-6 md:p-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-emerald-500/25 via-sky-400/10 to-transparent" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-200">
              Overview
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Admin Command Center</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Track doctors, inventory, orders, and platform messages in one place.
            </p>
          </div>
        </section>

        <section className="dashboard-card p-4 md:p-6">
          <AdminGraph />
        </section>
      </div>
    );
  }
