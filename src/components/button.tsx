import React from 'react';

interface ButtonProps {
    onClick: () => void;
    img: string;
    text: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, img, text, disabled }) => {
    return (
        <button onClick={onClick} className='p-10 bg-green-700 items-center flex flex-col justify-center rounded-lg gap-2 cursor-pointer disabled:bg-slate-300 disabled:forced-colors:bg-slate-600 disabled:cursor-default' disabled={disabled}>
            <img src={img} alt="button" />
            <p className='text-white'>{text}</p>
        </button>
    );
};

export default Button;