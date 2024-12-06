"use client";

import Container from "@/src/components/Container";
import Footer from "@/src/layouts/public_page/Footer";
import Navbar from "@/src/layouts/public_page/Navbar";
import HeroSection from "@/src/views/landing_page/HeroSection";



export default function LandingPage() {
  return (
    <Container className="bg-[#DCF0FF] gap-12">
      <Navbar />
      <HeroSection />
      <Footer />
    </Container>
  );
}
