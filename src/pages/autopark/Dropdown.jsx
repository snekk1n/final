import React, { useState } from 'react';
import './Dropdown.css'; // External CSS file

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOptions((prev) =>
            prev.includes(value)
                ? prev.filter((option) => option !== value)
                : [...prev, value]
        );
    };

    return (
        <div className="dropdown">
            <button className="dropdown-btn" onClick={toggleDropdown}>
                Марка {isOpen ? '' : ''}
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    {['Aston Martin', 'Audi', 'BMW', 'Bentley', 'Cadillac', 'Chevrolet', 'Ferrari', 'Ford'].map((brand) => (
                        <label key={brand}>
                            <input
                                type="checkbox"
                                value={brand}
                                checked={selectedOptions.includes(brand)}
                                onChange={handleOptionChange}
                            />
                            {brand}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
