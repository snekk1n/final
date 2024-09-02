
const Comment = () => {
    return (
            <div className="w-1/3 border text-white p-4 rounded-lg mt-4">
                <div className="flex items-start space-x-4">
                    <img src={"https://via.placeholder.com/150"} alt="avatar"
                         className="w-10 h-10 rounded-full"/>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-bold">Allkill</h4>
                            <span className="text-sm text-gray-400">31 августа 2024</span>
                        </div>
                        <div className="flex items-center mt-1">
                            {/* Рейтинг из 5 звезд */}
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-5 w-5 ${
                                        index < 1 ? 'text-white' : 'text-gray-500'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 .587l3.668 7.568L24 9.423l-6 5.847L19.334 24 12 19.897 4.666 24 6 15.27l-6-5.847 8.332-1.268z"/>
                                </svg>
                            ))}
                        </div>
                        <p className="mt-2 text-gray-300">
                            Пока что это пик манхв рода я была несчастной но потом стала счастливой в другом
                            мире они добавили лишь одну деталь с меткой но они сделали это качественно в
                            моментах тебе реально хочется поплакать это Очень хорошо
                        </p>
                    </div>
                </div>
            </div>
    );
};

export default Comment;