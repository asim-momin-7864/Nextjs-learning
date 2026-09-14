import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import Container from "../ui/container";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/40 bg-muted/20 pb-8 pt-16 mt-16">
      <Container variant="default">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          
          {/* Brand & Description */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-md">
                <Image 
                  src="/logo.png" 
                  alt="Infinity Store Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Infinity Store
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Your one-stop shop for everything infinite. Discover premium quality products designed to elevate your everyday lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Shop</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Best Sellers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Men&apos;s Collection</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Women&apos;s Collection</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Order Status</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Stay Connected</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full rounded-md border border-border/50 bg-background px-9 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <Button variant="default">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-border/40" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Infinity Store. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
