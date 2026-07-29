
import OrderSteps from "@/components/OrderSteps";
import Story from "@/components/Story";

import Hero from "@/components/Hero";
import BrandFeatures from "@/components/BrandFeatures";
import PopularProducts from "@/components/PopularProducts";

export default function Home() {
  return (
   <>
  <Hero />
  <BrandFeatures />
  <PopularProducts />
  <Story />
  <OrderSteps />
</>
  );
}