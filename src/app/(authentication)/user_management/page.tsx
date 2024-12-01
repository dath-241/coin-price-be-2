"use client";

import Container from "@/src/components/Container";
import PrivateNavbar from "@/src/layouts/private_page/Navbar";
import Footer from "@/src/layouts/public_page/Footer";
import HeroSection from "@/src/views/user_management_page/HeroSection";


export default function UserManagementPage() {
  return (
    <Container className="bg-[#DCF0FF] gap-12">
      <PrivateNavbar />
      <HeroSection />
      <Footer />
    </Container>
  );
}
