// import Link from "next/link";
// import img1 from "../../../app/assets/photo-1576086213369-97a306d36557.avif";

// const Info = () => {
//   return (
//     <div
//       className="relative h-[600px] flex items-center justify-center bg-cover rounded-2xl bg-center my-4"
//       style={{ backgroundImage: `url(${img1.src})` }} // ✅ Use .src
//     >
//       <div className="absolute inset-0 bg-opacity-50"></div>

//       <div className="relative text-center text-white px-6 max-w-2xl">
// <h1 className="text-5xl font-bold text-white shadow-2xl mb-4">
//   MediConnect
// </h1>
// <p className="text-lg mb-6">
//   Access trusted healthcare professionals at your fingertips. Book
//   appointments, consult online, and manage your health – all in one
//   secure platform.
// </p>

// <div className="flex justify-center gap-4">
//   <Link href="/login">
//     <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
//       Get Started
//     </button>
//   </Link>
//   <Link href="/contact">
//     <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition">
//       Contact Us
//     </button>
//   </Link>
// </div>
//       </div>
//     </div>
//   );
// };

// export default Info;

"use client";

import Image from "next/image";
import img1 from "../../../app/assets/photo-1576086213369-97a306d36557.avif";
import Link from "next/link";

export default function Info() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center text-white">
      {/* Background Image */}
      <Image
        src={img1}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4">
        <h1 className="text-5xl font-bold text-white shadow-2xl mb-4">
          MediConnect
        </h1>
        <p className="text-lg mb-6">
          Access trusted healthcare professionals at your fingertips. Book
          appointments, consult online, and manage your health – all in one
          secure platform.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/login">
            <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
              Get Started
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
