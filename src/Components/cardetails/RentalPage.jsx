import { useState } from 'react';
import axios from 'axios';
import DateDifference from './DateDifference';
import PhoneInputField from "./PhoneInputField.jsx";

const RentalPage = ({ car, price }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [phone, setPhone] = useState('');
    console.log(phone)
    console.log(startDate)
    console.log(endDate)
    const handleConfirmBooking = async () => {
        try {
            const response = await axios.post(`https://ash2521.pythonanywhere.com/rentals/create/${car}/`, {
                start_date: startDate,
                end_date: endDate,
                phone_number: phone
            });
            console.log('Booking confirmed:', response.data);
            // Handle successful booking confirmation (e.g., display a success message)
        } catch (error) {
            console.error('Error confirming booking:', error);
            // Handle error (e.g., display an error message)
        }
    };

    return (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Ваше имя"
                className="w-full p-4 bg-transparent border border-white-700 focus:outline-none"
            />

            <div className="relative">
                <PhoneInputField value={phone} onChange={setPhone} />
            </div>

            <DateDifference
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                price={price}
            />

            <button
                onClick={handleConfirmBooking}
                type="submit"
                className="text-black w-full bg-white py-4 font-bold hover:bg-gray-100"
            >
                Подтвердить бронь
            </button>
        </div>
    );
};

export default RentalPage;
