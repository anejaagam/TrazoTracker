import React, { useEffect } from 'react';
import Header from '../components/header';
import BackButton from '../components/backButton';
import AddProduct from './addProduct';
import { getFullProductList, getPricesforProduct, ProductList, ProductListPowder } from '../utilities/productsbackend';

const ProductScreen: React.FC = () => {
    const [add, setAdd] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [greens, setGreens] = React.useState(true);
    const [mixes, setMixes] = React.useState(false);
    const [powders, setPowders] = React.useState(false);
    const [productList, setProductList] = React.useState<any[]>([]);
    const packSizes = ["20", "50", "113", "227", "453"] as const;
    const packSizesPowder = ["50", "150", "20"] as const;
    const fetchProductList = async () => {
        const products = await getFullProductList();
        if (products) {
            const sortedProducts = products.sort((a, b) => {
                const idA = parseInt(a.id.split('-')[1]);
                const idB = parseInt(b.id.split('-')[1]);
                return idA - idB;
            });
            setProductList(sortedProducts);
        }
    };
    useEffect(() => {
        
        fetchProductList();
    }
        , []);
    return (
        <div className='h-screen flex flex-col'>

            <div className="flex flex-row w-full p-5 gap-4 ">
                <BackButton />
                <div className="w-1/4 gap-4 flex">
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-700" onClick={() => { setGreens(true); setMixes(false); setPowders(false) }}>Greens</button>
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-700" onClick={() => { setGreens(false); setMixes(true); setPowders(false) }}>Mixes</button>
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-700" onClick={() => { setGreens(false); setMixes(false); setPowders(true) }}>Powders</button>
                </div>
                <h2 className="w-2/4 text-center text-2xl font-bold text-green-900">Products</h2>
                <div className="w-1/4 flex justify-end">
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-700" onClick={() => setAdd(true)}>Add</button>
                </div>
            </div>
            <div className="flex justify-center px-10 py-4">
                {greens && <table className="w-full table-fixed border-collapse text-center">
                    <thead className='bg-green-700 text-white '>
                        <tr>
                            <th className="py-2 bg-white" colSpan={1}></th>
                            <th className="py-2 bg-white" colSpan={1}></th>
                            <th className="py-2 border" colSpan={2}>Sample</th>
                            <th className="py-2 border " colSpan={2}>50g</th>
                            <th className="py-2 border " colSpan={2}>16oz Container</th>
                            <th className="py-2 border" colSpan={2}>24oz Container</th>
                            <th className="py-2 border" colSpan={2}>1lb</th>
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
                        {productList.map((product) => (
                            product.type === 'greens' && (
                                <tr key={product.id}  >
                                    <td className="py-2 border">{product.id}</td>
                                    <td className="py-2 border">{product.name}</td>
                                    {packSizes.map((size) => (
                                        <React.Fragment key={size}>
                                            <td className="py-2 border">{product.type === 'greens' && (product.packing[size]?.FOODSERVICE || "No")}</td>
                                            <td className="py-2 border">{product.packing[size]?.RETAIL || "No"}</td>
                                        </React.Fragment>
                                    ))}
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>}
                {mixes && <table className="w-full table-fixed border-collapse text-center">
                    <thead className='bg-green-700 text-white '>
                        <tr>
                            <th className="py-2 bg-white" colSpan={1}></th>
                            <th className="py-2 bg-white" colSpan={1}></th>
                            <th className="py-2 border" colSpan={2}>Sample</th>
                            <th className="py-2 border " colSpan={2}>50g</th>
                            <th className="py-2 border " colSpan={2}>16oz Container</th>
                            <th className="py-2 border" colSpan={2}>24oz Container</th>
                            <th className="py-2 border" colSpan={2}>1lb</th>
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
                    {productList.map((product) => (
                            product.type === 'mixes' && (
                                <tr key={product.id}>
                                    <td className="py-2 border">{product.id}</td>
                                    <td className="py-2 border">{product.name}</td>
                                    {packSizes.map((size) => (
                                        <React.Fragment key={size}>
                                            <td className="py-2 border">{product.packing[size]?.FOODSERVICE || "No"}</td>
                                            <td className="py-2 border">{product.packing[size]?.RETAIL || "No"}</td>
                                        </React.Fragment>
                                    ))}
                                </tr>
                            )
                        ))}
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
                    {productList.map((product) => (
                            product.type === 'powders' && (
                                <tr key={product.id}>
                                    <td className="py-2 border">{product.id}</td>
                                    <td className="py-2 border">{product.name}</td>
                                    {packSizesPowder.map((size) => (
                                        <React.Fragment key={size}>
                                            <td className="py-2 border">{product.packing[size]?.RETAIL || "No"}</td>
                                        </React.Fragment>
                                    ))}
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>}

            </div>
            {add && <AddProduct onClose={async () => {setAdd(false);  await fetchProductList();}} />}

        </div>
    );
};

export default ProductScreen;