import axios from "axios";




export const carsPage1 = async () => {
    try {
        const response = await axios.get(`https://ash2521.pythonanywhere.com/cars?page=1`);
        console.log(response.data.results);
    } catch (error) {
        console.log(error);
    }
};

export const carsPage2 = async () => {
    try {
        const response = await axios.get(`https://ash2521.pythonanywhere.com/cars?page=2`);
        console.log(response.data.results);
    } catch (error) {
        console.log(error);
    }
};

export const carsPage3 = async () => {
    try {
        const response = await axios.get(`https://ash2521.pythonanywhere.com/cars?page=3`);
        console.log(response.data.results);
    } catch (error) {
        console.log(error);
    }
};
