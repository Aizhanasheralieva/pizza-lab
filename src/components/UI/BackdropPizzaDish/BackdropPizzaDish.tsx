import * as React from "react";

interface Props {
  show: boolean;
  onClick: React.MouseEventHandler;
}

const BackdropPizzaDish: React.FC<Props> = ({ show, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="modal-backdrop show"
      style={{ display: show ? "block" : "none" }}
    />
  );
};

export default BackdropPizzaDish;
