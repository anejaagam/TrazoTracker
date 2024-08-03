import React, { useEffect } from 'react';
import Header from '../components/header';
import BackButton from '../components/backButton';
import AddForm from './AddForm';
import ItemModal from './Item';
import { useTrazoBackendContext } from '../utilities/trazoBackend';
const InventoryScreen: React.FC = () => {
    const [seeds, setSeeds] = React.useState(true);
    const [products, setProducts] = React.useState(false);
    const [misc, setMisc] = React.useState(false);
    const [add, setAdd] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [item, setItem] = React.useState<any>(null);
    const {state, dispatch} = useTrazoBackendContext();
   
    const [inventoryList, setInventoryList] = React.useState<any>({seeds: [], harvestedProducts: [], miscProducts: []});
    const [productList, setProductList] = React.useState<any>([]);
    useEffect(() => {
        const {inventoryList, productList} = state;
        setInventoryList(inventoryList);
        setProductList(productList);
    }, [state]);
    return (
        <><div className='h-screen flex flex-col gap-2'>
           
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
                            <th className="py-2">Quantity Acquired</th>
                            <th className="py-2">Quantity Left</th>
                            <th className="py-2">Price</th>
                            <th className="py-2">Date of Purchase</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryList.seeds.map((seed: { id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; variety: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; supplierName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; quantityAcquired: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; quantityLeft: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; priceBoughtAt: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; dateAcquired: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                            <tr key={index} onClick={()=>{setEdit(true); setItem(seed)}} className=''>
                                <td className="border py-2" >{seed.id}</td>
                                <td className="border py-2">{seed.variety}</td>
                                <td className="border py-2">{seed.supplierName}</td>
                                <td className="border py-2">{seed.quantityAcquired}</td>
                                <td className="border py-2">{seed.quantityLeft}</td>
                                <td className="border py-2">{seed.priceBoughtAt}</td>
                                <td className="border py-2">{seed.dateAcquired}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>}

                {products && <table className="w-full table-auto border-collapse text-center">
                    <thead className='bg-green-700 text-white text-center'>
                        <tr>
                            <th className="py-2">Name</th>
                            <th className="py-2">Package Size</th>
                            <th className="py-2">Harvested Date</th>
                            <th className="py-2">Quantity</th>
                            <th className="py-2">Quantity Left</th>
                        </tr>
                    </thead>
                    <tbody>
                    {inventoryList.harvestedProducts.map((harvest: { productId: any; packaging: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; dateOfHarvest: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; quantityHarvested: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; quantityLeft: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                            <tr key={index} onClick={()=>{setEdit(true); setItem(harvest)}} className=''>
                                <td className="border py-2" >{productList.find((product: { id: any; }) => 
                                    product.id === harvest.productId)?.name}</td>
                                <td className="border py-2">{harvest.packaging}</td>
                                <td className="border py-2">{harvest.dateOfHarvest}</td>
                                <td className="border py-2">{harvest.quantityHarvested}</td>
                                <td className="border py-2">{harvest.quantityLeft}</td>
                             

                            </tr>
                        ))}

                    </tbody>
                </table>}
                {misc && <table className="w-full table-auto border-collapse text-center">
                    <thead className='bg-green-700 text-white text-center'>
                        <tr>
                            <th className="py-2">Type</th>
                            <th className="py-2">Supplier</th>
                            <th className="py-2">Price</th>
                            <th className="py-2">Quantity</th>
                            <th className="py-2">Date of Purchase</th>
                            <th className="py-2">Description</th>
                            <th className="py-2">Quantity Left</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryList.miscProducts.map((misc: { type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; supplierName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; quantity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; dateAcquired: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; quantityLeft: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; },  index: React.Key | null | undefined) => (
                            <tr key={index} onClick={()=>{setEdit(true); setItem(misc)}} className=''>
                                <td className="border py-2" >{misc.type}</td>
                                <td className="border py-2">{misc.supplierName}</td>
                                <td className="border py-2">{misc.price}</td>
                                <td className="border py-2">{misc.quantity}</td>
                                <td className="border py-2">{misc.dateAcquired}</td>
                                <td className="border py-2">{misc.description}</td>
                                <td className="border py-2">{misc.quantityLeft}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
            {add && <AddForm onClose={() => setAdd(false)} />}
            {edit && <ItemModal onClose={() => setEdit(false)} seeds={seeds} products={products} misc={misc} ProductItem={item} SeedItem={item} MiscItem={item}/>}
        </div><> </></>
    );
};

export default InventoryScreen; 