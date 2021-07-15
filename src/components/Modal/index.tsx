import React from "react";
import "./style.scss";

interface IProps {
  children: any;
  activeModal: any;
}

const Modal: React.FunctionComponent<IProps> = props => {
  const { children, activeModal } = props;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-content__title">{activeModal.name}</div>
        <div className="modal-content__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
