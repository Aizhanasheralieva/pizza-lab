import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectFetchPizzaDishLoading,} from "../../store/slices/variousPizzaDishesSlice.ts";
import ButtonSpinner from "../UI/ButtonSpinner/ButtonSpinner.tsx";
import {IPizzaDishes} from "../../types";
import {addDish} from "../../store/slices/pizzaDishesCartSlice.ts";

interface Props {
  dish: IPizzaDishes;
}
const PizzaDishItem: React.FC<Props> = ({ dish }) => {
  const loadingForFetchingDish = useAppSelector(selectFetchPizzaDishLoading);
  const dispatch = useAppDispatch();

  const addDishToCart = () => {
    console.log("Dish added to cart", dish);
    dispatch(addDish(dish));
  };

  return (
    <div onClick={addDishToCart} style={{ cursor: "pointer" }}>
      {loadingForFetchingDish ? (
        <ButtonSpinner />
      ) : (
        <>
          <div
            key={dish.id}
            className="border border-black rounded p-4 w-50 d-flex flex-wrap justify-content-between align-items-center"
          >
            <div className="d-flex justify-content-around align-items-center">
              <div className="w-75 ms-2">
                <strong>{dish.title}</strong>
              </div>
              <div className="w-25 ms-2">
                <strong>{dish.price} KGS</strong>
              </div>
              <div className="w-75 ms-2">
                <strong>Delivery 150 KGS</strong>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PizzaDishItem;
