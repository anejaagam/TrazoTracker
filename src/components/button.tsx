import React from 'react';

interface ButtonProps {
    onClick: () => void;
    img: string;
    text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, img, text }) => {
    return (
        <button onClick={onClick} className='p-10 bg-green-700 items-center flex flex-col justify-center rounded-lg gap-2 cursor-pointer'>
            <img src={img} alt="button" />
            <p className='text-white'>{text}</p>
        </button>
    );
};

export default Button;