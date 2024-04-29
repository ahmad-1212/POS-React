import { useState } from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Cart from "../../features/cart/Cart";
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
    <header className="h-[80px] w-full flex gap-10 items-center sticky top-0 z-10 bg-white border-b-2 px-10">
      <div className="flex items-center gap-5 hover-effect">
        {RADIO_OPTION.map((opt) => (
          <div className="flex items-center gap-3" key={opt}>
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
              className="font-[700] text-[1.2rem] capitalize"
            >
              {opt}
            </label>
          </div>
        ))}
      </div>
      <div>
        <Modal>
          <Modal.Open>
            <Button variant="dark" className="ml-10">
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
