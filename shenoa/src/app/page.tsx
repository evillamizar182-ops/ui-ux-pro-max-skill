import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedGrid from "@/components/home/FeaturedGrid";
import Marquee from "@/components/ui/Marquee";
import Collections from "@/components/home/Collections";
import StarProduct from "@/components/home/StarProduct";
import Trust from "@/components/home/Trust";
import Story from "@/components/home/Story";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <FeaturedGrid />
        <Marquee />
        <Collections />
        <StarProduct />
        <Trust />
        <Story />
      </main>
      <Footer />
      <WhatsAppFloat />
    </SmoothScroll>
  );
}
