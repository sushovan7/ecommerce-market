import React from "react";

import HeroSection from "../components/HeroSection";
import LatestCollections from "../components/LatestCollections";
import BestSellers from "../components/BestSellers";
import PolicyContainer from "../components/PolicyContainer";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <LatestCollections />
      <BestSellers />
      <PolicyContainer />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default Home;
