"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import img1 from "../../../app/assets/download (4).jpeg";

const Question = () => {
  return (
    <div className="w-full mx-auto p-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)] rounded-xl  mt-10">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side - Accordion */}
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>What is Medicine Hub?</AccordionTrigger>
              <AccordionContent>
                Medicine Hub is an online healthcare platform that connects
                users with reliable pharmacies and healthcare providers,
                offering a wide range of medicines and health services.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>How does Medicine Hub work?</AccordionTrigger>
              <AccordionContent>
                Customers can browse available medicines or services, place an
                order, and get them delivered to their doorstep or consult with
                verified healthcare professionals online.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>
                Can I register as a pharmacy or provider?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely! Licensed pharmacies, clinics, and healthcare
                professionals can sign up to offer their products or services
                through Medicine Hub.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>
                What payment methods are accepted?
              </AccordionTrigger>
              <AccordionContent>
                We accept major credit/debit cards, mobile banking, and other
                secure online payment methods.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q5">
              <AccordionTrigger>
                How do I contact customer support?
              </AccordionTrigger>
              <AccordionContent>
                You can reach our support team at support@medicinehub.com or use
                the contact form available on our website for assistance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Right Side - Image */}
        <div className="flex justify-center">
          <Image
            width={500}
            height={500}
            src={img1}
            alt="FAQ Illustration"
            className="w-full max-w-sm rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Question;
