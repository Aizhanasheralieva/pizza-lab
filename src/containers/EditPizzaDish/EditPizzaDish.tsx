import AddNewDish from "../../components/AddNewDish/AddNewDish.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useCallback, useEffect} from "react";
import {fetchOnePizzaDishById, updatePizza} from "../../store/thunks/variousPizzaDishes/variousPizzaDishesThunks.ts";
import {useNavigate, useParams} from "react-router-dom";
import {selectOnePizza} from "../../store/slices/variousPizzaDishesSlice.ts";


const EditPizzaDish = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const pizzaOne = useAppSelector(selectOnePizza);
    const navigate = useNavigate();

    const receiveOnePizzaDish = useCallback(async () => {
        if (id) {
           await dispatch(fetchOnePizzaDishById(id));
        }
        // console.log(id);
    }, [dispatch, id]);

    useEffect(() => {
        void receiveOnePizzaDish();
    }, [receiveOnePizzaDish]);

    // console.log(pizzaOne);

    const editAndAddNewPizzaDish = async ( pizza: IPizzaDishesForm) => {
      if (id) {
          await dispatch(updatePizza({pizzaDishId: id, pizza}));

          navigate('/admin/dishes');
      }
    };


    return (
        <div>
            {pizzaOne ? (
                <AddNewDish editAndAddNewPizzaDish={editAndAddNewPizzaDish} isEdit pizzaDishItem={pizzaOne}  />
            ) : null}
        </div>
    );
};

export default EditPizzaDish;