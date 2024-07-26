import React from 'react';
import Header from '../components/header';
import BackButton from '../components/backButton';
import AddProduct from './addProduct';

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
                <div className="flex justify-center px-10 py-4">
                    {greens && <table className="w-full table-auto border-collapse text-center">
                        <thead className='bg-green-700 text-white '>
                            <tr>
                                <th className="py-2 bg-white" colSpan={1}></th>
                                <th className="py-2 bg-white" colSpan={1}></th>
                                <th className="py-2 border" colSpan={2}>50g</th>
                                <th className="py-2 border " colSpan={2}>1lb</th>
                                <th className="py-2 border " colSpan={2}>16oz Container</th>
                                <th className="py-2 border" colSpan={2}>24oz</th>
                                <th className="py-2 border" colSpan={2}>Sample</th>
                                </tr>
                                <tr>
                                <th className="py-2 " colSpan={1}>Product ID</th>
                                <th className="py-2" colSpan={1}>Product Name</th>
                                    <th className="py-2 border">Food Service</th>
                                    <th className="py-2 border">Retail</th>
                                    <th className="py-2 border">Food Service</th>
                                    <th className="py-2 border">Retail</th>
                                    <th className="py-2 border">Food Service</th>
                                    <th className="py-2 border">Retail</th>
                                    <th className="py-2 border">Food Service</th>
                                    <th className="py-2 border">Retail</th>
                                    <th className="py-2 border">Food Service</th>
                                    <th className="py-2 border">Retail</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className='' onClick={() => setEdit(true)}>
                                        <td className="border py-2">IGPMG-123456</td>
                                        <td className="border py-2">Tomato</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                    </tr>
                                    <tr className=''>
                                        <td className="border py-2">IGPMG-123456</td>
                                        <td className="border py-2">Tomato</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                    </tr>
                                    </tbody>
                                    </table>}
                                    {mixes && <table className="w-full table-auto border-collapse text-center">
                                        <thead className='bg-green-700 text-white '>
                            <tr>
                            <th className="py-2 bg-white" colSpan={1}></th>
                                <th className="py-2 bg-white" colSpan={1}></th>
                                <th className="py-2 border" colSpan={2}>50g</th>
                                <th className="py-2 border " colSpan={2}>1lb</th>
                                <th className="py-2 border " colSpan={2}>16oz Container</th>
                                <th className="py-2 border" colSpan={2}>24oz</th>
                                <th className="py-2 border" colSpan={2}>Sample</th>
                                </tr>
                                <tr>
                                <th className="py-2" colSpan={1}>Product ID</th>
                                <th className="py-2" colSpan={1}>Product Name</th>
                                    <th className="py-2 border">Food Service</th>
                                    <th className="py-2 border">Retail</th>
                                    <th className="py-2 border">Food Service</th>
                                    <th className="py-2 border">Retail</th>
                                    <th className="py-2 border">Food Service</th>
                                    <th className="py-2 border">Retail</th>
                                    <th className="py-2 border">Food Service</th>
                                    <th className="py-2 border">Retail</th>
                                    <th className="py-2 border">Food Service</th>
                                    <th className="py-2 border">Retail</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr className='' onClick={() => setEdit(true)}>
                                        <td className="border py-2">IGPMG-123456</td>
                                        <td className="border py-2">Tomato</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                    </tr>
                                    <tr className=''>
                                        <td className="border py-2">IGPMG-123456</td>
                                        <td className="border py-2">Tomato</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                    </tr>
                                    </tbody>
                                    </table>}
                                    {powders && <table className="w-full table-fixed border-collapse text-center">
                        <thead className='bg-green-700 text-white '>
                            <tr>
                                <th className="py-2">Product ID</th>
                                <th className="py-2">Product Name</th>
                                <th className="py-2">50g</th>
                                <th className="py-2">150g</th>
                                <th className="py-2">Sample</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr className='' onClick={() => setEdit(true)}>
                                        <td className="border py-2" >IGPMG-123456</td>
                                        <td className="border py-2">Tomato</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        
                                    </tr>
                                    <tr className=''>
                                        <td className="border py-2">IGPMG-123456</td>
                                        <td className="border py-2">Tomato</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        <td className="border py-2">Yes</td>
                                        
                                    </tr>
                                    </tbody>
                                    </table>}
                
            </div>
            {add && <AddProduct onClose={() => setAdd(false)} />}

        </div>
    ); 
};

export default ProductScreen;