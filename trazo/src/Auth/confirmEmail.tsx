import React, { useState } from 'react';
import Header from '../components/header';
import TextBox from '../components/textBox';
import { useNavigate } from 'react-router';


const ConfirmEmail = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const navigate = useNavigate();

    const handleVerificationCodeChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setVerificationCode(e.target.value);
    };

    const handleVerify = () => {
    navigate('/');
    };

    return (
        <div className='h-screen flex flex-col'>
            <Header />
            <div className="h-full flex flex-col items-center justify-center">
            <div className='border-2 p-5 py-10 rounded-xl bg-green-600 w-1/3 h-1/3 justify-between items-center flex flex-col text-white'>
            <p>Please enter the verification code sent to your email:</p>
           
          <TextBox onChange={handleVerificationCodeChange} value={verificationCode} id='verificationCode' name='verificationCode' type='text' />
            <button onClick={handleVerify} className='p-2 bg-white text-green-800 w-min self-center rounded-md px-6'>Verify</button>
            </div>
            </div>
            
        </div>
    );
};

export default ConfirmEmail;