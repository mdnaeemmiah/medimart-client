import Image from "next/image";
import img1 from "../../../app/assets/img1.avif";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-12 bg-white rounded-lg shadow-md">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2">
        <Image
          src={img1}
          alt="MealBox Banner"
          width={600}
          height={400}
          className="w-full h-auto rounded-xl shadow-lg"
        />
      </div>

      {/* Right Side - Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
  <h1 className="text-4xl font-bold text-purple-700 mb-4">Welcome to Medicine Hub</h1>
  <p className="text-lg text-gray-600 mb-6">
    Discover trusted healthcare solutions and essential medicines, all in one place. Whether you are a customer seeking reliable medical products or a provider offering quality healthcare services, Medicine Hub connects health seekers with the care they need.
  </p>
  <button className="bg-[#EF1F76] text-white py-2 px-6 rounded-lg font-semibold hover:bg-[#C51963] transition duration-300">
    Explore More
  </button>
</div>
    </div>
  );
};

export default Banner;
