"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from "../../../app/assets/img2.jpeg";
import img2 from "../../../app/assets/img3.jpeg";
import img3 from "../../../app/assets/img4.jpeg";
import img4 from "../../../app/assets/img5.jpeg";
import img5 from "../../../app/assets/img6.jpeg";

const healthcareProviders = [
  {
    id: 1,
    name: "Dr. Ayesha Khan",
    experience: "MBBS, 8 Years of Experience",
    description:
      "Specialist in internal medicine with a focus on personalized patient care and chronic disease management.",
    image: img1,
  },
  {
    id: 2,
    name: "Dr. Omar Siddiqui",
    experience: "MD, 10 Years of Experience",
    description:
      "Cardiologist providing expert heart care and preventive health solutions.",
    image: img2,
  },
  {
    id: 3,
    name: "Dr. Sara Malik",
    experience: "MBBS, 6 Years of Experience",
    description:
      "Pediatrician offering compassionate and comprehensive care for children and infants.",
    image: img3,
  },
  {
    id: 4,
    name: "Dr. Bilal Mehmood",
    experience: "MD, 12 Years of Experience",
    description:
      "Orthopedic specialist focused on bone and joint health with advanced treatment options.",
    image: img4,
  },
  {
    id: 5,
    name: "Dr. Fatima Noor",
    experience: "MBBS, 7 Years of Experience",
    description:
      "Dermatologist skilled in skincare treatments, acne therapy, and cosmetic dermatology.",
    image: img5,
  },
  {
    id: 6,
    name: "Dr. Kamran Ali",
    experience: "MD, 9 Years of Experience",
    description:
      "Neurologist dedicated to treating brain and nerve disorders with a patient-centered approach.",
    image: img3,
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 4,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const Company = () => {
  return (
    <div className="w-full mx-auto p-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)] rounded-xl  mt-10">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Meet Our Healthcare Experts
      </h2>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        arrows
        showDots
        className="rounded-lg"
      >
        {healthcareProviders.map((provider) => (
          <div key={provider.id} className="p-6 text-center">
            <Image
              width={160}
              height={160}
              src={provider.image}
              alt={provider.name}
              className="w-40 h-40 mx-auto rounded-full shadow-md border-4 border-purple-500"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">
              {provider.name}
            </h3>
            <p className="text-sm text-gray-500">{provider.experience}</p>
            <p className="text-gray-700 mt-2">{provider.description}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Company;
