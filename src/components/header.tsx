// components/header.tsx
import React, { useState } from 'react';
import { signOut, fetchUserAttributes, FetchUserAttributesOutput } from 'aws-amplify/auth';
const logo = require('../assets/icons/logo.svg').default;
const Header: React.FC = () => {
  const [userAttributes, setUserAttributes] = useState<FetchUserAttributesOutput | null>(null);
const handleSignOut = async () => {
    try {
        await signOut();
    } catch (error) {
        console.error('Error signing out:', error);
    }
}
const getUserAttributes = async () => {
    try {
        const user = await fetchUserAttributes();
        setUserAttributes(user);
    } catch (error) {
        console.error('Error getting user attributes:', error);
    }
  }

  useState(() => {
    getUserAttributes();
  }
  );

  return (
    <header>
      <div className="flex flex-row justify-between w-full items-center bg-green-700 py-5 px-10 text-white">
        <a href='/' className="text-xl font-bold">trazo</a>
        <div className="flex flex-row items-center">
        <p>{userAttributes?.name}</p>
        <img src={logo} alt="logo" className='w-10 ml-2' onClick={handleSignOut}/> 
        </div>
        </div>   
        </header>
  );
};

export default Header;
