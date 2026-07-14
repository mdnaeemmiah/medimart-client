"use client";

import React from "react";
import { Button, Input, Switch } from "antd";

const SettingsPage = () => {
  return (
    <div className="space-y-6 p-4">
      <section className="dashboard-card relative overflow-hidden p-6 md:p-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-emerald-500/25 via-sky-400/10 to-transparent" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-200">
            Settings
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Admin Preferences</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Manage account details, security, and workflow defaults.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="dashboard-card p-5 md:p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Profile Information</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update your admin contact details and office info.
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Full Name</label>
              <Input className="dashboard-input mt-2" placeholder="Admin name" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email</label>
              <Input className="dashboard-input mt-2" placeholder="admin@medimart.com" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Phone</label>
              <Input className="dashboard-input mt-2" placeholder="01XXXXXXXXX" />
            </div>
          </div>
        </div>

        <div className="dashboard-card p-5 md:p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Notifications</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Decide which updates should alert your team.
          </p>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-emerald-200/60 bg-white/70 px-4 py-3 shadow-sm dark:border-emerald-400/20 dark:bg-slate-900/60">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">New order alerts</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Notify on every order placement.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-emerald-200/60 bg-white/70 px-4 py-3 shadow-sm dark:border-emerald-400/20 dark:bg-slate-900/60">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Doctor availability changes</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Keep tabs on schedule updates.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-emerald-200/60 bg-white/70 px-4 py-3 shadow-sm dark:border-emerald-400/20 dark:bg-slate-900/60">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Low stock warnings</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Alert when medicines drop below threshold.</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="dashboard-card p-5 md:p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Security</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Keep admin access secure with strong credentials.
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">New Password</label>
              <Input.Password className="dashboard-input mt-2" placeholder="Enter new password" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Confirm Password</label>
              <Input.Password className="dashboard-input mt-2" placeholder="Confirm password" />
            </div>
            <Button type="primary" className="h-10 px-6 shadow-lg shadow-emerald-500/20">
              Update Password
            </Button>
          </div>
        </div>

        <div className="dashboard-card p-5 md:p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Operations</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Control dashboard defaults for your team.
          </p>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-emerald-200/60 bg-white/70 px-4 py-3 shadow-sm dark:border-emerald-400/20 dark:bg-slate-900/60">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Auto-approve doctors</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Skip manual review on profiles.</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-emerald-200/60 bg-white/70 px-4 py-3 shadow-sm dark:border-emerald-400/20 dark:bg-slate-900/60">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Compact tables</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Reduce spacing in admin tables.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
