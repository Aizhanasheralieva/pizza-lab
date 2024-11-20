import ButtonSpinner from "../../components/UI/ButtonSpinner/ButtonSpinner.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {
    selectAllPizzaDishes,
    selectDeletePizzaDishLoading,
    selectFetchPizzaDishLoading
} from "../../store/slices/variousPizzaDishesSlice.ts";
import {deletePizzaDishById} from "../../store/thunks/variousPizzaDishes/variousPizzaDishesThunks.ts";



const Dishes = () => {
    const loadingForFetchingDish = useAppSelector(selectFetchPizzaDishLoading);
    const allDishes = useAppSelector(selectAllPizzaDishes);
    const deletePizzaLoading = useAppSelector(selectDeletePizzaDishLoading);
    const dispatch = useAppDispatch();

    const deletePizzaDish = async (id?: string) => {
        if (id) {
           await dispatch(deletePizzaDishById(id));
        }


        await fetchPizzaDishes();
    };

    return (
        <div>
            {loadingForFetchingDish || deletePizzaLoading ? <ButtonSpinner/> :
                <>
                    {allDishes.length === 0 ? <p>There are any dishes added yet!</p> :
                        <>
                            <h2 className="text-center mt-2">Dishes</h2>
                            {allDishes.map((dish) => (
                                <div key={dish.id}
                                     className="border border-black rounded p-4 mb-3 w-50 mx-auto d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <img src={dish.image_URL} alt={dish.title} className="img rounded"
                                             style={{maxWidth: "100px"}}/>
                                        <div className="w-75 ms-5">{dish.title}</div>
                                    </div>
                                    <div>
                                        <div>{dish.price} KGS</div>

                                    </div>


                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-success me-4" type="button">Edit</button>
                                        <button className="btn btn-danger" type="button" onClick={() => deletePizzaDish(dish.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </>
            }
        </div>
    );
};

export default Dishes;