import Products from '../products/Products';
import { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../services/apiProducts';
import { HiX } from 'react-icons/hi';
import Button from '../../Components/UI/Button';
import Modal from '../../Components/UI/Modal';
import Spinner from '../../Components/UI/Spinner';
import DealForm from './DealForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetDealWithIdQuery } from '../../services/apiDeals';
import { skipToken } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';

const AddDeal = () => {
  const [selectProducts, setSelectProducts] = useState([]);
  const { data } = useGetProductsQuery();
  const [searchParams] = useSearchParams();
  const edit = searchParams.get('edit') || false;
  const dealId = searchParams.get('deal') || null;
  const {
    data: deal,
    error: dealError,
    isLoading,
  } = useGetDealWithIdQuery(dealId || skipToken);
  const navigate = useNavigate();
  console.log(dealError);
  const addProduct = id => {
    if (!data) return;

    const product = data.find(prod => prod._id === id);
    if (!product) return; // if the product is not found, exit

    setSelectProducts(prevState => {
      const productIndex = prevState.findIndex(item => item._id === id);
      if (productIndex !== -1) {
        // If the product is already selected, increase the quantity
        const updatedProducts = [...prevState];
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          quantity: updatedProducts[productIndex].quantity + 1,
        };
        return updatedProducts;
      } else {
        // If the product is not selected, add it with an initial quantity of 1
        return [...prevState, { ...product, quantity: 1 }];
      }
    });
  };

  const removeProduct = id => {
    const newProd = selectProducts.filter(prod => prod._id !== id);
    setSelectProducts(newProd);
  };

  useEffect(() => {
    if (!deal) return;
    const products = deal.products.map(prod => ({
      ...prod.product,
      quantity: prod.quantity,
    }));

    setSelectProducts(products);
  }, [dealId, deal]);

  useEffect(() => {
    if (dealError) {
      toast.error(dealError?.message);
      navigate('/deals');
    }
  }, [dealError]);

  return edit && dealId && isLoading ? (
    <div className="mx-auto my-20">
      <Spinner />
    </div>
  ) : (
    <>
      <section className="flex flex-col gap-8 py-10">
        <div className="flex-between flex-wrap gap-3 border-b-2 border-primary-200/30 pb-5">
          <h1 className="text-[2rem] font-[600]">
            {edit && dealId ? 'Edit Deal' : 'Add new Deal'}
          </h1>
        </div>
      </section>

      {selectProducts.length > 0 && (
        <section className="my-5">
          <ul className="mb-10 flex flex-wrap items-center gap-2 ">
            {selectProducts?.map(prod => (
              <li
                className="flex items-center gap-5 rounded-md bg-primary-400 px-3 py-1 text-white"
                key={prod._id}
              >
                <span>
                  {prod.name}: {prod.quantity}
                </span>
                <HiX
                  className="cursor-pointer"
                  onClick={() => removeProduct(prod._id)}
                />
              </li>
            ))}
          </ul>
          <Modal>
            <Modal.Open id="addDeal">
              <Button className="flex justify-end" variant="dark">
                {edit && dealId && deal ? 'Update Deal' : 'Create Deal'}
              </Button>
            </Modal.Open>
            <Modal.Window id="addDeal" closeOnOverlay zIndex="z-50">
              <DealForm
                selectProducts={selectProducts}
                setSelectProducts={setSelectProducts}
                deal={deal}
                edit={Boolean(edit)}
              />
            </Modal.Window>
          </Modal>
        </section>
      )}

      <Products isDeal={true} onAddProduct={addProduct} />
    </>
  );
};

export default AddDeal;
