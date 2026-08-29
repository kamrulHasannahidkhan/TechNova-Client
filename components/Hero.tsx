import { getContentBlocksBySection } from "@/lib/api";
import HeroSlider from "./HeroSlider";

export default async function Hero() {
  const slides = await getContentBlocksBySection("hero");
  return <HeroSlider slides={slides} />;
}
