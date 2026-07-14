"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BadgeCheck, CalendarClock, Factory, Package, Pill, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useGetSingleMedicineQuery } from "@/redux/features/medicine/medicineSlice";

const MedicineDetails = () => {
  const params = useParams<{ medicineId: string }>();
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetSingleMedicineQuery(params.medicineId);
  const medicine = data?.data;

  const handleAddToCart = () => {
    if (!medicine) return;
    dispatch(
      addToCart({
        product: medicine._id,
        name: medicine.name,
        price: medicine.price,
        quantity: 1,
        stock: medicine.stock,
        imageUrl: "/medicine.svg",
      })
    );
    toast.success(`${medicine.name} added to cart.`);
  };

  if (isLoading) {
    return (
      <section className="section-shell py-16">
        <div className="surface-card h-96 animate-pulse rounded-lg bg-slate-100 dark:bg-white/10" />
      </section>
    );
  }

  if (isError || !medicine) {
    return (
      <section className="section-shell py-16">
        <div className="surface-card rounded-lg p-10 text-center">
          <Package className="mx-auto mb-3 size-10 text-slate-300" />
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white">Medicine not found</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">This item may have been removed from the catalog.</p>
          <Button asChild className="primary-action mt-6 rounded-lg">
            <Link href="/medicine">Back to shop</Link>
          </Button>
        </div>
      </section>
    );
  }

  const details = [
    { icon: Package, label: "Stock", value: `${medicine.stock} units available` },
    { icon: CalendarClock, label: "Expiry", value: medicine.expiryDate },
    { icon: Factory, label: "Manufacturer", value: medicine.manufacturer?.name || "Not listed" },
    {
      icon: BadgeCheck,
      label: "Prescription",
      value: medicine.requiresPrescription ? "Prescription required" : "No prescription required",
    },
  ];

  return (
    <section className="section-shell py-16">
      <div className="mb-8">
        <Link href="/medicine" className="text-sm font-semibold text-teal-700 hover:underline dark:text-teal-300">
          Back to medicines
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="surface-card rounded-lg p-8">
          <div className="grid aspect-square place-items-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
            <Pill className="size-24" />
          </div>
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Price</p>
            <p className="mt-1 text-4xl font-bold text-slate-950 dark:text-white">${medicine.price}</p>
          </div>
        </aside>

        <article className="surface-card rounded-lg p-6 sm:p-8">
          <p className="section-kicker">{medicine.id || "Medicine"}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            {medicine.name}
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
            {medicine.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                <Icon className="mb-3 size-5 text-teal-700 dark:text-teal-300" />
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
                <p className="mt-1 font-semibold text-slate-950 dark:text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <h2 className="font-bold text-slate-950 dark:text-white">Manufacturer contact</h2>
            <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <p>{medicine.manufacturer?.address || "Address not listed"}</p>
              <p>{medicine.manufacturer?.contact || "Contact not listed"}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="primary-action h-11 rounded-lg" onClick={handleAddToCart}>
              <ShoppingCart className="size-4" />
              Add to cart
            </Button>
            <Button variant="outline" className="h-11 rounded-lg" asChild>
              <Link href="/contact">Ask support</Link>
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
};

export default MedicineDetails;
