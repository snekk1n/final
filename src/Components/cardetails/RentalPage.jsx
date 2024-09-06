import { useState } from 'react';
import axios from 'axios';
import DateDifference from './DateDifference';
import PhoneInputField from "./PhoneInputField.jsx";
import moment from 'moment';
import token from './token.js'

const RentalPage = ({ car, price }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [phone, setPhone] = useState('');

    const handleConfirmBooking = async () => {
        const today = moment().format('YYYY-MM-DD');
        const bookingStartDate = startDate || today;

        try {
            const response = await axios.post(
                `https://ash2521.pythonanywhere.com/rentals/create/${car}/`,
                {
                    start_date: bookingStartDate,
                    end_date: endDate,
                    phone_number: phone
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log('Booking confirmed:', response.data);
            // Обработка успешного подтверждения бронирования
        } catch (error) {
            console.error('Error confirming booking:', error);
            // Обработка ошибки
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
