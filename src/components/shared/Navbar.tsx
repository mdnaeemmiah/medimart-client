"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Minus,
  Plus,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/features/order/orderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import img1 from "../../app/assets/logo-removebg-preview.png";
import Theme from "./Theme";

const links = [
  { href: "/", label: "Home" },
  { href: "/medicine", label: "Shop" },
  { href: "/doctor", label: "Doctors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const CartSheet = () => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector((state) => state.cart);
  const [createOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    await createOrder({
      products: cartData.items.map(({ product, quantity }) => ({
        product,
        quantity,
      })),
    });
  };

  useEffect(() => {
    if (isLoading) toast.loading("Processing order...");
    if (isSuccess) {
      toast.success(data?.message || "Order created successfully.");
      if (data?.data) {
        setTimeout(() => (window.location.href = data.data), 1000);
      }
    }
    if (isError) toast.error(JSON.stringify(error));
  }, [isLoading, isSuccess, isError, data, error]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-full border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:text-teal-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
          aria-label="Open cart"
        >
          <ShoppingCart className="size-5" />
          {cartData.totalQuantity > 0 && (
            <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-rose-500 text-[11px] font-bold text-white">
              {cartData.totalQuantity}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col gap-0 border-slate-200 bg-white p-0 dark:border-white/10 dark:bg-slate-950">
        <SheetHeader className="border-b border-slate-200 p-6 text-left dark:border-white/10">
          <SheetTitle className="text-2xl">Your Cart</SheetTitle>
          <SheetDescription>
            Review your medicines before checkout.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {cartData.items.length > 0 ? (
            <ul className="space-y-4">
              {cartData.items.map((item) => (
                <li
                  key={item.product}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-950 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-sm text-slate-500">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <p className="font-bold text-teal-700 dark:text-teal-300">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.product,
                              quantity: Math.max(item.quantity - 1, 1),
                            })
                          )
                        }
                        aria-label={`Decrease ${item.name}`}
                      >
                        <Minus className="size-4" />
                      </Button>
                      <span className="min-w-8 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.product,
                              quantity: Math.min(item.quantity + 1, item.stock),
                            })
                          )
                        }
                        aria-label={`Increase ${item.name}`}
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-500/10"
                      onClick={() => dispatch(removeFromCart(item.product))}
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid min-h-72 place-items-center rounded-lg border border-dashed border-slate-300 text-center dark:border-white/15">
              <div>
                <ShoppingCart className="mx-auto mb-3 size-10 text-slate-300" />
                <p className="font-medium text-slate-700 dark:text-slate-200">
                  Your cart is empty
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Add medicines from the shop to begin.
                </p>
              </div>
            </div>
          )}
        </div>

        <SheetFooter className="border-t border-slate-200 p-6 dark:border-white/10">
          <div className="w-full space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Total items</span>
                <span className="font-semibold">{cartData.totalQuantity}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-950 dark:text-white">
                <span>Total</span>
                <span>${cartData.totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <SheetClose asChild>
              <Button
                onClick={handlePlaceOrder}
                disabled={!cartData.items.length || isLoading}
                className="primary-action h-11 w-full rounded-lg"
              >
                Place Order
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default function Navbar() {
  const user = useAppSelector((state) => state.auth.user);
  const userRole =
    useAppSelector((state) => state?.auth?.user?.role) || "customer";
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const dashboardRoute =
    userRole === "admin"
      ? "/dashboard/admin/adminDashboard"
      : userRole === "customer"
      ? "/dashboard/customer/customerDashboard"
      : "/dashboard";

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Successfully logged out.");
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  const navLinks = (
    <>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setIsMenuOpen(false)}
          className={`rounded-full px-3 py-2 text-sm font-medium transition ${
            pathname === href
              ? "bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          }`}
        >
          {label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85">
      <nav className="section-shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-teal-50 ring-1 ring-teal-100 dark:bg-teal-400/10 dark:ring-teal-400/20">
            <Image height={34} width={34} src={img1} alt="MediMart logo" />
          </span>
          <span className="hidden text-lg font-bold tracking-tight text-slate-950 sm:block dark:text-white">
            MediMart
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">{navLinks}</div>

        <div className="flex items-center gap-2">
          <CartSheet />
          <Theme />

          {!user ? (
            <Button className="primary-action hidden rounded-full px-5 sm:inline-flex" asChild>
              <Link href="/login">Login</Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer border border-slate-200 bg-teal-700 text-white dark:border-white/10">
                  <AvatarFallback className="bg-transparent">
                    {user?.email?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="size-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={dashboardRoute} className="flex items-center gap-2">
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-2 text-rose-600"
                  onClick={handleLogout}
                >
                  <LogOut className="size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button
            variant="outline"
            size="icon"
            className="rounded-full md:hidden"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden dark:border-white/10 dark:bg-slate-950">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks}
            {!user && (
              <Button className="primary-action mt-2 rounded-full" asChild>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
