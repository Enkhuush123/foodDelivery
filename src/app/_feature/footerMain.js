export const Footer = () => {
  return (
    <div className="w-full h-[755px] bg-black ">
      <div className="w-full bg-red-500 overflow-x-auto flex">
        <div className="flex gap-8 whitespace-nowrap font-semibold text-xl text-white animate-scroll">
          {Array(25)
            .fill("Fresh that delivered")
            .map((text, i) => (
              <span key={i}>{text}</span>
            ))}
        </div>
      </div>
    </div>
  );
};
