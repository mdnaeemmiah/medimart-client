"use client"; // Ensures this runs on the client side

import { useEffect, useState } from "react";

const Heading = () => {
    const [districts, setDistricts] = useState([
        { zila: "Dhaka", services: "Cardiology, Neurology, General Medicine" },
        { zila: "Chittagong", services: "Orthopedics, Dermatology, Pediatrics" },
        { zila: "Sylhet", services: "ENT, Dental Care, Diagnostic Centers" },
        { zila: "Rajshahi", services: "Cancer Treatment, Pathology, Eye Care" },
        { zila: "Khulna", services: "Surgery, General Practice, Maternity" },
        { zila: "Barisal", services: "Child Care, Urology, Physiotherapy" },
        { zila: "Rangpur", services: "Dermatology, Diagnostics, Internal Medicine" },
        { zila: "Comilla", services: "Mental Health, Dentistry, ENT" },
        { zila: "Jessore", services: "Pediatrics, Pathology, Orthopedics" },
        { zila: "Bogra", services: "Cardiology, Neurology, Emergency Care" },
        { zila: "Mymensingh", services: "Maternity, General Checkup, Eye Care" },
        { zila: "Faridpur", services: "Pathology, General Surgery, Dentistry" },
        { zila: "Cox’s Bazar", services: "Emergency, Pharmacy, Clinics" },
        { zila: "Narayanganj", services: "Health Checkup, Diabetes Care, ENT" },
        { zila: "Pabna", services: "Neurology, General Health, Urology" },
    ]);

    useEffect(() => {
        setTimeout(() => {
            setDistricts((prev) => [
                ...prev,
                { zila: "Noakhali", services: "ENT, Maternity, Pharmacy" },
            ]);
        }, 3000);
    }, []);

    return (
        <div className="w-full bg-gray-100 py-6 text-center">
            <h2 className="text-3xl font-bold text-purple-700 mb-2">
                Explore Medical Services by District
            </h2>
            <div className="w-80 h-1 bg-blue-500 mx-auto mb-4"></div>

            <p className="text-lg text-gray-600 mb-6">
                Discover trusted healthcare services from across Bangladesh.  
                Each district offers specialized treatments, clinics, and hospitals  
                to ensure quality care. From Dhaka’s advanced facilities to Cox’s Bazar’s  
                coastal clinics, explore our nationwide medical hub today.
            </p>

            <div className="overflow-hidden w-full">
                <div className="flex gap-6 animate-marquee whitespace-nowrap">
                    {[...districts, ...districts].map((district, index) => (
                        <div
                            key={index}
                            className="w-64 h-52 bg-white shadow-lg rounded-xl p-4 flex flex-col items-center justify-center 
                                       transition transform hover:scale-105"
                        >
                            <h1 className="text-xl font-bold text-gray-800">{district.zila}</h1>
                            <p className="text-sm text-gray-600 mt-2 text-center">{district.services}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Heading;
