import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// import PaymentIntegrationDemo from '@/components/PaymentIntegrationDemo';
import About from "@/components/About";
import Mission from "@/components/Mission";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Team from "@/components/Team";
import Pricing from "@/components/Pricing";
import Trust from "@/components/Trust";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* <div className="py-20 bg-black">
        <PaymentIntegrationDemo />
      </div> */}
      <About />
      <Mission />
      <Services />
      <Process />
      <Team />
      <Pricing />
      <Trust />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
