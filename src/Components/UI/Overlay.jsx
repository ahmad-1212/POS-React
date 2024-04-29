const Overlay = ({ show, onClick }) => {
  if (!show) return null;

  return (
    <div
      onClick={onClick}
      className="bg-black/20 fixed z-50 inset-0 backdrop-blur-sm"
    ></div>
  );
};

export default Overlay;
