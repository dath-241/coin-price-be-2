"use client";

import Container from "@/components/Container";
import HeroSection from "./components/HeroSection";
import LandingPageFooter from "./components/LandingPageFooter";
import LandingPageNavbar from "./components/LandingPageNavbar";

export default function LandingPage() {
  return (
    <Container className="bg-[#DCF0FF] gap-12">
      <LandingPageNavbar />
      <HeroSection />
      <LandingPageFooter />
    </Container>
  );
}
