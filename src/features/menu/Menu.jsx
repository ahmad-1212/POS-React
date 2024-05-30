import { useSearchParams } from 'react-router-dom';

import MenuItem from './MenuItem';
import { useGetProductsQuery } from '../../services/apiProducts';
import { useEffect, useState } from 'react';

const Menu = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const { data } = useGetProductsQuery();
  const [products, setProducts] = useState(null);
  const type = searchParams.get('type');
  const table = searchParams.get('table');
  useEffect(() => {
    if (!category || !data) return;
    setProducts(data?.filter(prod => prod.category.name === category));
  }, [category, data]);

  return (
    <section className="flex flex-col gap-4 px-4 py-5 sm:px-10">
      {!type && (
        <h1 className="mt-28 text-center text-[1.6rem] text-[600] text-primary-500">
          Please Select either Dine in, Take Away or Delivery.
        </h1>
      )}
      {type === 'dine in' && table && !category && (
        <h1 className="mt-28 text-center text-[1.6rem] text-[600] text-primary-500">
          Please Select Category.
        </h1>
      )}
      {type !== 'dine in' && type && !category && (
        <h1 className="mt-28 text-center text-[1.6rem] text-[600] text-primary-500">
          Please Select Category.
        </h1>
      )}
      {type === 'dine in' && !table && (
        <h1 className="mt-28 text-center text-[1.6rem] text-[600] text-primary-500">
          Please Select Table.
        </h1>
      )}

      {type === 'dine in' && table && category && (
        <>
          <h1 className="text-[2rem] font-[700] uppercase tracking-wide">
            {category}
          </h1>
          <ul className="menu-layout gap-4">
            {products?.map((item, i) => (
              <MenuItem item={item} key={i} category={category} />
            ))}
          </ul>
        </>
      )}

      {type !== 'dine in' && type && category && (
        <>
          <h1 className="text-[2rem] font-[700] uppercase tracking-wide">
            {category}
          </h1>
          <ul className="menu-layout gap-4">
            {products?.map((item, i) => (
              <MenuItem item={item} key={i} category={category} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default Menu;
