import { GiHamburger } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import IconButton from "../../Components/UI/IconButton";

const Menu = () => {
  return (
    <section className="py-5 px-10 flex flex-col gap-4">
      <h1 className="text-[2rem] font-[700]">Burgers</h1>
      <ul className="menu-layout gap-4">
        {Array.from({ length: 20 }).map((item, i) => (
          <li
            key={i}
            className="w-full p-3 shadow-sm border-1 rounded-lg bg-white grid grid-cols-[max-content,1fr] gap-3"
          >
            <GiHamburger className="text-[1.8rem] text-primary-500" />
            <div>
              <div className="flex-between">
                <h2 className="font-[600] text-[1.3rem]">Burger</h2>
                <IconButton className="text-primary-500">
                  <FaShoppingCart className="rotate-180" />
                </IconButton>
              </div>
              <div className="mt-2 flex items-end">
                <span className="font-[700] text-primary-500 text-[1.2rem]">
                  {" "}
                  $18.99/
                </span>
                <span className="text-[500] text-gray-400">pcs</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Menu;
