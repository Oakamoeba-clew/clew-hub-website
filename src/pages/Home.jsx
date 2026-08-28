import LensCursor from "@/components/clew/LensCursor";
import Thread from "@/components/clew/Thread";
import Nav from "@/components/clew/Nav";
import Hero from "@/components/clew/Hero";
import ProductCards from "@/components/clew/ProductCards";
import Service from "@/components/clew/Service";
import DemoModal from "@/components/clew/DemoModal";
import Contact from "@/components/clew/Contact";
import Footer from "@/components/clew/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const openDemo = () => setDemoOpen(true);
    window.addEventListener("clew:open-demo", openDemo);
    return () => window.removeEventListener("clew:open-demo", openDemo);
  }, []);

  return (
    <div className="relative bg-background lens-cursor">
      <LensCursor />
      <Thread />
      <Nav />
      <main>
        <Hero />
        <ProductCards />
        <Service />
        <Contact />
      </main>
      <Footer />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}
