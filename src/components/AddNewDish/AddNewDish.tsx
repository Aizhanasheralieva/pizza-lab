import React, {useState} from "react";
import {selectAddPizzaDishLoading} from "../../store/slices/variousPizzaDishesSlice.ts";
import {useAppSelector} from "../../app/hooks.ts";
import ButtonSpinner from "../UI/ButtonSpinner/ButtonSpinner.tsx";

interface Props {
    editAndAddNewPizzaDish: (pizza: IPizzaDishesForm) => void;
    pizzaDishItem?: IPizzaDishesForm;
    isEdit?: boolean;
}
const initialStateForForm = {
    title: '',
    price: 0,
    image_URL: '',
};

const AddNewDish: React.FC<Props> = ({editAndAddNewPizzaDish, pizzaDishItem = initialStateForForm, isEdit = false}) => {
    const [pizzaDish, setPizzaDish] = useState<IPizzaDishesForm>(pizzaDishItem);
    const loadingForAddingDish = useAppSelector(selectAddPizzaDishLoading);

    const onChangePizzaDishInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setPizzaDish(prevState => {
           return {
               ...prevState,
               [name]: value,
           };
        });
    };


    const onSubmitTheForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        editAndAddNewPizzaDish({
            ...pizzaDish,
            price: Number(pizzaDish.price),
        });
    };

    return (
        <div className="container">
            <h1>{isEdit ? 'Edit' : 'Add new'} Dish</h1>
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
                    <label htmlFor="image_URL" className="form-label">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image_URL"
                        name="image_URL"
                        value={pizzaDish.image_URL}
                    onChange={onChangePizzaDishInput}
                    placeholder="Enter dish image URL"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image of the dish </label>
                    {pizzaDish.image_URL && (
                        <img
                            src={pizzaDish.image_URL}
                            className="rounded"
                            alt="Image URL"
                            style={{maxWidth: "100px"}}
                        />
                    )}
                </div>
                <div>
                    <button disabled={loadingForAddingDish} type="submit" className="btn btn-primary me-2">{isEdit ? 'Edit' : 'Save'}
                    </button>
                    {loadingForAddingDish ? <ButtonSpinner/> : null}
                </div>
            </form>
        </div>
    );
};

export default AddNewDish;