import WhyUs from "./WhyUs";

function WhyUsContainer() {
  return (
    <div className="w-full flex  flex-col   mt-10 min-h-[20vh] sm:flex sm:flex-row">
      <WhyUs
        title={"Quality Assurance:"}
        description={
          "We meticulously select and vet each product to ensure it meets our stringent quality standards."
        }
      />
      <WhyUs
        title={"Convenience:"}
        description={
          "With our user-friendly interface and hassle-free ordering process, shopping has never been easier."
        }
      />
      <WhyUs
        title={"Exceptional Customer Service:"}
        description={
          "Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority."
        }
      />
    </div>
  );
}

export default WhyUsContainer;
