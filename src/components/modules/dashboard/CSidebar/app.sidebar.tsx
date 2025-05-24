"use client";

import * as React from "react";
import {
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import img1 from "../../../../app/assets/logo-removebg-preview.png";
import Image from "next/image";
// import Logo from "@/app/assets/svgs/Logo";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "customerDashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Need Medicine",
      url: "needMedicine",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All",
          url: "/dashboard/customer/medicine/all",
        },
        {
          title: "Add",
          url: "/dashboard/customer/medicine/add",
        },
        {
          title: "Trash",
          url: "/dashboard/customer/medicine/trash",
        },
      ],
    },
    {
      title: "Order History",
      url: "orderHistory",
      icon: SquareTerminal,
      isActive: true,
    },
    // {
    //   title: "Manage Preferences",
    //   url: "ManagePreferences",
    //   icon: SquareTerminal,
    //   isActive: true,
    // },
    // {
    //   title: "OrderMeal",
    //   url: "orderMeal",
    //   icon: SquareTerminal,
    //   isActive: true,
    // },

    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/profile",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function CAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="flex items-center justify-center bg-gray-300"
            >
              <Link href="/">
                <div>
                  <Image height={40} width={40} src={img1} alt="image" />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
