import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import Button from "../../Components/UI/Button";

import ProductsTable from "./ProductsTable";
import { allProducts } from "../../Data/data";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectValue, setSelectValue] = useState(searchParams.get("cat"));

  let products;
  if (selectValue) {
    products = allProducts.filter((prod) => prod.category === selectValue);
  }
  if (selectValue === "all" || !selectValue) {
    products = allProducts;
  }
  const handleSelect = (e) => {
    searchParams.set("cat", e.target.value);
    setSearchParams(searchParams);
    setSelectValue(e.target.value);
  };

  return (
    <section className="py-10 flex flex-col gap-8">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search here..."
          className="outline-none w-1/2 py-2 px-5 bg-transparent border-2 border-primary-200 focus:border-primary-300 rounded-3xl placeholder:text-primary-200"
        />
        <IoSearchOutline className="-ml-8 text-[1.2rem] text-primary-200 cursor-pointer" />
      </div>
      <div className="flex-between border-b-2 border-primary-200/30 pb-5">
        <h1 className="text-[1.5rem] font-[600]">Products</h1>

        <Button
          variant="dark"
          link
          to="add-product"
          className="flex items-center gap-3"
        >
          <MdOutlineAddCircleOutline className="text-[1.3rem]" />
          <span>Add New</span>
        </Button>
      </div>
      <div className="flex justify-end">
        <select
          className="border-primary-200 px-5 py-2 rounded-md cursor-pointer border-2 outline-none bg-transparent font-[600] text-primary-500 "
          onChange={handleSelect}
          value={selectValue}
        >
          <option default value="all">
            All
          </option>
          <option value="burger">Burgers</option>
          <option value="sandwich">Sandwiches</option>
          <option value="salad">Salads</option>
          <option value="dessert">Dessert</option>
          <option value="pizza">Pizza</option>
          <option value="fries">Fries</option>
        </select>
      </div>
      <ProductsTable products={products} />
    </section>
  );
};

export default Products;
