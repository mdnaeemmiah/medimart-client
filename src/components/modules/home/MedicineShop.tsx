"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import Link from "next/link";
import { getMedicines } from "@/service/shopService";

interface MedicineType {
  id:string;
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
  const [medicines, setProviders] = useState<MedicineType[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const result = await getMedicines();
        if (result?.success && Array.isArray(result.data)) {
          setProviders(result.data);
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    fetchProviders();
  }, []);


  const handleAddToCart = (medicine: MedicineType) => {
    dispatch(
      addToCart({
        product: medicine._id,
        name: medicine.name,
        price: medicine.price,
        quantity: 1,
        stock: medicine.stock,
        imageUrl: "/medicine.svg", // Placeholder or use a real one
      })
    );
    toast.success(`${medicine.name} added to cart!`);
  };

  return (
    <div className="p-4  shadow-lg rounded-2xl border border-gray-200 text-center">
      <h2 className="text-xl font-semibold mb-4">Available Medicines</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
        {medicines.map((medicine) => (
          <div
            key={medicine._id}
            className="p-4  rounded-lg  shadow-[0_4px_20px_rgba(0,0,0,0.5)]  transition-transform duration-300 hover:scale-100"
          >
            <p ><strong>ID:</strong> {medicine.id}</p>
            <p ><strong>Name:</strong> {medicine.name}</p>
            <p ><strong>Description:</strong> {medicine.description}</p>
            <p ><strong>Price:</strong> ${medicine.price}</p>
            <p ><strong>Stock:</strong> {medicine.stock}</p>
            <p ><strong>Requires Prescription:</strong> {medicine.requiresPrescription ? "Yes" : "No"}</p>
            <p ><strong>Expiry Date:</strong> {medicine.expiryDate}</p>
            <p ><strong>Manufacturer:</strong> {medicine.manufacturer.name}</p>
            <p ><strong>Address:</strong> {medicine.manufacturer.address}</p>
            <p ><strong>Contact:</strong> {medicine.manufacturer.contact}</p>

            <Link href={`/medicine/${medicine._id}`}>
              <p className="text-green-500 font-bold underline pt-3 text-center">View Details</p>
            </Link>
           
            <Button onClick={() => handleAddToCart(medicine)} className="mt-4 w-full">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineShop;
