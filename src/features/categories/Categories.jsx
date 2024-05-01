const Categories = () => {
  return (
    <div className="p-5">
      <h2 className="font-[700] text-[1.4rem] mb-3">Categories</h2>
      {/* Categories list */}
      <ul className="grid grid-cols-2 gap-5">
        {Array.from({ length: 10 }).map((cat, i) => (
          <li
            key={i}
            className="cursor-pointer hover:scale-105 transition-all border-2 border-gray-100"
          >
            <div>
              <img
                src="https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?b=1&s=612x612&w=0&k=20&c=Fg5ZhECbjUQ4PkSkTsEwwX7BbCSrCU3IUgoEEwAIFjo="
                className="w-full h-[100px] object-cover"
              />
            </div>
            <h2 className="text-center font-[600] text-primary-500 uppercase tracking-wider">
              Burgers
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
