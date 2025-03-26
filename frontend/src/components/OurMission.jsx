import { assets } from "../assets/assets";
import Title from "./Title";
function OurMission() {
  return (
    <div>
      <div className="mt-10 flex justify-center">
        <Title
          text1={"ABOUT"}
          text2={"US"}
          className="text-3xl md:text-4xl font-mono tracking-tight text-gray-600"
        />
      </div>
      <div className="flex w-full lg:flex lg:items-center lg:min-h-[40vh] lg:gap-20 lg:flex-row mt-10 flex-col">
        <div className="w-full lg:w-[50%] lg:h-full lg:bg-green-400  overflow-hidden">
          <img
            src={assets.about_img}
            alt="aboyt-img"
            className="object-cover lg:h-full lg:w-full object-center lg:object-contain"
          />
        </div>
        <div className="flex lg:justify-center  mt-16 lg:mt-0 lg:w-[50%] flex-col gap-6 text-gray-600">
          <p className="">
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, weve worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <h1 className="font-mono text-lg tracking-tighter font-bold">
            Our Mission
          </h1>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurMission;
