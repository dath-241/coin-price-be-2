"use client";


import Container from "@/src/components/Container";
import Footer from "@/src/layouts/public_page/Footer";
import PrivateNavbar from "@/src/layouts/private_page/Navbar";
import HeroSection from "@/src/views/profile_page/HeroSection";


export default function ProfilePage() {
  return (
    <Container className="bg-[#DCF0FF] gap-12">
      <PrivateNavbar />
      <HeroSection />
      <Footer />
    </Container>
  );
}
