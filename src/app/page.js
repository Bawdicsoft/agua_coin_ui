"use client";

import { useContext } from "react";
import Community from "@/components/landingPage/Community";
import CoreIntroduction from "@/components/landingPage/CoreIntroduction";
import Faq from "@/components/landingPage/Faq";
import Footer from "@/components/landingPage/Footer";
import Governance from "@/components/landingPage/Governance";
import Herosection from "@/components/landingPage/HeroSection";
import Partnership from "@/components/landingPage/Partnership";
import Protocol from "@/components/landingPage/Protocol";
import Roadmap from "@/components/landingPage/Roadmap";
import Swiperpage from "@/components/landingPage/Swiper";
import Navbar from "@/components/navbar";
import { LoadingContext } from "@/context/LoadingContext";

export default function Home() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  return (
    <>
      <Navbar isLoading={isLoading} setIsLoading={setIsLoading} />
      <Herosection />
      <Swiperpage />
      <CoreIntroduction />
      <Protocol />
      <Partnership />
      <Governance />
      <Roadmap />
      <Faq />
      <Community />
      <Footer />
    </>
  );
}
