import AddNewDishForm from "../../components/AddNewDishForm/AddNewDishForm.tsx";
import { useAppDispatch } from "../../app/hooks.ts";
import { addNewPizzaDish } from "../../store/thunks/variousPizzaDishes/variousPizzaDishesThunks.ts";
import { useNavigate } from "react-router-dom";
import {IPizzaDishesForm} from "../../types";

const NewPizzaDish = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const editAndAddNewPizzaDish = async (pizza: IPizzaDishesForm) => {
    await dispatch(addNewPizzaDish(pizza));
    navigate("/admin/dishes");
  };

  return (
    <div>
      <AddNewDishForm editAndAddNewPizzaDish={editAndAddNewPizzaDish} />
    </div>
  );
};

export default NewPizzaDish;
