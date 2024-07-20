import React, { useState } from 'react';
import Header from '../components/header';
import TextBox from '../components/textBox';
import { useNavigate } from 'react-router';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const handleRegister = () => {
        // Add your registration logic here
        navigate('/confirm');
    };

    return (
        <div className='h-screen flex flex-col'>
            <Header />
        <div  className="flex flex-col items-center justify-center h-full">
            <form className='border-2 p-5 py-10 rounded-xl bg-green-600 w-6/12 justify-between flex flex-col text-white h-1/2'>
                <label className='w-full flex flex-row items-center justify-between'>
                    Name:
                    <TextBox onChange={(e) => setName(e.target.value)} value={name} id='name' name='name' type='text' />
                </label>
            
                <label className='w-full flex flex-row items-center justify-between'>                    Email:
                    <TextBox onChange={(e) => setEmail(e.target.value)} value={email} id='email' name='email' type='email' />
                </label>
             
                <label className='w-full flex flex-row items-center justify-between'>                    Password:
                    <TextBox onChange={(e) => setPassword(e.target.value)} value={password} id='password' name='password' type='password' />
                </label>
         
                <label className='w-full flex flex-row items-center justify-between'>                    Confirm Password:
                    <TextBox onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} id='confirmPassword' name='confirmPassword' type='password' />
                </label>
                
                <button type="button" onClick={handleRegister} className='p-2 bg-white text-green-800 w-min self-center rounded-md px-6'>Register</button>
            </form>
            <a href='/login'><h1 className="text-lg font-light mt-4">Login Here</h1></a>
        </div>
        
        </div>
    );
};

export default Register;