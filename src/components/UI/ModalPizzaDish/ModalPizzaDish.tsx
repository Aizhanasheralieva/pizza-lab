import BackdropPizzaDish from "../BackdropPizzaDish/BackdropPizzaDish.tsx";
import React from "react";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectPizzaCartDishes} from "../../../store/slices/pizzaDishesCartSlice.ts";

interface Props extends React.PropsWithChildren {
  show: boolean;
  title: string;
  closeModal: () => void;
  totalPrice: number;
}
const ModalPizzaDish: React.FC<Props> = ({
  show,
  title,
  closeModal,
  totalPrice,
}) => {
  const cartDishes = useAppSelector(selectPizzaCartDishes);
  return (
    <>
      <BackdropPizzaDish show={show} onClick={closeModal} />
      <div
        className="modal show"
        style={{
          display: show ? "block" : "none",
          width: "500px",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body p-2">
              {cartDishes.length > 0 ? (
                cartDishes.map((cartDish) => (
                    <div key={cartDish.dish.id} className="d-flex flex-row justify-content-between align-items-center" >
                      <h4>{cartDish.dish.title}</h4>
                      <p>x {cartDish.amount}</p>
                      <p><strong>{cartDish.dish.price} KGS</strong> </p>
                      <p>X</p>
                    </div>
                ))
              ) : (
                <p>Your cart is empty</p>
              )}
              <div className="d-flex flex-column justify-content-between align-items-start mt-3">
                <p>Delivery: 150 KGS</p>
                <p><strong>Total {totalPrice} KGS</strong></p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline-danger" type="button" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-outline-success" type="button">
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPizzaDish;
