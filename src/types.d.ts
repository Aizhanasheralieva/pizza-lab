interface IPizzaDishes {
    title: string;
    price: number;
    image_url: string;
    id?: string;
}
interface IPizzaDishesForm {
    title: string;
    price: number;
    image_URL: string;
}

interface IPizzaDishesFromAPI {
    [id: string]: IPizzaDishes;
}