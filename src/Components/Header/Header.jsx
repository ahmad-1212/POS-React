import { useState } from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Tables from "../../features/tables/Tables";
import { useSearchParams } from "react-router-dom";

const RADIO_OPTION = ["dine in", "take away", "delivery"];
const ORDERS = [
  {
    name: "John Smith",
    items: 4,
  },
  {
    name: "Mathew",
    items: 3,
  },
  {
    name: "William",
    items: 1,
  },
  {
    name: "Alax",
    items: 6,
  },
  {
    name: "John Smith",
    items: 4,
  },
  {
    name: "Mathew",
    items: 3,
  },
  {
    name: "William",
    items: 1,
  },
  {
    name: "Alax",
    items: 6,
  },
];

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [radioOpt, setRadioOpt] = useState(searchParams.get("type"));
  const [selectValue, setSelectValue] = useState(
    searchParams.get("type") || ""
  );
  const type = searchParams.get("type");
  const table = searchParams.get("table");

  // Set type in the header
  const setType = (typ) => {
    searchParams.set("type", typ.toLowerCase());
    searchParams.delete("table");
    setSearchParams(searchParams);
  };

  // Handle type change
  const handleRadioChange = (e) => {
    setType(e.target.value);
    if (e.target.value === radioOpt) return setRadioOpt("");
    setRadioOpt(e.target.value);
  };

  // handle select change that displays only on mobile devices
  const handleSelectChange = (e) => {
    setType(e.target.value);
    setSelectValue(e.target.value);
  };

  return (
    <header className="h-[70px] lg:h-[80px] w-full flex gap-3 sm:gap-10 items-center sticky top-0 z-10 bg-white border-b-2 px-4 md:px-10">
      <div className="hidden sm:flex items-center gap-3 sm:gap-5 hover-effect">
        {RADIO_OPTION.map((opt) => (
          <div className="flex items-center gap-2 sm:gap-3" key={opt}>
            <input
              style={{ accentColor: "orangered" }}
              type="radio"
              id={opt}
              value={opt}
              checked={radioOpt === opt}
              onChange={handleRadioChange}
              className=" h-4 w-4"
            />
            <label
              htmlFor={opt}
              className="font-[700] text-[1rem] md:text-[1.2rem] capitalize"
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
          className=" border rounded-md py-2 px-4 bg-white text-gray-700 leading-tight focus:outline-none focus:border-primary-500 w-[150px]"
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
      {type === "dine in" && (
        <div className="ml-auto lg:ml-10">
          <Modal>
            <Modal.Open>
              <Button variant="dark">{table ? table : "Choose Table"}</Button>
            </Modal.Open>
            <Modal.Window closeOnOverlay={true} zIndex="z-50">
              <Tables />
            </Modal.Window>
          </Modal>
        </div>
      )}
      {type !== "dine in" && type && (
        <div className="ml-auto">
          <Modal>
            <Modal.Open>
              <Button variant="dark">Active Orders</Button>
            </Modal.Open>
            <Modal.Window zIndex="z-50" closeOnOverlay>
              <div className="p-10">
                <h1 className="text-center text-[1.5rem] font-[600] mb-4">
                  Active Orders
                </h1>
                <ul className="grid grid-cols-2 justify-center gap-y-6 gap-x-4 flex-wrap">
                  {ORDERS.map((ord) => (
                    <li key={ord.name} className="flex gap-3">
                      <div className="w-[50px] h-[50px] flex-center bg-red-400 text-white text-[1.2rem] rounded-lg">
                        H1
                      </div>
                      <div>
                        <h3 className="capitalize font-[600]">{ord.name}</h3>
                        <div className="font-[500] text-[0.9rem] text-gray-400">
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
      )}
    </header>
  );
};

export default Header;
