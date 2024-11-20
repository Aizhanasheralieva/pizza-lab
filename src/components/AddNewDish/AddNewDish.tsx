import React, {useState} from "react";
import {selectAddPizzaDishLoading} from "../../store/slices/variousPizzaDishesSlice.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {addNewPizzaDish} from "../../store/thunks/variousPizzaDishes/variousPizzaDishesThunks.ts";
import ButtonSpinner from "../UI/ButtonSpinner/ButtonSpinner.tsx";

const initialStateForForm = {
    title: '',
    price: 0,
    image_URL: '',
};

const AddNewDish = () => {
    const loadingForAddingDish = useAppSelector(selectAddPizzaDishLoading);
    // const loadingForFetchingDish = useAppSelector(selectFetchPizzaDishLoading);
    const dispatch = useAppDispatch();
    const [pizzaDish, setPizzaDish] = useState<IPizzaDishesForm>(initialStateForForm);

    const onChangePizzaDishInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setPizzaDish(prevState => {
           return {
               ...prevState,
               [name]: value,
           };
        });
    };

    // console.log(pizzaDish);

    const onSubmitTheForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addNewPizzaDish({...pizzaDish}));
    };

    return (
        <div className="container">
            <h1>Add Dish</h1>
            <form onSubmit={onSubmitTheForm}
                className="p-4 w-50 border rounded shadow-lg bg-light">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title of the dish</label>
                    <input type="text"
                           id="title"
                           name="title"
                           value={pizzaDish.title}
                           onChange={onChangePizzaDishInput}
                           className="form-control"
                           placeholder="Enter dish title"
                   />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price of the dish</label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        value={pizzaDish.price}
                        onChange={onChangePizzaDishInput}
                    placeholder="Enter dish price"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image URL of the dish</label>
                    <input
                    type="url"
                    className="form-control"
                    id="image"
                    name="image_URL"
                    value={pizzaDish.image_URL}
                    onChange={onChangePizzaDishInput}
                    placeholder="Enter dish image URL"
                    />
                </div>
                <div>
                    <button disabled={loadingForAddingDish} type="submit" className="btn btn-primary me-2">Add new Dish</button>
                    {loadingForAddingDish ? <ButtonSpinner/> : null}
                </div>
            </form>
        </div>
    );
};

export default AddNewDish;