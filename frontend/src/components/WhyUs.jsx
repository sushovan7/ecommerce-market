function WhyUs({ title, description }) {
  return (
    <div className="flex px-4 sm:px-8 sm:py-16 w-full border py-10 border-gray-300 flex-col gap-8">
      <h1 className="text-md font-bold font-mono">{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default WhyUs;
