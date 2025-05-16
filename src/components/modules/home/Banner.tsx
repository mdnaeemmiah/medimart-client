import Image from "next/image";
import img3 from "../../../app/assets/na.jpeg";  // Corrected import for img3
import img4 from "../../../app/assets/img12.jpeg";  // Corrected import for img4

const Banner = () => {
    return (
        <div className="p-8">
            {/* Title and Paragraph */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-purple-700 mb-4">
                    Welcome to Our Medicine Hub
                </h1>
                <div className="w-80 h-1 bg-green-500 mx-auto mb-4"></div>
                <p className="text-lg text-gray-600">
                    Whether you are a patient looking for reliable medications or a healthcare provider looking to expand your services, we have something for everyone. Explore our platform now!
                </p>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-6 justify-between space-y-6 md:space-y-0">
                {/* Left Section for Patients */}
                <div className="w-full md:w-1/2 flex flex-col items-center text-center space-y-6">
                    <Image 
                        width={500} 
                        height={500}
                        src={img3} // Using img3 for the left section
                        alt="Patient Image" 
                        className="w-full h-60 object-cover rounded-lg mb-6 md:mb-0" // Added margin bottom for space between images
                    />
                    <h2 className="text-2xl font-semibold text-gray-800">For Patients</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Find the right medications quickly.</li>
                        <li>Order medications from trusted sources.</li>
                        <li>Track your prescriptions and orders online.</li>
                    </ul>
                </div>

                {/* Right Section for Healthcare Providers */}
                <div className="w-full md:w-1/2 flex flex-col items-center text-center space-y-6">
                    <Image 
                        width={500} 
                        height={500}
                        src={img4} // Using img4 for the right section
                        alt="Healthcare Provider Image" 
                        className="w-full h-60 object-cover rounded-lg mb-6 md:mb-0" // Added margin bottom for space between images
                    />
                    <h2 className="text-2xl font-semibold text-gray-800">For Healthcare Providers</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Reach more patients with ease.</li>
                        <li>Offer a variety of medications and health services.</li>
                        <li>Expand your healthcare services online.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Banner;
