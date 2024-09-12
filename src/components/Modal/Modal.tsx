import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { Icon } from "../index";

import s from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  toggleModal: () => void;
}

const modalRoot =
  document.getElementById("modalRoot") || document.createElement("div");

modalRoot.id = "modalRoot";
document.body.appendChild(modalRoot);

export const Modal: React.FC<ModalProps> = ({ children, toggleModal }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        toggleModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [toggleModal]);

  const handleClickOnBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return ReactDOM.createPortal(
    <div onClick={handleClickOnBackdrop} className={s.backdrop}>
      <div className={s.modal}>
        <button className={s.btn_close} type="button" onClick={toggleModal}>
          <Icon id="close" size={24} />
        </button>
        <div className={s.content_wrapper}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
};
