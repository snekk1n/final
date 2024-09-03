import { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

function PhoneInputField() {
    const [phone, setPhone] = useState('');

    return (
        <PhoneInput
            country={'kg'}
            value={phone}
            onChange={phone => setPhone(phone)}
            inputStyle={{
                width: '100%',
                height: '70px',
                border: '1px solid #fff',
                backgroundColor: 'transparent',
                color: '#fff',
                paddingLeft: '68px',
            }}
            buttonStyle={{
                border: '1px solid #fff',
                backgroundColor: 'transparent',
                padding: '5px 10px',
            }}
            dropdownStyle={{
                backgroundColor: '#1a1a1a',
                color: '#aaa',
            }}
        />
    );
}

export default PhoneInputField;