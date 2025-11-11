export const CategoryCards = ({ name }) => {
  return (
    <div className="h-9 bg-white flex rounded-full items-center justify-center p-3">
      <p className="text-black"> {name}</p>
    </div>
  );
};
