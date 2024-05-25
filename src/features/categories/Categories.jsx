import { useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../../Data/data";

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = (cat) => {
    searchParams.set("category", cat.toLowerCase());
    setSearchParams(searchParams);
  };
  return (
    <div className="p-5">
      <h2 className="font-[700] text-[1.4rem] mb-3">Categories</h2>
      {/* Categories list */}
      <ul className="grid grid-cols-2 gap-5">
        {CATEGORIES.map((cat, i) => (
          <li
            onClick={() => handleCategory(cat.name)}
            key={i}
            className="cursor-pointer hover:scale-105 transition-all border-2 border-gray-100"
          >
            <div>
              <img src={cat.image} className="w-full h-[100px] object-cover" />
            </div>
            <h2 className="text-center font-[600] text-primary-500 uppercase tracking-wider">
              {cat.name}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
