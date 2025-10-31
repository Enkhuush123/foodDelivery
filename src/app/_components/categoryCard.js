"use client";

export const CategoryCard = (props) => {
  const { name } = props;
  return (
    <div>
      <div className="flex gap-2 ">
        <button className="w-auto h-9 border rounded-full flex items-center gap-5 p-5">
          <p>{name}</p>
          <p className="w-auto h-5 bg-black text-white rounded-full font-semibold  text-xs flex items-center p-1">
            112
          </p>
        </button>
      </div>
    </div>
  );
};
