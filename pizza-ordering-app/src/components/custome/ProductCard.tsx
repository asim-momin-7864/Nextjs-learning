import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ShoppingCartPlus } from "lucide-react";

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
    <Card className="w-full sm:w-60 border-none">
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

        <Dialog>
          <DialogTrigger
            render={
              <Button
                variant={"outline"}
                className="bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent/90 hover:text-brand-accent-foreground"
              >
                Choose
              </Button>
            }
          ></DialogTrigger>
          <DialogContent className="bg-background p-0 sm:max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex flex-col sm:flex-row h-full overflow-y-auto sm:overflow-hidden">
              <div className="bg-card w-full sm:w-2/5 flex shrink-0 items-center justify-center p-6 border-b sm:border-b-0 sm:border-r">
                <Image
                  src={cardData.url}
                  alt={cardData.name}
                  width={835}
                  height={819}
                  className="object-contain w-auto h-32 sm:h-36"
                />
              </div>
              <div className="w-full sm:w-3/5 p-6 sm:p-8 flex flex-col items-start justify-start sm:justify-center gap-y-4 overflow-y-auto">
                <div className="pr-8">
                  <h4 className="text-2xl font-semibold">{cardData.name}</h4>
                  <p className="text-muted-foreground mt-1">
                    {cardData.description}
                  </p>
                </div>

                <div>
                  <p className="font-medium mb-2">Choose the size</p>
                  {/* radio box */}
                  <ToggleGroup
                    variant={"outline"}
                    className="flex flex-wrap justify-start gap-2"
                  >
                    <ToggleGroupItem
                      value="small"
                      className="w-24 border border-input data-[state=on]:border-brand-accent"
                    >
                      Small
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="medium"
                      className="w-24 border border-input data-[state=on]:border-brand-accent"
                    >
                      Medium
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="large"
                      className="w-24 border border-input data-[state=on]:border-brand-accent"
                    >
                      Large
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div>
                  <p className="font-medium mb-2">Choose the crust</p>
                  {/* radio box */}
                  <ToggleGroup
                    variant={"outline"}
                    className="flex flex-wrap justify-start gap-2"
                  >
                    <ToggleGroupItem
                      value="thin"
                      className="w-24 border border-input data-[state=on]:border-brand-accent"
                    >
                      Thin
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="thick"
                      className="w-24 border border-input data-[state=on]:border-brand-accent"
                    >
                      Thick
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="w-full">
                  <p className="font-medium mb-2">Extra Topping</p>
                  <ToggleGroup
                    variant={"outline"}
                    multiple
                    className="flex flex-wrap justify-start gap-2"
                  >
                    <ToggleGroupItem
                      value="chicken"
                      className="flex flex-col w-24 h-fit rounded-xl pb-1"
                    >
                      <Image
                        alt="chicken-topping"
                        src="/chicken.png"
                        width={63}
                        height={63}
                        className="w-auto h-22 object-contain"
                      />
                      <p>Chicken</p>
                      <p className="font-medium lining-nums">₹50</p>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="jalapeno"
                      className="flex flex-col w-24 h-fit rounded-xl pb-2"
                    >
                      <Image
                        alt="jelapeno-topping"
                        src="/jelapeno.png"
                        width={63}
                        height={63}
                        className="w-auto h-20 object-contain"
                      />
                      <p>Jalapeno</p>
                      <p className="font-medium lining-nums">₹50</p>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="cheese"
                      className="flex flex-col w-24 h-fit rounded-xl pb-2"
                    >
                      <Image
                        alt="cheese-topping"
                        src="/cheese.png"
                        width={63}
                        height={63}
                        className="w-auto h-22 object-contain"
                      />
                      <p>Cheese</p>
                      <p className="font-medium lining-nums">₹50</p>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="w-full flex items-center justify-between">
                  <span className="lining-nums">₹400</span>
                  <Button>
                    <ShoppingCartPlus />
                    <span>Add to Cart</span>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
