import React from 'react';
import Header from '../components/header';
import BackButton from '../components/backButton';

const ProductScreen: React.FC = () => {
    const [add, setAdd] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [greens, setGreens] = React.useState(true);
    const [mixes, setMixes] = React.useState(false);
    const [powders, setPowders] = React.useState(false);
    return (
        <div className='h-screen flex flex-col'>
            <Header />
            <div className="flex flex-row w-full p-5 gap-4 ">
                <BackButton />
                <div className="w-1/4 gap-4 flex">
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-700" onClick={() => {setGreens(true);setMixes(false);setPowders(false) }}>Greens</button>
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-700" onClick={() => {setGreens(false);setMixes(true);setPowders(false)}}>Mixes</button>
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-700" onClick={() => {setGreens(false);setMixes(false);setPowders(true) }}>Powders</button>
                </div>
                <h2 className="w-2/4 text-center text-2xl font-bold text-green-900">Products</h2>
                <div className="w-1/4 flex justify-end">
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-700" onClick={() => setAdd(true)}>Add</button>
                </div>
            </div>

        </div>
    ); 
};

export default ProductScreen;