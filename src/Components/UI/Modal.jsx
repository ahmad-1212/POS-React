import { cloneElement, createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import Overlay from "./Overlay";

const ModalContext = createContext();

function Modal({ children }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

// Modal Button to open the Modal
function Open({ children }) {
  const { setShowModal } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => setShowModal(true) });
}

Open.propTypes = {
  children: PropTypes.node.isRequired,
};

// Modal Window to show the main content
function Window({ children, closeOnOverlay = false, center = false }) {
  const { showModal, setShowModal } = useContext(ModalContext);

  if (!showModal) return null;

  return createPortal(
    <>
      <Overlay
        show={showModal}
        onClick={() => closeOnOverlay && setShowModal(false)}
        className="z-20"
      />
      <div
        className={`fixed z-50 bg-white  rounded-md ${
          center ? "top-1/2 -translate-y-1/2 " : "top-0 mt-[5rem] "
        } left-1/2 -translate-x-1/2 shadow-md`}
      >
        {cloneElement(children, { onCloseModal: () => setShowModal(false) })}
      </div>
    </>,
    document.getElementById("overlay")
  );
}

Window.propTypes = {
  children: PropTypes.node.isRequired,
  closeOnOverlay: PropTypes.bool,
  center: PropTypes.bool,
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
