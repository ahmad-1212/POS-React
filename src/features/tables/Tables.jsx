import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
const Tables = ({ onCloseModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (tableNum) => {
    searchParams.set("table", `H${tableNum}`);
    setSearchParams(searchParams);
    onCloseModal();
  };
  return (
    <>
      <h1 className="text-center py-5 text-[1.4rem] font-[700]">Tables</h1>

      <ul
        className="p-2 sm:p-5 md:p-10 flex flex-wrap gap-4 justify-center overflow-y-auto 
            "
      >
        {Array.from({ length: 20 }).map((table, i) => (
          <li
            onClick={() => handleClick(i + 1)}
            key={i}
            className="p-5 w-[80px] flex-center bg-green-400 text-white rounded-lg font-[600] text-[1.3rem] cursor-pointer hover:scale-105"
          >
            <div>H{i + 1}</div>
          </li>
        ))}
      </ul>
    </>
  );
};

Tables.propTypes = {
  onCloseModal: PropTypes.func,
};

export default Tables;
