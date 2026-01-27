import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Marquee from "@/components/landing/marquee";
import FeaturedProducts from "@/components/landing/featured-products";
import Collections from "@/components/landing/collections";
import About from "@/components/landing/about";
import Newsletter from "@/components/landing/news-letter";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-1">
        <Hero />
        <Marquee />
        <FeaturedProducts />
        <Collections />
        <About />
        <Newsletter />
      </main>
    </div>
  );
}
