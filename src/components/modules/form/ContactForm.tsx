
// "use client";

// import { useState } from "react";
// import { postMessage } from "@/service/message";
// import { toast } from "sonner"; // Import Sonner

// export default function ContactForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { id, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const result = await postMessage(formData);
//       if (result) {
//         // Show success toast
//         toast.success("Message sent successfully!");
//         setFormData({
//           name: "",
//           email: "",
//           subject: "",
//           message: "",
//         });
//       } else {
//         toast.error("Failed to send message."); // Show error toast
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       toast.error("Error sending message."); // Show error toast
//     }
//   };

//   return (
//     <section className="min-h-screen  px-5 w-full mx-auto pt-9">
//       <div className="text-center">
//         <h1 className="text-5xl  mt-16 font-bold my-5 text-violet-600">
//           Get in Touch with Medicine
//         </h1>
//         <p className="text-xl  my-5">
//           Have questions about our meal plans or want to collaborate? Reach out!
//         </p>
//         <p className="text-xl my-5">
//           Whether you are a customer looking for delicious meals or a provider eager to join our platform, we are here to help.
//         </p>
//       </div>

//       <section className="mt-12">
//         <div className="container mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center underline mb-8 text-violet-600">
//             Contact Us
//           </h2>

//           <div className="flex flex-wrap -mx-6">
//             {/* Left: Contact Info */}
//             <div className="w-full md:w-1/2 px-6 mb-6 md:mb-0 flex flex-col justify-center">
//               <h3 className="text-2xl font-semibold mb-4 ">
//                 Get in Touch
//               </h3>
//               <p className="mb-4 text-xl ">
//                 We did love to hear from you! Whether you have a question about our services, need help, or just want to chat, reach out anytime.
//               </p>
//               <ul className="mb-4">
//                 <li className="mb-2">
//                   <strong>Address:</strong> 456 Meal Street, City 78910
//                 </li>
//                 <li className="mb-2">
//                   <strong>Phone:</strong> (123) 987-6543
//                 </li>
//                 <li className="mb-2">
//                   <strong>Email:</strong>{" "}
//                   <a
//                     href="mailto:support@mealbox.com"
//                     className="text-[#EF1F76] font-semibold hover:underline"
//                   >
//                     naeem@mealbox.com
//                   </a>
//                 </li>
//                 <li className="mb-2">
//                   <strong>Hours:</strong> Mon - Fri, 9am - 7pm
//                 </li>
//               </ul>
//               {/* <div className="flex space-x-4">
//                 <a href="#" className="text-gray-600 hover:text-[#3C0040]">
//                   <i className="fab fa-facebook-f"></i>
//                 </a>
//                 <a href="#" className="text-gray-600 hover:text-[#3C0040]">
//                   <i className="fab fa-twitter"></i>
//                 </a>
//                 <a href="#" className="text-gray-600 hover:text-[#3C0040]">
//                   <i className="fab fa-instagram"></i>
//                 </a>
//                 <a href="#" className="text-gray-600 hover:text-[#3C0040]">
//                   <i className="fab fa-linkedin"></i>
//                 </a>
//                 <a href="#" className="text-gray-600 hover:text-[#3C0040]">
//                   <i className="fab fa-youtube"></i>
//                 </a>
//               </div> */}
//             </div>

//             {/* Right: Contact Form */}
//             <div className="w-full md:w-1/2 px-6">
//               <h3 className="text-2xl font-semibold mb-4">
//                 Send Us a Message
//               </h3>
//               <form onSubmit={handleSubmit}>
//                 {/* Name */}
//                 <div className="mb-4">
//                   <label className="block  mb-2" htmlFor="name">
//                     Name
//                   </label>
//                   <input
//                     className="w-full px-4 py-2 border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C51963] "
//                     type="text"
//                     id="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Email */}
//                 <div className="mb-4">
//                   <label className="block  mb-2" htmlFor="email">
//                     Email
//                   </label>
//                   <input
//                     className="w-full px-4 py-2 border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C51963] "
//                     type="email"
//                     id="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Subject */}
//                 <div className="mb-4">
//                   <label className="block  mb-2" htmlFor="subject">
//                     Subject
//                   </label>
//                   <input
//                     className="w-full px-4 py-2 border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C51963] "
//                     type="text"
//                     id="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Message */}
//                 <div className="mb-4">
//                   <label className="block mb-2" htmlFor="message">
//                     Message
//                   </label>
//                   <textarea
//                     className="w-full px-4 py-2 border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C51963]"
//                     id="message"
//                     rows={4}
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                   ></textarea>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="bg-violet-600 mb-8 text-white py-2 px-4 rounded-md font-semibold hover:bg-[#C51963] hover:scale-105 transform transition duration-300"
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </section>
//   );
// }



"use client";

import { useState } from "react";
import { postMessage } from "@/service/message";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await postMessage(formData);
      if (result) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error sending message.");
    }
  };

  return (
    <section className="min-h-screen px-5 w-full mx-auto pt-9">
      <div className="text-center">
        <h1 className="text-5xl mt-16 font-bold my-5 text-violet-600">
          Contact Our Hospital
        </h1>
        <p className="text-xl my-5">
          Need assistance, have questions about our services, or want to schedule an appointment? Reach out to us!
        </p>
        <p className="text-xl my-5">
          Whether you are a patient, a family member, or a healthcare partner, we are here to provide the support you need.
        </p>
      </div>

      <section className="mt-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center underline mb-8 text-violet-600">
            Get in Touch
          </h2>

          <div className="flex flex-wrap -mx-6">
            {/* Left: Contact Info */}
            <div className="w-full md:w-1/2 px-6 mb-6 md:mb-0 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-4">
                Hospital Contact Information
              </h3>
              <p className="mb-4 text-xl">
                We are here for your health. Whether you need to speak to a doctor, inquire about treatments, or just ask a question—feel free to contact us.
              </p>
              <ul className="mb-4">
                <li className="mb-2">
                  <strong>Address:</strong> 123 Health Avenue, MedCity 10010
                </li>
                <li className="mb-2">
                  <strong>Phone:</strong> (123) 456-7890
                </li>
                <li className="mb-2">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:contact@medicarehospital.com"
                    className="text-violet-600 font-semibold hover:underline"
                  >
                    contact@medicarehospital.com
                  </a>
                </li>
                <li className="mb-2">
                  <strong>Hours:</strong> Mon - Sat, 8am - 8pm
                </li>
              </ul>
            </div>

            {/* Right: Contact Form */}
            <div className="w-full md:w-1/2 px-6">
              <h3 className="text-2xl font-semibold mb-4">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-4">
                  <label className="block mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="w-full px-4 py-2 border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a65deb]"
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-2 border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a65deb]"
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Subject */}
                <div className="mb-4">
                  <label className="block mb-2" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    className="w-full px-4 py-2 border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a65deb]"
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label className="block mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a65deb]"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-violet-600 mb-8 text-white py-2 px-4 rounded-md font-semibold hover:bg-[#C51963] hover:scale-105 transform transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
