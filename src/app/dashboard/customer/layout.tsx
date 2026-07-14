
// import { AppSidebar } from "@/components/modules/dashboard/ASasidebar/app-sidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
import { CAppSidebar } from "@/components/modules/dashboard/CSidebar/app.sidebar";
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
      <CAppSidebar />
      <SidebarInset className="dashboard-shell text-slate-950 dark:text-slate-100">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-slate-200/80 bg-gradient-to-r from-white/95 via-white/85 to-sky-50/80 backdrop-blur-xl transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 dark:border-white/10 dark:from-slate-950/80 dark:via-slate-950/70 dark:to-sky-950/40">
          <div className="flex items-center gap-3 px-4">
            <SidebarTrigger className="-ml-1" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">Customer</p>
              <h1 className="text-sm font-semibold text-slate-900 dark:text-white">MediMart Care Portal</h1>
            </div>
          </div>
        </header>
        <div className="min-h-screen p-4 pt-2 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
