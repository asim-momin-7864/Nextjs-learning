import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="w-full lg:max-w-4xl xl:max-w-5xl m-auto px-5 flex flex-col gap-y-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <div className="relative w-10 h-10 bg-white rounded-full p-1">
                <Image src="/s4.png" alt="Logo" fill sizes="40px" className="object-contain" />
              </div>
              <span className="text-white font-bold text-xl">Software Co.</span>
            </div>
            <p className="text-sm">
              Providing top-notch software solutions to help your business scale, innovate, and lead in the digital future.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-white font-bold text-lg">Quick Links</h3>
            <ul className="flex flex-col gap-y-2 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-white font-bold text-lg">Our Services</h3>
            <ul className="flex flex-col gap-y-2 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Custom Software</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Web Development</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Mobile Apps</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Cloud Solutions</Link></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-white font-bold text-lg">Connect With Us</h3>
            <p className="text-sm">fox3@gmail.com</p>
            <p className="text-sm">+1 (123) 456-7890</p>
            <div className="flex flex-row gap-x-4 mt-2">
              <Link href="#" className="text-white hover:text-blue-400 transition-colors">
                <FaFacebook size={24} />
              </Link>
              <Link href="#" className="text-white hover:text-blue-400 transition-colors">
                <FaTwitter size={24} />
              </Link>
              <Link href="#" className="text-white hover:text-blue-400 transition-colors">
                <FaLinkedin size={24} />
              </Link>
              <Link href="#" className="text-white hover:text-blue-400 transition-colors">
                <FaInstagram size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-5 flex flex-col sm:flex-row justify-between items-center gap-y-3 text-sm">
          <p>&copy; {new Date().getFullYear()} Software Co. All rights reserved.</p>
          <div className="flex gap-x-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
