import React, { useState } from 'react';
import Header from '../components/header';
import TextBox from '../components/textBox';
import { useNavigate } from 'react-router';
import { Authenticator } from '@aws-amplify/ui-react';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/');
        // Add your login logic here
    };

    return (
        <>
        <div className='h-screen flex flex-col'>
        <Header />
        <div className="flex flex-col items-center justify-center h-full">  
            {/* <form onSubmit={handleSubmit} className='border-2 p-5 py-10 rounded-xl bg-green-600 w-1/3 h-1/3 justify-between flex flex-col text-white'>
                <div className='w-full flex flex-row items-center justify-between'>
                    <label className='w-1/4'>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                </div>
                <div className='w-full flex flex-row items-center justify-between'>
                    <label  className='w-1/4'>Password:</label>
                    <TextBox onChange={handlePasswordChange} value={password} id='password' name='password' type='password' />
                </div>
                <button type="submit" className='p-2 bg-white text-green-800 w-min self-center rounded-md px-6'>Login</button>
            </form>
          <a href='/register'><h1 className="text-lg font-light mt-4">Register Here</h1></a> */}
          <Authenticator loginMechanisms={['email']}>
        
          </Authenticator>
          </div>
        </div></>
    );
};

export default Login;