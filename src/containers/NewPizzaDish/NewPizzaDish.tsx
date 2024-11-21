import AddNewDish from "../../components/AddNewDish/AddNewDish.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import {addNewPizzaDish} from "../../store/thunks/variousPizzaDishes/variousPizzaDishesThunks.ts";
import {useNavigate} from "react-router-dom";


const NewPizzaDish = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

   const editAndAddNewPizzaDish = async (pizza) => {
       await dispatch(addNewPizzaDish(pizza));
        navigate("/admin/dishes");
    };


    return (
        <div>
            <AddNewDish editAndAddNewPizzaDish={editAndAddNewPizzaDish}/>
        </div>
    );
};

export default NewPizzaDish;