"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { postMessage } from "@/service/message";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        toast.success("Message sent successfully.");
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
    <section className="section-shell py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="section-kicker">Contact</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
          We are here to help
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
          Ask about medicine availability, doctor appointments, order support,
          or provider partnerships. The MediMart team will get back to you.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="surface-card rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
            Support details
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Our support hours are designed around everyday healthcare needs,
            from order questions to appointment guidance.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                <MapPin className="size-5" />
              </span>
              <div>
                <p className="font-semibold text-slate-950 dark:text-white">Address</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  123 Health Avenue, Dhaka, Bangladesh
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                <Phone className="size-5" />
              </span>
              <div>
                <p className="font-semibold text-slate-950 dark:text-white">Phone</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  +880 1234 567890
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                <Mail className="size-5" />
              </span>
              <div>
                <p className="font-semibold text-slate-950 dark:text-white">Email</p>
                <a
                  href="mailto:support@medimart.com"
                  className="text-sm font-semibold text-teal-700 hover:underline dark:text-teal-300"
                >
                  support@medimart.com
                </a>
              </div>
            </div>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="surface-card rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
            Send a message
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="name">
                Name
              </label>
              <input
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-white/10 dark:bg-white/5"
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="email">
                Email
              </label>
              <input
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-white/10 dark:bg-white/5"
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="subject">
              Subject
            </label>
            <input
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-white/10 dark:bg-white/5"
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              required
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="message">
              Message
            </label>
            <textarea
              className="min-h-36 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-white/10 dark:bg-white/5"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="primary-action mt-6 inline-flex h-11 items-center justify-center rounded-lg px-6 font-semibold transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
