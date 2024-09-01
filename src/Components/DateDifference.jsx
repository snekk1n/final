import { useState } from 'react';

const DateDifference = ({ price }) => {
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
        setDate1(newDate1);
        calculateDifference(newDate1, date2);
    };

    const handleDateChange2 = (e) => {
        const newDate2 = e.target.value;
        setDate2(newDate2);
        calculateDifference(date1, newDate2);
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
                    />
                </div>
            </div>
            {dayDifference !== null && (
                <div className="mt-4">
                    <p>Получиться: {dayDifference * price} сом</p>
                </div>
            )}
        </div>
    );
};

export default DateDifference;
