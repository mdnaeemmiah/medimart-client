
import { AAppSidebar } from "@/components/modules/dashboard/ASidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AAppSidebar />
      <SidebarInset className="dashboard-shell text-slate-950 dark:text-slate-100">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-slate-200/80 bg-gradient-to-r from-white/95 via-white/85 to-emerald-50/80 backdrop-blur-xl transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 dark:border-white/10 dark:from-slate-950/80 dark:via-slate-950/70 dark:to-emerald-950/40">
          <div className="flex items-center gap-3 px-4">
            <SidebarTrigger className="-ml-1" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">Admin</p>
              <h1 className="text-sm font-semibold text-slate-900 dark:text-white">MediMart Command Center</h1>
            </div>
          </div>
        </header>
        <div className="min-h-screen p-4 pt-2 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
