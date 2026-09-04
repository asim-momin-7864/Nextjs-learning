import React from "react";
import Container from "@/components/custome/Container";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderPlaces } from "@/constants/constant";
import { Badge } from "@/components/ui/badge";
import { ShoppingBasket } from "lucide-react";
import { Phone } from "lucide-react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="bg-card border-b border-border">
      <Container as="nav" className="py-4 flex justify-between items-center ">
        <div className="flex items-center gap-x-5">
          <div className=" flex items-center">
            <Image
              src="/logo.png"
              alt="pizza-logo"
              height={800}
              width={800}
              className="h-auto w-12 object-contain"
            />
            <h4>Pizza-Wizza</h4>
          </div>
          <div className="hidden sm:block">
            <Select items={orderPlaces}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {orderPlaces.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-x-6 justify-center">
          <ul className="hidden sm:flex items-center gap-x-2 ">
            <li>
              <Link
                href={"/menu"}
                className="hover:text-chart-2 transition-colors"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href={"/order"}
                className="hover:text-chart-2 transition-colors"
              >
                Order
              </Link>
            </li>
          </ul>
          <div className="relative">
            <Badge
              variant="default"
              className="absolute -top-3.5 -right-3 h-5 min-w-5  px-1 text-[10px]"
            >
              3
            </Badge>
            <ShoppingBasket />
          </div>
          <div className=" hidden sm:flex items-center gap-x-1">
            <Phone />
            <span className="lining-nums">+91 9800 098998</span>
          </div>
          <Button className=" bg-chart-2" variant={"outline"}>
            Logout
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
