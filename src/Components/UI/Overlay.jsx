import PropTypes from "prop-types";
const Overlay = ({ show, onClick, className = "" }) => {
  if (!show) return null;

  return (
    <div
      onClick={onClick}
      className={`bg-black/20 fixed z-10 inset-0 backdrop-blur-sm ${className}`}
    ></div>
  );
};

Overlay.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Overlay;
