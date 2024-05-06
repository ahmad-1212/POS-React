import { useSearchParams } from "react-router-dom";

import MenuItem from "./MenuItem";
import { categories } from "../../Data/data";

const Menu = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const table = searchParams.get("table");

  const items = categories[category];
  console.log(category, items);

  return (
    <section className="py-5 px-4 sm:px-10 flex flex-col gap-4">
      {!type && (
        <h1 className="text-primary-500 text-[1.6rem] text-[600] text-center mt-28">
          Please Select either Dine in, Take Away or Delivery.
        </h1>
      )}
      {type === "dine in" && table && !category && (
        <h1 className="text-primary-500 text-[1.6rem] text-[600] text-center mt-28">
          Please Select Category.
        </h1>
      )}
      {type !== "dine in" && type && !category && (
        <h1 className="text-primary-500 text-[1.6rem] text-[600] text-center mt-28">
          Please Select Category.
        </h1>
      )}
      {type === "dine in" && !table && (
        <h1 className="text-primary-500 text-[1.6rem] text-[600] text-center mt-28">
          Please Select Table.
        </h1>
      )}

      {type === "dine in" && table && category && (
        <>
          <h1 className="text-[2rem] font-[700] uppercase tracking-wide">
            {category}
          </h1>
          <ul className="menu-layout gap-4">
            {items.map((item, i) => (
              <MenuItem item={item} key={i} category={category} />
            ))}
          </ul>
        </>
      )}

      {type !== "dine in" && type && category && (
        <>
          <h1 className="text-[2rem] font-[700] uppercase tracking-wide">
            {category}
          </h1>
          <ul className="menu-layout gap-4">
            {items.map((item, i) => (
              <MenuItem item={item} key={i} category={category} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default Menu;
