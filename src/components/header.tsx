// components/header.tsx
import React from 'react';
const logo = require('../assets/icons/logo.svg').default;
const Header: React.FC = () => {

  return (
    <header>
      <div className="flex flex-row justify-between w-full items-center bg-green-700 py-5 px-10 text-white">
        <a href='/' className="text-xl font-bold">trazo</a>
        <div className="flex flex-row items-center">
        <p>Infinity Greens</p>
        <a href='/login'>
        <img src={logo} alt="logo" className='w-10 ml-2'/> </a>
        </div>
        </div>   
        </header>
  );
};

export default Header;
