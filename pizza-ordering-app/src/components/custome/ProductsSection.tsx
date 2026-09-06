import React from "react";
import Container from "../ui/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cardsDataArray } from "@/constants/constant";
import { ProductCard } from "./ProductCard";

const Products = () => {
  return (
    <Container as="section" className="py-5">
      <Tabs defaultValue="pizza" className="w-full">
        <TabsList>
          <TabsTrigger value="pizza">Pizza</TabsTrigger>
          <TabsTrigger value="beverages">Beverages</TabsTrigger>
        </TabsList>
        <TabsContent value="pizza">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center items-center gap-2">
            {cardsDataArray.map((card) => {
              return <ProductCard key={card.id} cardData={card} />;
            })}
          </div>
        </TabsContent>
        <TabsContent value="beverages">
          Beveragesss!!! Coming Soon for Sale........
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default Products;
