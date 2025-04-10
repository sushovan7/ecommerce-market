function Title({ text1, text2, className }) {
  return (
    <div className="flex items-center gap-2">
      <p className={`${className}`}>
        {text1} <span className="text-gray-800">{text2}</span>
      </p>
      <hr className="rounded-full bg-black h-1 w-20" />
    </div>
  );
}

export default Title;
