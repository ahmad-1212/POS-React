const Categories = () => {
  return (
    <aside className="fixed  inset-0 top-[80px] left-0 w-[28rem] pb-10 overflow-y-auto bg-white">
      <div className="py-5 px-10">
        <h2 className="font-[700] text-[1.2rem] mb-3">Categories</h2>
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
    </aside>
  );
};

export default Categories;
