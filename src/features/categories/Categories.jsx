import { useSearchParams } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../services/apiCategories';
import Spinner from '../../Components/UI/Spinner';
import LazyLoad from 'react-lazy-load';

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useGetCategoriesQuery();

  const handleCategory = cat => {
    searchParams.set('category', cat);
    setSearchParams(searchParams);
  };
  return (
    <div className="p-5">
      <h2 className="mb-3 text-[1.4rem] font-[700]">Categories</h2>
      {isLoading && (
        <div className="mx-auto mt-20 w-max ">
          <Spinner />
        </div>
      )}
      {/* Categories list */}
      {data && !isLoading && (
        <ul className="grid grid-cols-2 gap-5">
          {data?.results?.map((cat, i) => (
            <li
              onClick={() => handleCategory(cat.name)}
              key={i}
              className="cursor-pointer border-2 border-gray-100 transition-all hover:scale-105"
            >
              <div>
                <LazyLoad>
                  <img
                    src={cat.image}
                    className="h-[100px] w-full object-cover"
                  />
                </LazyLoad>
              </div>
              <h2 className="text-center font-[600] uppercase tracking-wider text-primary-500">
                {cat.name}
              </h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;
