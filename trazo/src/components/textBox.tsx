import React from 'react';

interface InputBoxProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    id: string;
    name: string;
    type: string;
    disabled?: boolean;
    className?: string;
}

const TextBox: React.FC<InputBoxProps> = ({ onChange,value,id,name,type,disabled, className }) => {
    const defaultClassName = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ';
    return (
      
            <input type={type} value={value} id={id} name={name} disabled={disabled} onChange={onChange} className={defaultClassName + className} />
    );
};

export default TextBox;