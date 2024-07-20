import React from 'react';
import Header from '../components/header';
import BackButton from '../components/backButton';
import AddForm from './AddForm';
import ItemModal from './Item';
const InventoryScreen: React.FC = () => {
    const [seeds, setSeeds] = React.useState(true);
    const [products, setProducts] = React.useState(false);
    const [misc, setMisc] = React.useState(false);
    const [add, setAdd] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    return (
        <><div className='h-screen flex flex-col gap-2'>
            <Header />
            {/* <div className="flex flex-row justify-start items-center px-10 text-white">
    
    </div> */}
            <div className="flex flex-row w-full p-5 gap-4">
                <BackButton />
                <div className="w-1/4 gap-4 flex">
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-700" onClick={() => { setProducts(false); setMisc(false); setSeeds(true); } }>Seeds</button>
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-700" onClick={() => { setProducts(true); setMisc(false); setSeeds(false); } }>Products</button>
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-700" onClick={() => { setProducts(false); setMisc(true); setSeeds(false); } }>Misc</button>
                </div>
                <h2 className="w-2/4 text-center text-2xl font-bold text-green-900">Inventory</h2>
                <div className="w-1/4 flex justify-end">
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-700" onClick={() => setAdd(true)}>Add</button>
                </div>
            </div>
            <h2 className="w-2/4 text-left text-2xl font-bold px-10 text-green-700">{seeds ? "Seeds" : products ? "Products" : "Miscellaneous"}</h2>
            <div className="flex justify-center px-10 py-4">
                {seeds && <table className="w-full table-auto border-collapse text-center">
                    <thead className='bg-green-700 text-white '>
                        <tr>
                            <th className="py-2">Lot Number</th>
                            <th className="py-2">Seed Type</th>
                            <th className="py-2">Supplier</th>
                            <th className="py-2">Quantity</th>
                            <th className="py-2">Date of Purchase</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='' onClick={() => setEdit(true)}>
                            <td className="border py-2" >123456</td>
                            <td className="border py-2">Tomato</td>
                            <td className="border py-2">Supplier 1</td>
                            <td className="border py-2">100</td>
                            <td className="border py-2">01/01/2021</td>
                            
                        </tr>
                        <tr className=''>
                            <td className="border py-2">123456</td>
                            <td className="border py-2">Tomato</td>
                            <td className="border py-2">Supplier 1</td>
                            <td className="border py-2">100</td>
                            <td className="border py-2">01/01/2021</td>
                           
                        </tr>
                        <tr className=''>
                            <td className="border py-2">123456</td>
                            <td className="border py-2">Tomato</td>
                            <td className="border py-2">Supplier 1</td>
                            <td className="border py-2">100</td>
                            <td className="border py-2">01/01/2021</td>
                            
                        </tr>
                        <tr className=''>
                            <td className="border py-2">123456</td>
                            <td className="border py-2">Tomato</td>
                            <td className="border py-2">Supplier 1</td>
                            <td className="border py-2">100</td>
                            <td className="border py-2">01/01/2021</td>
                           
                        </tr>
                    </tbody>
                </table>}

                {products && <table className="w-full table-auto border-collapse text-center">
                    <thead className='bg-green-700 text-white text-center'>
                        <tr>
                            <th className="py-2">Name</th>
                            <th className="py-2">Package Size</th>
                            <th className="py-2">Harvested Date</th>
                            <th className="py-2">Quantity</th>
                            <th className="py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='' onClick={() => setEdit(true)}>
                            <td className="border py-2"  onClick={() => setEdit(true)}>Tomato</td>
                            <td className='border py-2'>1kg</td>
                            <td className="border py-2">123456</td>
                            <td className="border py-2">100</td>
                            <td className="border py-2">Available</td>
                        </tr>
                        <tr className=''>
                            <td className="border py-2">Tomato</td>
                            <td className='border py-2'>1kg</td>
                            <td className="border py-2">123456</td>
                            <td className="border py-2">100</td>
                            <td className="border py-2">Available</td>
                        </tr>
                        <tr className=''>
                            <td className="border py-2">Tomato</td>
                            <td className='border py-2'>1kg</td>
                            <td className="border py-2">123456</td>
                            <td className="border py-2">100</td>
                            <td className="border py-2">Available</td>
                        </tr>
                        <tr className=''>
                            <td className="border py-2">Tomato</td>
                            <td className='border py-2'>1kg</td>
                            <td className="border py-2">123456</td>
                            <td className="border py-2">100</td>
                            <td className="border py-2">Available</td>
                        </tr>

                    </tbody>
                </table>}
                {misc && <table className="w-full table-auto border-collapse text-center">
                    <thead className='bg-green-700 text-white text-center'>
                        <tr>
                            <th className="py-2">Type</th>
                            <th className="py-2">Supplier</th>
                            <th className="py-2">Quantity</th>
                            <th className="py-2">Date of Purchase</th>
                            <th className="py-2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='' onClick={() => setEdit(true)}>
                            <td className="border py-2"  onClick={() => setEdit(true)}>Fertilizer</td>
                            <td className="border py-2">Supplier 1</td>
                            <td className="border py-2">100</td>
                            <td className="border py-2">01/01/2021</td>
                            <td className="border py-2">01/01/2022</td>
                        </tr>
                        <tr className=''>
                            <td className="border py-2">Fertilizer</td>
                            <td className="border py-2">Supplier 1</td>
                            <td className="border py-2">100</td>
                            <td className="border py-2">01/01/2021</td>
                            <td className="border py-2">01/01/2022</td>
                        </tr>
                        <tr className=''>
                            <td className="border py-2">Fertilizer</td>
                            <td className="border py-2">Supplier 1</td>
                            <td className="border py-2">100</td>
                            <td className="border py-2">01/01/2021</td>
                            <td className="border py-2">01/01/2022</td>
                        </tr>
                        <tr className=''>
                            <td className="border py-2">Fertilizer</td>
                            <td className="border py-2">Supplier 1</td>
                            <td className="border py-2">100</td>
                            <td className="border py-2">01/01/2021</td>
                            <td className="border py-2">01/01/2022</td>
                        </tr>
                    </tbody>
                </table>}
            </div>
            {add && <AddForm onClose={() => setAdd(false)} />}
            {edit && <ItemModal onClose={() => setEdit(false)} seeds={seeds} products={products} misc={misc}/>}
        </div><> </></>
    );
};

export default InventoryScreen; 