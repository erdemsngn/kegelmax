import Navbar       from "./components/landing/Navbar";
import UrgencyBar   from "./components/landing/UrgencyBar";
import StickyCtaBar from "./components/landing/StickyCtaBar";
import Hero         from "./components/landing/Hero";
import WhyUnique    from "./components/landing/WhyUnique";
import Badges       from "./components/landing/Badges";
import MediaLogos   from "./components/landing/MediaLogos";
import Programs     from "./components/landing/Programs";
import Stats        from "./components/landing/Stats";
import HowItWorks   from "./components/landing/HowItWorks";
import Comparison   from "./components/landing/Comparison";
import Experts      from "./components/landing/Experts";
import Testimonials from "./components/landing/Testimonials";
import FAQ          from "./components/landing/FAQ";
import Guarantee    from "./components/landing/Guarantee";
import FinalCTA     from "./components/landing/FinalCTA";
import Footer       from "./components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <UrgencyBar />
      <main className="pt-7">
        <Hero />
        <WhyUnique />
        <Badges />
        <MediaLogos />
        <Experts />
        <Programs />
        <Stats />
        <HowItWorks />
        <Comparison />
        <Testimonials />
        <FAQ />
        <Guarantee />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCtaBar />
    </>
  );
}
