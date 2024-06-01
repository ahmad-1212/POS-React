import { useState } from 'react';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import Tables from '../../features/tables/Tables';
import { useSearchParams } from 'react-router-dom';
import { useScreen } from '../../hooks/useScreen';
import { useDispatch } from 'react-redux';
import { addUserInfo } from '../../features/cart/cartSlice';

const RADIO_OPTION = ['dine in', 'take away', 'delivery'];
const ORDERS = [
  {
    name: 'John Smith',
    items: 4,
  },
  {
    name: 'Mathew',
    items: 3,
  },
  {
    name: 'William',
    items: 1,
  },
  {
    name: 'Alax',
    items: 6,
  },
  {
    name: 'John Smith',
    items: 4,
  },
  {
    name: 'Mathew',
    items: 3,
  },
  {
    name: 'William',
    items: 1,
  },
  {
    name: 'Alax',
    items: 6,
  },
];

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [radioOpt, setRadioOpt] = useState(searchParams.get('type'));
  const [selectValue, setSelectValue] = useState(
    searchParams.get('type') || '',
  );
  const dispatch = useDispatch();
  const { screen } = useScreen();
  const type = searchParams.get('type');
  const table = searchParams.get('table');

  // Set type in the header
  const setType = typ => {
    searchParams.set('type', typ.toLowerCase());
    searchParams.delete('table');
    setSearchParams(searchParams);
    dispatch(addUserInfo(null));
  };

  // Handle type change
  const handleRadioChange = e => {
    setType(e.target.value);
    if (e.target.value === radioOpt) return setRadioOpt('');
    setRadioOpt(e.target.value);
  };

  // handle select change that displays only on mobile devices
  const handleSelectChange = e => {
    setType(e.target.value);
    setSelectValue(e.target.value);
  };

  return (
    <header className="sticky top-0 z-10 flex  h-[70px] w-full items-center gap-3 border-b-2 bg-white px-4 md:gap-10 md:px-10 lg:h-[80px]">
      <div className="hover-effect hidden items-center gap-3 sm:flex sm:gap-5">
        {RADIO_OPTION.map(opt => (
          <div className="flex items-center gap-1 md:gap-3" key={opt}>
            <input
              style={{ accentColor: 'orangered' }}
              type="radio"
              id={opt}
              value={opt}
              checked={radioOpt === opt}
              onChange={handleRadioChange}
              className=" h-4 w-4"
            />
            <label
              htmlFor={opt}
              className="text-[1rem] font-[700] capitalize md:text-[1.2rem]"
            >
              {opt}
            </label>
          </div>
        ))}
      </div>
      <div className="block sm:hidden">
        <select
          onChange={handleSelectChange}
          value={selectValue}
          className=" w-[150px] rounded-md border bg-white px-4 py-2 leading-tight text-gray-700 focus:border-primary-500 focus:outline-none"
        >
          <option disabled defaultValue value="">
            Please select any type
          </option>
          <option value="dine in">Dine in</option>
          <option value="take away">Take Away</option>
          <option value="delivery">Delivery</option>
        </select>
      </div>
      {/* Table only display when type is dine in */}
      {type === 'dine in' && (
        <div className="ml-auto lg:ml-10">
          <Modal>
            <Modal.Open id="chooseTable">
              <Button variant="dark">
                {table ? table : `${screen < 500 ? 'Table' : 'Choose Table'}`}
              </Button>
            </Modal.Open>
            <Modal.Window id="chooseTable" closeOnOverlay={true} zIndex="z-50">
              <Tables />
            </Modal.Window>
          </Modal>
        </div>
      )}

      <div className="ml-auto">
        <Modal>
          <Modal.Open id="activeOrders">
            <Button variant="dark">
              {screen < 500 ? 'Orders' : 'Active Orders'}
            </Button>
          </Modal.Open>
          <Modal.Window id="activeOrders" zIndex="z-50" closeOnOverlay>
            <div className="p-10">
              <h1 className="mb-4 text-center text-[1.5rem] font-[600]">
                Active Orders
              </h1>
              <ul className="grid grid-cols-2 flex-wrap justify-center gap-x-4 gap-y-6">
                {ORDERS.map(ord => (
                  <li key={ord.name} className="flex gap-3">
                    <div className="flex-center h-[50px] w-[50px] rounded-lg bg-red-400 text-[1.2rem] text-white">
                      H1
                    </div>
                    <div>
                      <h3 className="font-[600] capitalize">{ord.name}</h3>
                      <div className="text-[0.9rem] font-[500] text-gray-400">
                        {ord.items} items
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Modal.Window>
        </Modal>
      </div>
    </header>
  );
};

export default Header;
