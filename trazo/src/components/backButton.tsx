import React from 'react';
import { useNavigate } from 'react-router';
const back = require('../assets/icons/chevron-left.svg').default;

const BackButton: React.FC = () => {
    const navigate = useNavigate();
    return (
        <button onClick={()=>{navigate(-1)}} className='p-2 bg-green-900 items-center flex flex-row justify-center rounded-lg gap-2 cursor-pointer'>
            <img src={back} alt="button" className='w-3 h-3' />
            <p className='text-white'>Back</p>
        </button>
    );
};

export default BackButton;