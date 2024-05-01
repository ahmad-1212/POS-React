import { useState } from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Tables from "../../features/tables/Tables";

const RADIO_OPTION = ["dine in", "take away", "delivery"];

const Header = () => {
  const [radioOpt, setRadioOpt] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const handleRadioChange = (e) => {
    if (e.target.value === radioOpt) return setRadioOpt("");
    setRadioOpt(e.target.value);
  };
  const handleSelectTable = (tablenum) => {
    setSelectedTable(tablenum);
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
        <select className=" border rounded-md py-2 px-4 bg-white text-gray-700 leading-tight focus:outline-none focus:border-primary-500 w-[150px]">
          <option value="dine in">Dine in</option>
          <option value="take away">Take Away</option>
          <option value="delivery">Delivery</option>
        </select>
      </div>
      <div className="ml-auto lg:ml-10">
        <Modal>
          <Modal.Open>
            <Button variant="dark">
              {selectedTable ? selectedTable : "Choose Table"}
            </Button>
          </Modal.Open>
          <Modal.Window closeOnOverlay={true}>
            <Tables onSelectTable={handleSelectTable} />
          </Modal.Window>
        </Modal>
      </div>
    </header>
  );
};

export default Header;
