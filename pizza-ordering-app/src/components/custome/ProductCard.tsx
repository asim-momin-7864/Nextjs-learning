import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

// good practice to declare type and pass
// give type and prope to into components and setits values according to it in component
// so while using just pass main prop object

// like this card example

export type CardPropType = {
  id: string;
  url: string;
  name: string;
  description: string;
  price: number;
};

// type for react mega prop (read note on its explanation)
type Prop = {
  cardData: CardPropType;
};

export const ProductCard = ({ cardData }: Prop) => {
  return (
    <Card className="w-60 border-none">
      <CardContent className="flex flex-col gap-y-2">
        <Image
          src={cardData.url}
          width={835}
          height={819}
          alt="pizza-image"
          className="object-contain w-auto h-40 mx-auto"
        />
        <h3 className="font-semibold text-lg">{cardData.name}</h3>
        <p>{cardData.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between ">
        <p className="space-x-2">
          <span className="text-muted-foreground text-sm">From </span>
          <span className="font-semibold lining-nums">₹{cardData.price}</span>
        </p>
        <Button
          variant={"outline"}
          className="bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent/90 hover:text-brand-accent-foreground"
        >
          Choose
        </Button>
      </CardFooter>
    </Card>
  );
};
