import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { Sandbox } from "@/components/landing/Sandbox";
import { FeaturesBento } from "@/components/landing/FeaturesBento";
import { RoiStrip } from "@/components/landing/RoiStrip";
import { CtaBand } from "@/components/landing/CtaBand";
import { Footer } from "@/components/landing/Footer";
import { LangToggle } from "@/components/landing/LangToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <ProblemSection />
        <Sandbox />
        <FeaturesBento />
        <RoiStrip />
        <CtaBand />
      </main>
      <Footer />
      <LangToggle className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50" />
    </div>
  );
};

export default Index;
