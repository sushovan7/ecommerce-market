import { assets } from "../assets/assets";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  return (
    <>
      <div className="mt-28  sm:flex sm:gap-8 sm:flex-row  w-full flex flex-col gap-12 min-h-[20vh]">
        <div className="flex  items-start sm:w-[45%] flex-col gap-6">
          <img src={assets.logo} alt="logo" className="w-36" />
          <p className="w-full text-sm md:w-[75%] text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            necessitatibus earum eum. Accusamus earum repudiandae nihil!
            Voluptate fugiat nihil sunt sapiente nesciunt incidunt ut beatae
            veritatis, molestias autem officia saepe odit dolor? Ducimus, est
            maxime.
          </p>
        </div>
        <div className="sm:flex sm:w-[55%] flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="flex  items-start    flex-col gap-6">
            <h1 className="text-xl font-bold font-mono">COMPANY</h1>
            <ul className="flex flex-col gap-1 text-gray-600">
              <Link
                className={`hover:text-black ${
                  location.pathname === "/" ? "pointer-events-none" : ""
                }`}
                to={"/"}
              >
                Home
              </Link>
              <Link
                className={`hover:text-black ${
                  location.pathname === "/about"
                    ? "pointer-events-none text-gray-500"
                    : null
                }`}
                to={"/about"}
              >
                About Us
              </Link>
              <Link
                className={`hover:text-black ${
                  location.pathname === "/contact"
                    ? "pointer-events-none text-gray-500"
                    : null
                }`}
                to={"/contact"}
              >
                Contact
              </Link>
            </ul>
          </div>
          <div className="flex   items-start flex-col gap-6">
            <h1 className="text-xl font-bold font-mono">GET IN TOUCH</h1>
            <div className="flex flex-col gap-1 text-gray-600">
              <p className="text-gray-600 ">Sushovan Bhattarai</p>
              <Link
                className="hover:text-black"
                to="https://www.instagram.com/sushovanbhattarai/"
                target="_blank"
              >
                Instagram
              </Link>
              <Link
                className="hover:text-black"
                to="https://github.com/sushovan7"
                target="_blank"
              >
                Github
              </Link>
              <Link
                className="hover:text-black"
                to="https://www.linkedin.com/in/sushovan-bhattarai-dev/"
                target="_blank"
              >
                Linkedin
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full mt-10 h-[1px] bg-gray-600 " />
      <div className="py-4 text-gray-600 text-md text-center w-full font-bold">
        Copyright 2024@Sushovan - All Right Reserved.
      </div>
    </>
  );
}

export default Footer;
