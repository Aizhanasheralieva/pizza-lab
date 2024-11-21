import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks.ts";
import {selectAllPizzaDishes, selectFetchPizzaDishLoading} from "../../store/slices/variousPizzaDishesSlice.ts";
import {useCallback, useEffect} from "react";
import {fetchAllPizzaDishes} from "../../store/thunks/variousPizzaDishes/variousPizzaDishesThunks.ts";
import ButtonSpinner from "../UI/ButtonSpinner/ButtonSpinner.tsx";
import {NavLink} from "react-router-dom";


const TheListOfPizzaDishes = () => {
    const loadingForFetchingDish = useAppSelector(selectFetchPizzaDishLoading);
    const allDishes = useAppSelector(selectAllPizzaDishes);
    const dispatch = useDispatch();

    const fetchPizzaDish = useCallback(async () => {
        await dispatch(fetchAllPizzaDishes());
    }, [dispatch]);

    useEffect(() => {
        void fetchPizzaDish();
    }, [fetchPizzaDish]);

    return (
        <div>
            {loadingForFetchingDish ? <ButtonSpinner/> :
                <>
                    {allDishes.map((dish) => (
                        <div key={dish.id}
                             className="border border-black rounded p-4 mb-3 w-50 d-flex flex-wrap justify-content-between align-items-center">
                            <div className="d-flex justify-content-around align-items-center ">
                                <img src={dish.image_URL} alt={dish.title} className="img rounded"
                                     style={{maxWidth: "100px"}}/>
                                <div className="w-75 ms-2"><strong>{dish.title}</strong></div>
                            </div>
                            <div>
                                <div><strong>{dish.price} KGS</strong></div>
                            </div>
                        </div>
                    ))}
                    <div className="d-flex justify-content-between mt-2">
                        <NavLink className="nav-link" to="/checkout">
                            <button className="btn btn-outline-primary shadow-lg text-black text-bold fs-4 mb-5"
                                    type="submit">Checkout
                            </button>
                        </NavLink>
                    </div>
                </>
            }
        </div>
    );
};

export default TheListOfPizzaDishes;