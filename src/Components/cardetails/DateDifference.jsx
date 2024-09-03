import { useState } from 'react';

const DateDifference = ({ price, onStartDateChange, onEndDateChange }) => {
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    const [dayDifference, setDayDifference] = useState(null);

    const calculateDifference = (d1, d2) => {
        if (d1 && d2) {
            const diffTime = Math.abs(new Date(d2) - new Date(d1));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDayDifference(diffDays);
        } else {
            setDayDifference(null);
        }
    };

    const handleDateChange1 = (e) => {
        const newDate1 = e.target.value;
        const today = new Date().toISOString().split('T')[0]; // Получаем сегодняшнюю дату в формате 'YYYY-MM-DD'

        if (newDate1 >= today) { // Проверяем, что первая дата не раньше сегодняшнего дня
            setDate1(newDate1);
            calculateDifference(newDate1, date2);
            onStartDateChange(newDate1); // Передаем значение в родительский компонент
        } else {
            alert("Первая дата не может быть раньше сегодняшнего дня.");
        }
    };

    const handleDateChange2 = (e) => {
        const newDate2 = e.target.value;

        if (newDate2 >= date1) { // Проверяем, что вторая дата не раньше первой
            setDate2(newDate2);
            calculateDifference(date1, newDate2);
            onEndDateChange(newDate2); // Передаем значение в родительский компонент
        } else {
            alert("Вторая дата не может быть раньше первой.");
        }
    };

    return (
        <div>
            <div className="flex space-x-4">
                <div className="relative w-1/2">
                    <input
                        type="date"
                        className="w-full p-4 bg-transparent border border-gray-700 focus:outline-none"
                        value={date1}
                        onChange={handleDateChange1}
                    />
                </div>
                <div className="relative w-1/2">
                    <input
                        type="date"
                        className="w-full p-4 bg-transparent border border-gray-700 focus:outline-none"
                        value={date2}
                        onChange={handleDateChange2}
                        disabled={!date1} // Блокируем ввод второй даты до выбора первой
                    />
                </div>
            </div>
            {dayDifference !== null && (
                <div className="mt-4">
                    <p className="w-full p-4 bg-transparent border border-white-700 focus:outline-none">
                        Итого: {dayDifference * price} сом
                    </p>
                </div>
            )}
        </div>
    );
};

export default DateDifference;
