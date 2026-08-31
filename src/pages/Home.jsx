import LensCursor from "@/components/clew/LensCursor";
import Thread from "@/components/clew/Thread";
import Nav from "@/components/clew/Nav";
import Hero from "@/components/clew/Hero";
import FrameworkSection from "@/components/clew/FrameworkSection";
import WhoFor from "@/components/clew/WhoFor";
import HowItStarts from "@/components/clew/HowItStarts";
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
        <FrameworkSection />
        <WhoFor />
        <HowItStarts />
        <Contact />
      </main>
      <Footer />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}
