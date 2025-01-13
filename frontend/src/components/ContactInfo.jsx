import React from "react";
import { assets } from "../assets/assets";
import Title from "./Title";

function ContactInfo() {
  return (
    <div>
      <div className="mt-10 flex justify-center">
        <Title
          text1={"CONTACT"}
          text2={"US"}
          className=" text-3xl md:text-4xl font-mono tracking-tight text-gray-600"
        />
      </div>
      <div className="flex w-full lg:flex lg:items-center lg:min-h-[40vh] lg:gap-20 lg:flex-row mt-10 flex-col">
        <div className="w-full lg:w-[50%] lg:h-full lg:bg-green-400  overflow-hidden">
          <img
            src={assets.contact_img}
            alt="contact-img"
            className="object-cover lg:h-full lg:w-full object-center lg:object-contain"
          />
        </div>
        <div className="flex lg:justify-center  mt-16 lg:mt-0 lg:w-[50%] flex-col gap-6 text-gray-600">
          <h1 className="font-mono text-lg tracking-tighter font-bold">
            Our Store
          </h1>
          <p>
            kausaltar,Nepal <br />
            Tel:1111111111 <br />
            Email: bhattaraisushovan999@gmail.com
          </p>

          <div className="flex lg:justify-start  lg:mt-0 lg:w-[50%] flex-col gap-6 text-gray-600">
            <h1 className="font-mono text-lg tracking-tighter font-bold">
              Careers at Forever:
            </h1>
            <div className="flex w-full flex-col gap-5">
              {" "}
              <p>Learn more about our teams and job openings</p>
              <button className="border max-w-[300px] w-[60%] py-3 hover:bg-black hover:text-white  border-black">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
