function Policy({ policyIcon, policyTitle, policyDescription }) {
  return (
    <div>
      <div className="flex flex-col gap-4 items-center">
        <div className="w-full h-1/2 flex justify-center">
          <img src={policyIcon} alt="policy-icon" className="w-12" />
        </div>

        <div className="flex flex-col w-full h-1/2">
          <p className="font-bold tracking-tighter font-mono text-center text-gray-800">
            {policyTitle}
          </p>
          <p className="text-gray-400 text-center">{policyDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default Policy;
