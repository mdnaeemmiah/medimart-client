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
    <section className="section-shell">
    <div className="surface-card rounded-lg p-6 md:p-10">
      <div className="mb-8 text-center">
        <p className="section-kicker">FAQ</p>
        <h2 className="section-title mt-3">Frequently Asked Questions</h2>
      </div>
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>What is MediMart?</AccordionTrigger>
              <AccordionContent>
                MediMart is an online healthcare platform that connects
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
                through MediMart.
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
                You can reach our support team at support@medimart.com or use
                the contact form available on our website for assistance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex justify-center">
          <Image
            width={500}
            height={500}
            src={img1}
            alt="FAQ Illustration"
            className="w-full max-w-sm rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
    </section>
  );
};

export default Question;
