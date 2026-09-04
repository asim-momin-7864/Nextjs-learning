import Hero from "@/components/custome/Hero";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    // do not consider it as div (you cannot apply spacing and styles here)
    // insted it is best and more customizable we do according to each section r.g ..Hero, Service, About us, ...
    // no central style in hand of main and home page.tsx ---- everything is in hand to its our section componenst
    <>
      <Hero />
    </>
  );
}
