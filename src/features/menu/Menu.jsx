const Menu = () => {
  return (
    <section className="py-5 px-10 flex flex-col gap-4">
      <h1 className="text-[2rem] font-[700]">Burgers</h1>
      <ul className="menu-layout gap-4">
        {Array.from({ length: 20 }).map((item, i) => (
          <li
            key={i}
            className="w-full p-3 shadow-sm border-1 rounded-lg bg-white flex flex-col transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="rounded-md h-[120px] object-cover"
            />
            <h2 className="font-[600] text-[1.3rem]">Burger</h2>
            <p className="font-[500] text-gray-400">Delicious burger</p>
            <div className="mt-3 flex items-end">
              <span className="font-[700] text-primary-500 text-[1.2rem]">
                {" "}
                $18.99/
              </span>
              <span className="text-[500] text-gray-400">pcs</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Menu;
