import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectAllOrders, selectOrdersLoading} from "../../store/slices/ordersSlice.ts";
import {useCallback, useEffect} from "react";
import {fetchOrdersFromAPI} from "../../store/thunks/PizzaOrdersThunks/PizzaOrdersThunks.ts";
import ButtonSpinner from "../../components/UI/ButtonSpinner/ButtonSpinner.tsx";
import {fetchOnePizzaDishById} from "../../store/thunks/variousPizzaDishes/variousPizzaDishesThunks.ts";
import {selectAllPizzaDishes} from "../../store/slices/variousPizzaDishesSlice.ts";

const Orders = () => {
  const orders = useAppSelector(selectAllOrders);
  const dispatch = useAppDispatch();
  const ordersLoading = useAppSelector(selectOrdersLoading);
  const allDishes = useAppSelector(selectAllPizzaDishes);

  const fetchOrders = useCallback(async () => {
    await dispatch(fetchOrdersFromAPI());
  }, [dispatch]);

  useEffect(() => {
    void fetchOrders();
  }, [fetchOrders]);

  const fetchDishDetails = useCallback( (dishId: string) => {
    const existingDish = allDishes.find((dish) => dish.id === dishId);
    if (!existingDish) {
      dispatch(fetchOnePizzaDishById(dishId));
    }
    console.log(dishId);
  }, [dispatch, allDishes]);

  useEffect(() => {
   Object.entries(orders).forEach(([orderId, orderDetails]) => {
     Object.entries(orderDetails).forEach(([dishId, quantity]) => {
       fetchDishDetails(dishId);
     });
   });
  }, [orders, fetchDishDetails]);


  return (
    <div>
      <h1>Orders</h1>
      {ordersLoading ? <ButtonSpinner/> : null}
      {Object.entries(orders).map(([orderId, order]) => (
        <div key={orderId} className="order-item">
          <div>
            {Object.entries(order).map(([dishId, quantity]) => {
              const dish = allDishes.find((dish) => dish.id === dishId);
              return (
              <div key={dishId} className="order-detail">
                {dish ? (
                  <>
                    <div className="border border-black rounded d-flex justify-content-between m-2 p-2 ">
                      <div className="fs-3 me-2"><strong>{dish.title}</strong></div>
                      <span>{dish.price} KGS</span>
                      <span>{quantity} pizzas </span>
                      <div><span>Total price: {dish.price * quantity} KGS</span></div>
                    </div>

                  </>
                ) : null}
              </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
