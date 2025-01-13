import React from "react";
import Policy from "./Policy";
import { assets } from "../assets/assets";

function PolicyContainer() {
  return (
    <div className="w-full mt-6  min-h-[15vh] flex gap-10 flex-col items-center sm:h-[25vh] sm:flex sm:flex-row sm:items-center sm:justify-center md:gap-15 lg:gap-20">
      {" "}
      <Policy
        policyDescription={"We offer hassel free exchange policy"}
        policyTitle={"7 Days Return Policy"}
        policyIcon={assets.exchange_icon}
      />
      <Policy
        policyDescription={"We provide 7 days free return policy"}
        policyTitle={"Easy Exchange Policy"}
        policyIcon={assets.quality_icon}
      />
      <Policy
        policyDescription={"we provide 24/7 customer support"}
        policyTitle={"Best customer support"}
        policyIcon={assets.support_img}
      />
    </div>
  );
}

export default PolicyContainer;
