import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedGrid from "@/components/home/FeaturedGrid";
import Collections from "@/components/home/Collections";
import StarProduct from "@/components/home/StarProduct";
import Trust from "@/components/home/Trust";
import Story from "@/components/home/Story";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <FeaturedGrid />
        <Collections />
        <StarProduct />
        <Trust />
        <Story />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
