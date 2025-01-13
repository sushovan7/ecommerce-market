import React from "react";
import Title from "../components/Title";
import OurMission from "../components/OurMission";
import WhyUsContainer from "../components/WhyUsContainer";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="w-full">
      <hr className="w-full h-[1px] text-gray-600" />
      <OurMission />
      <div className="mt-16  ">
        <Title
          text1={"WHY"}
          text2={"CHOOSE US"}
          className=" text-2xl md:text-4xl font-mono tracking-tight text-gray-600"
        />
      </div>
      <WhyUsContainer />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default About;
