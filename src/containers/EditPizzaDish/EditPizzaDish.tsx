import AddNewDishForm from "../../components/AddNewDishForm/AddNewDishForm.tsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useCallback, useEffect } from "react";
import {
  fetchOnePizzaDishById,
  updatePizza,
} from "../../store/thunks/variousPizzaDishes/variousPizzaDishesThunks.ts";
import { useNavigate, useParams } from "react-router-dom";
import { selectOnePizza } from "../../store/slices/variousPizzaDishesSlice.ts";
import { toast } from "react-toastify";
import { IPizzaDishesForm } from "../../types";

const EditPizzaDish = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const pizzaOne = useAppSelector(selectOnePizza);
  const navigate = useNavigate();

  const receiveOnePizzaDish = useCallback(async () => {
    if (id) {
      await dispatch(fetchOnePizzaDishById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    void receiveOnePizzaDish();
  }, [receiveOnePizzaDish]);


  const editAndAddNewPizzaDish = async (pizza: IPizzaDishesForm) => {
    if (id) {
      await dispatch(updatePizza({ pizzaDishId: id, pizza }));

      navigate("/admin/dishes");
      toast.success("Pizza edited successfully.");
    }
  };

  return (
    pizzaOne && (
      <div>
        {pizzaOne ? (
          <AddNewDishForm
            editAndAddNewPizzaDish={editAndAddNewPizzaDish}
            isEdit
            pizzaDishItem={pizzaOne}
          />
        ) : null}
      </div>
    )
  );
};

export default EditPizzaDish;
