import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-12 dark:border-white/10 dark:bg-slate-950">
      <div className="section-shell grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="mb-3 text-lg font-bold text-slate-950 dark:text-white">MediMart</h2>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            Trusted medicines, doctor access, and patient support in one calm,
            secure healthcare marketplace.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold text-slate-950 dark:text-white">Care Services</h2>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>Verified medicines</li>
            <li>Doctor appointments</li>
            <li>Prescription-aware orders</li>
            <li>Patient request support</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold text-slate-950 dark:text-white">Quick Links</h2>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li><Link href="/" className="hover:text-teal-600">Home</Link></li>
            <li><Link href="/medicine" className="hover:text-teal-600">Shop</Link></li>
            <li><Link href="/doctor" className="hover:text-teal-600">Doctors</Link></li>
            <li><Link href="/about" className="hover:text-teal-600">About</Link></li>
            <li><Link href="/contact" className="hover:text-teal-600">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold text-slate-950 dark:text-white">Contact</h2>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p className="flex items-center gap-2"><MapPin className="size-4 text-teal-600" /> Dhaka, Bangladesh</p>
            <p className="flex items-center gap-2"><Phone className="size-4 text-teal-600" /> +880 1234 567890</p>
            <p className="flex items-center gap-2"><Mail className="size-4 text-teal-600" /> support@medimart.com</p>
          </div>
          <div className="mt-5 flex gap-3">
            <a href="https://facebook.com" aria-label="Facebook" className="grid size-9 place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-teal-100 hover:text-teal-700 dark:bg-white/10 dark:text-slate-200"><Facebook className="size-4" /></a>
            <a href="https://instagram.com" aria-label="Instagram" className="grid size-9 place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-teal-100 hover:text-teal-700 dark:bg-white/10 dark:text-slate-200"><Instagram className="size-4" /></a>
            <a href="https://youtube.com" aria-label="YouTube" className="grid size-9 place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-teal-100 hover:text-teal-700 dark:bg-white/10 dark:text-slate-200"><Youtube className="size-4" /></a>
          </div>
        </div>
      </div>

      <div className="section-shell mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
        &copy; {new Date().getFullYear()} MediMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
