import Community from "./components/landingPage/Community";
import CoreIntroduction from "./components/landingPage/CoreIntroduction";
import Faq from "./components/landingPage/Faq";
import Footer from "./components/landingPage/Footer";
import Governance from "./components/landingPage/Governance";
import Herosection from "./components/landingPage/HeroSection";
import Partnership from "./components/landingPage/Partnership";
import Protocol from "./components/landingPage/Protocol";
import Roadmap from "./components/landingPage/Roadmap";
import Swiperpage from "./components/landingPage/Swiper";
import Navbar from "./components/navbar";

export default function Home() {




  return (
    <div className="">
      <Navbar />
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
    </div>
  );
}
