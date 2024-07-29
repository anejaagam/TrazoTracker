// components/header.tsx
import React from 'react';
import { signOut } from 'aws-amplify/auth';
const logo = require('../assets/icons/logo.svg').default;
const Header: React.FC = () => {
const handleSignOut = async () => {
    try {
        await signOut();
    } catch (error) {
        console.error('Error signing out:', error);
    }
}
  return (
    <header>
      <div className="flex flex-row justify-between w-full items-center bg-green-700 py-5 px-10 text-white">
        <a href='/' className="text-xl font-bold">trazo</a>
        <div className="flex flex-row items-center">
        <p>Infinity Greens</p>
        <img src={logo} alt="logo" className='w-10 ml-2' onClick={handleSignOut}/> 
        </div>
        </div>   
        </header>
  );
};

export default Header;
