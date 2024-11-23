import BackdropPizzaDish from "../BackdropPizzaDish/BackdropPizzaDish.tsx";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {clearCart, removeDish, selectPizzaCartDishes} from "../../../store/slices/pizzaDishesCartSlice.ts";
import {RiDeleteBin5Fill} from "react-icons/ri";
import {placeOrderDish} from "../../../store/thunks/PizzaOrdersThunks/PizzaOrdersThunks.ts";


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
  const dispatch = useAppDispatch();

  console.log(cartDishes);

  const controlRemoveDish = (dishId: string) => {
    dispatch(removeDish(dishId));
  };

  const controlOrder = async () => {
    const order: { [dishId: string]: number } = {};

    cartDishes.forEach((cartDish) => {
      order[cartDish.dish.id] = cartDish.amount;
    });

    await dispatch(placeOrderDish(order));
    dispatch(clearCart());
    closeModal();
  };

  return (
    <>
      <BackdropPizzaDish show={show} onClick={closeModal}/>
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
              <h1 className="modal-title fs-2">{title}</h1>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body p-2">
              {cartDishes.length > 0 ? (
                cartDishes.map((cartDish) => (
                  <div key={cartDish.dish.id}
                       className="border border-secondary rounded d-flex flex-row justify-content-between align-items-center m-1 p-1">
                    <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                      <h6 className="me-3">{cartDish.dish.title}</h6>
                      <p>x {cartDish.amount}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <p>{cartDish.dish.price} KGS</p>
                      <button className="btn btn outline-danger ms-3 p-1"
                              onClick={() => controlRemoveDish((cartDish.dish.id))}><RiDeleteBin5Fill size={22}
                                                                                                      color="red"/>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Your cart is empty</p>
              )}
              <div className="d-flex flex-column justify-content-between align-items-start mt-5">
                <p>Delivery: 150 KGS</p>
                <p><strong>Total {totalPrice} KGS</strong></p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline-danger" type="button" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-outline-success" type="button" onClick={controlOrder}>
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
