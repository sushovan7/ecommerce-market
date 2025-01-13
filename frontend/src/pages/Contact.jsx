import React from "react";
import ContactInfo from "../components/ContactInfo";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

function Contact() {
  return (
    <div className="w-full">
      <hr className="w-full h-[1px] text-gray-600" />
      <ContactInfo />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default Contact;
