import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const IconButton = ({ children, onClick, className = "", link, to }) => {
  if (link)
    return (
      <Link to={to}>
        <div
          className={`cursor-pointer px-4 py-2  rounded-lg hover:bg-primary-100 font-[700] ${className}`}
        >
          {children}
        </div>
      </Link>
    );

  return (
    <button
      className={`cursor-pointer px-4 py-2  rounded-lg hover:bg-primary-100 font-[700] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  link: PropTypes.bool,
  to: PropTypes.string,
};

export default IconButton;
