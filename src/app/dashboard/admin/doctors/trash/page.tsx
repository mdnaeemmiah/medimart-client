import React from "react";

const Page = () => {
    return (
        <div className="p-4">
            <section className="dashboard-card relative overflow-hidden p-6 md:p-8">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-rose-500/20 via-amber-400/10 to-transparent" />
                <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-700 dark:text-rose-200">
                        Doctors
                    </p>
                    <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Trash Bin</h1>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Deleted doctors will appear here for restoration.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Page;