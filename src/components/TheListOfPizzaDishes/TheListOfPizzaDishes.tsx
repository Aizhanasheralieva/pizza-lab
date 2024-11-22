import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectAllPizzaDishes, selectFetchPizzaDishLoading,} from "../../store/slices/variousPizzaDishesSlice.ts";
import {useCallback, useEffect, useState} from "react";
import {fetchAllPizzaDishes} from "../../store/thunks/variousPizzaDishes/variousPizzaDishesThunks.ts";
import ButtonSpinner from "../UI/ButtonSpinner/ButtonSpinner.tsx";
import {addDish, selectPizzaCartDishes,} from "../../store/slices/pizzaDishesCartSlice.ts";
import ModalPizzaDish from "../UI/ModalPizzaDish/ModalPizzaDish.tsx";
import {IPizzaDishes, PizzaDishesCart} from "../../types";

const TheListOfPizzaDishes = () => {
  const loadingForFetchingDish = useAppSelector(selectFetchPizzaDishLoading);
  const allDishes = useAppSelector(selectAllPizzaDishes);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const cartDishes = useAppSelector(selectPizzaCartDishes);


  const fetchPizzaDish = useCallback(async () => {
    await dispatch(fetchAllPizzaDishes());
  }, [dispatch]);

  useEffect(() => {
    void fetchPizzaDish();
  }, [fetchPizzaDish]);

  const controlAddToCart = (dish: IPizzaDishes) => {
    dispatch(addDish(dish));
  };

  const openModalPizzaDish = () => {
    setShowModal(true);
    console.log("click");
  };

  const closeModalPizzaDish = () => {
    setShowModal(false);
  };

  const calculateTotalPriceForPizzaDishes = () => {
    let total = 0;
    cartDishes.forEach((cartDish: PizzaDishesCart) => {
      const dish: IPizzaDishes = cartDish.dish;
      total += dish.price * cartDish.amount;
    });

    const deliveryCost = 150;

    return total + deliveryCost;
  };

  return (
    <div>
      {loadingForFetchingDish ? (
        <ButtonSpinner />
      ) : (
        <>
          {allDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => controlAddToCart(dish)}
              className="border border-black rounded p-4 mb-3 w-50 d-flex flex-wrap justify-content-between align-items-center"
            >
              <div className="d-flex justify-content-around align-items-center ">
                <img
                  src={dish.image_URL}
                  alt={dish.title}
                  className="img rounded"
                  style={{ maxWidth: "100px" }}
                />
                <div className="w-75 ms-2">
                  <strong>{dish.title}</strong>
                </div>
              </div>
              <div>
                <div>
                  <strong>{dish.price} KGS</strong>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between mt-2">
            <button
              className="btn btn-outline-primary shadow-lg text-black text-bold fs-4 mb-5"
              type="submit"
              onClick={openModalPizzaDish}
            >
              Checkout
            </button>
          </div>
          {showModal && (
            <ModalPizzaDish
              show={showModal}
              closeModal={closeModalPizzaDish}
              title="Your order:"
              totalPrice={calculateTotalPriceForPizzaDishes()}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TheListOfPizzaDishes;
