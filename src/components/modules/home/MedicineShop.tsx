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
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Medicines</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
        {medicines.map((medicine) => (
          <div
            key={medicine._id}
            className="p-4  rounded-lg shadow-md transition-transform duration-300 hover:scale-100"
          >
            <p className="text-gray-600"><strong>ID:</strong> {medicine.id}</p>
            <p className="text-gray-600"><strong>Name:</strong> {medicine.name}</p>
            <p className="text-gray-600"><strong>Description:</strong> {medicine.description}</p>
            <p className="text-gray-600"><strong>Price:</strong> ${medicine.price}</p>
            <p className="text-gray-600"><strong>Stock:</strong> {medicine.stock}</p>
            <p className="text-gray-600"><strong>Requires Prescription:</strong> {medicine.requiresPrescription ? "Yes" : "No"}</p>
            <p className="text-gray-600"><strong>Expiry Date:</strong> {medicine.expiryDate}</p>
            <p className="text-gray-600"><strong>Manufacturer:</strong> {medicine.manufacturer.name}</p>
            <p className="text-gray-600"><strong>Address:</strong> {medicine.manufacturer.address}</p>
            <p className="text-gray-600"><strong>Contact:</strong> {medicine.manufacturer.contact}</p>

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
