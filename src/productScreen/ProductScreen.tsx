import React from 'react';
import Header from '../components/header';
import BackButton from '../components/backButton';

const ProductScreen: React.FC = () => {
    return (
        <div className='h-screen flex flex-col'>
            <Header />
            <div className="flex flex-row w-full p-5 gap-4 ">
                <BackButton />
                <div className="w-1/4 gap-4 flex">
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-700" onClick={() => { }}>Seeds</button>
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-700" onClick={() => { }}>Products</button>
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-700" onClick={() => { }}>Misc</button>
                </div>
            </div>

        </div>
    ); 
};

export default ProductScreen;