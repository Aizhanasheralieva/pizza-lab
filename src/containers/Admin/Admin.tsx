import ButtonSpinner from "../../components/UI/ButtonSpinner/ButtonSpinner.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {
    selectAllPizzaDishes,
    selectDeletePizzaDishLoading,
    selectFetchPizzaDishLoading
} from "../../store/slices/variousPizzaDishesSlice.ts";
import {
    deletePizzaDishById,
    fetchAllPizzaDishes
} from "../../store/thunks/variousPizzaDishes/variousPizzaDishesThunks.ts";
import {useCallback, useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";

const Admin = () => {
    const loadingForFetchingDish = useAppSelector(selectFetchPizzaDishLoading);
    const allDishes = useAppSelector(selectAllPizzaDishes);
    const deletePizzaLoading = useAppSelector(selectDeletePizzaDishLoading);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const fetchPizzaDish = useCallback(async () => {
        await dispatch(fetchAllPizzaDishes());
    }, [dispatch]);

    const deletePizzaDish = async (id?: string) => {
        if (id) {
            await dispatch(deletePizzaDishById(id));
        }
        await fetchPizzaDish();
    };

    useEffect(() => {
        void fetchPizzaDish();
    }, [fetchPizzaDish]);

    return (
        <div>
            {loadingForFetchingDish || deletePizzaLoading ? <ButtonSpinner/> :
                <>
                    {allDishes.length === 0 ? <p>There are any dishes added yet!</p> :
                        <>
                            <div className="d-flex flex-row justify-content-evenly mb-4">
                                <h2 className="text-center mt-2">Dishes</h2>
                                <NavLink className="nav-link" to="/admin/addNewDish">
                                    <button className="btn btn-outline-primary shadow-lg text-black text-bold fs-4"
                                            type="submit">Add new Dish
                                    </button>
                                </NavLink>
                            </div>
                            {allDishes.map((dish) => (
                                <div key={dish.id}
                                     className="border border-black rounded p-4 mb-3 w-50 mx-auto d-flex flex-wrap justify-content-between align-items-center">
                                    <div className="d-flex justify-content-between align-items-center ">
                                    <img src={dish.image_URL} alt={dish.title} className="img rounded"
                                             style={{maxWidth: "100px"}}/>
                                        <div className="w-75 ms-5">{dish.title}</div>
                                    </div>
                                    <div>
                                        <div>{dish.price} KGS</div>
                                    </div>

                                    <div className="d-flex justify-content-between mt-2">
                                        <button className="btn btn-success me-4" type="button" onClick={() => navigate(`/admin/${dish.id}/edit`)}>Edit</button>
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

export default Admin;