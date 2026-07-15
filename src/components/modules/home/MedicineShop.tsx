"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  CalendarClock,
  Factory,
  Package,
  ShoppingCart,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { getMedicines } from "@/service/shopService";

interface MedicineType {
  id: string;
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  requiresPrescription: boolean;
  manufacturer: {
    name: string;
    address: string;
    contact: string;
  };
  expiryDate: string;
}

const MedicineShop = () => {
  const [medicines, setMedicines] = useState<MedicineType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const result = await getMedicines();
        if (result?.success && Array.isArray(result.data)) {
          setMedicines(result.data);
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const handleAddToCart = (medicine: MedicineType) => {
    if (!user) {
      toast.error("Please login first.");
      router.push("/login");
      return;
    }

    dispatch(
      addToCart({
        product: medicine._id,
        name: medicine.name,
        price: medicine.price,
        quantity: 1,
        stock: medicine.stock,
        imageUrl: "/medicine.svg",
      }),
    );
    toast.success(`${medicine.name} added to cart.`);
  };

  return (
    <section className="section-shell py-16">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="section-kicker">MediMart shop</p>
          <h2 className="section-title mt-3">Available Medicines</h2>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            Browse stocked medicines with prescription details, expiry dates,
            and manufacturer information before adding them to your cart.
          </p>
        </div>
        <div className="rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
          {medicines.length} items listed
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="surface-card h-72 animate-pulse rounded-lg bg-slate-100 dark:bg-white/10"
            />
          ))}
        </div>
      ) : medicines.length ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {medicines.map((medicine) => (
            <article
              key={medicine._id}
              className="surface-card flex min-h-[360px] flex-col rounded-lg p-5 transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-md dark:hover:border-teal-400/30"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {medicine.id || "Medicine"}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">
                    {medicine.name}
                  </h3>
                </div>
                <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                  ${medicine.price}
                </span>
              </div>

              <p className="line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {medicine.description}
              </p>

              <div className="mt-5 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
                <p className="flex items-center gap-2">
                  <Package className="size-4 text-teal-600" />
                  {medicine.stock} in stock
                </p>
                <p className="flex items-center gap-2">
                  <CalendarClock className="size-4 text-teal-600" />
                  Expires {medicine.expiryDate}
                </p>
                <p className="flex items-center gap-2">
                  <Factory className="size-4 text-teal-600" />
                  {medicine.manufacturer?.name}
                </p>
                <p className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-teal-600" />
                  {medicine.requiresPrescription
                    ? "Prescription required"
                    : "No prescription required"}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  className="primary-action flex-1 rounded-lg"
                  onClick={() => handleAddToCart(medicine)}
                >
                  <ShoppingCart className="size-4" />
                  Add
                </Button>
                <Button variant="outline" className="flex-1 rounded-lg" asChild>
                  <Link href={`/medicine/${medicine._id}`}>Details</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="surface-card rounded-lg p-10 text-center">
          <Package className="mx-auto mb-3 size-10 text-slate-300" />
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            No medicines available
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Please check back after new stock is added.
          </p>
        </div>
      )}
    </section>
  );
};

export default MedicineShop;
