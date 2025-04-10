function Loader({
  size = "w-12 h-12",
  color = "border-blue-500",
  message = "Loading...",
}) {
  return (
    <div className="flex flex-col  items-center justify-center h-screen">
      {/* Spinner */}
      <div
        className={`border-4 border-t-4 border-gray-300 ${color} ${size} rounded-full animate-spin`}
      ></div>
      {/* Loading Message */}
      {message && <p className="mt-4 text-gray-600 text-sm">{message}</p>}
    </div>
  );
}

export default Loader;
