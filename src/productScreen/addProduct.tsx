import React from 'react';
import TextBox from '../components/textBox';

interface AddProductProps {
    onClose: () => void;

}



const AddProduct: React.FC<AddProductProps> = ({ onClose }) => {
    const [productType, setProductType] = React.useState('greens');
    const [productName, setProductName] = React.useState('');
    const [productId, setProductId] = React.useState('');
    const [productPackages, setProductPackages] = React.useState<string[]>([]);
    const [productSoldTo, setProductSoldTo] = React.useState<string[]>([]);

    const handleProductSizing = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setProductPackages(prev =>
            prev.includes(value)
                ? prev.filter(pkg => pkg !== value)
                : [...prev, value]
        );
    };
    const handleSoldToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.id;
        setProductSoldTo(prev =>
            prev.includes(value)
                ? prev.filter(pkg => pkg !== value)
                : [...prev, value]
        );
    };

    const defaultFormClass = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ';
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();



        onClose();
    };

    return (
        <div className="modal fixed inset-10 flex justify-center items-center bg-black bg-opacity-0 mb-12 rounded ">
            <div className="modal-content bg-white w-1/2 h-full shadow-lg relative flex flex-none flex-col rounded-md gap-4 overflow-y-auto">
                <div className="flex flex-row w-full p-5 gap-4 bg-green-900 text-white justify-between rounded-t-md sticky top-0">
                    <h2 className='text-lg font-semibold'>Add Product</h2>
                    <button onClick={onClose} className='text-white justify-end flex text-xl font-black'>X</button>
                </div>



                <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5 h-full justify-between'>
                    <label htmlFor="productType" className='flex flex-row gap-2 items-center justify-between'>Product Type
                        <select name="productType" onChange={(e) => {
                            setProductType(e.target.value);
                        }} id="productType" className={defaultFormClass + 'w-1/2'}>
                            <option value="greens" >Greens</option>
                            <option value="mixes" >Mixes</option>
                            <option value="powders">Powders</option>
                        </select>
                    </label>
                    <label htmlFor="productName" className='flex flex-row items-center justify-between'>Product Name
                        <input type="text" id="productName" name="productName" className={defaultFormClass + 'w-1/2'} />
                    </label>
                    <label htmlFor="productId" className='flex flex-row items-center justify-between'>Product ID
                        <div className="w-1/2 flex justify-start">
                            <label htmlFor="productId" className={defaultFormClass + 'w-full'}>{productType === 'greens' ? 'IGPMG' : productType === 'mixes' ? 'IGPM' : 'IGPMP'}-<input type="text" id="productId" name="productId" className='bg-gray-50 w-max text-gray-900 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white ' /></label>
                        </div>
                    </label>
                    <label htmlFor="productType" className='flex flex-row justify-between items-center'>Product Packages
                        <div className="grid grid-cols-2 w-1/2 justify-start gap-2">
                            <label className="flex flex-row gap-2">
                                <input type="checkbox" id="productPackages50" name="productPackages" className="w-4" value="50" onChange={handleProductSizing} />50g
                            </label>
                            <label className="flex flex-row gap-2">
                                <input type="checkbox" id="productPackages453" name="productPackages" className="w-4" value="453" onChange={handleProductSizing} />1lb
                            </label>
                            <label className="flex flex-row gap-2">
                                <input type="checkbox" id="productPackages113" name="productPackages" className="w-4" value="113" onChange={handleProductSizing} />16oz Container
                            </label>
                            <label className="flex flex-row gap-2">
                                <input type="checkbox" id="productPackages227" name="productPackages" className="w-4" value="227" onChange={handleProductSizing} />24oz Container
                            </label>
                            <label className="flex flex-row gap-2">
                                <input type="checkbox" id="productPackages20" name="productPackages" className="w-4" value="20" onChange={handleProductSizing} />Sample Size
                            </label>
                            <label className="flex flex-row gap-2">
                                <input type="checkbox" id="productPackages150" name="productPackages" className="w-4" value="100" onChange={handleProductSizing} />150g Powder
                            </label>
                        </div>
                    </label>
                    <label htmlFor='productSoldTo' className='flex flex-row items-center justify-between'>Sold To
                        <div className="flex justify-start w-1/2 gap-2">
                            <label className='flex flex-row gap-2'> <input type='checkbox' id='productSoldToFood' name='productSoldTo' className='w-4' onChange={handleSoldToChange} />Food Services</label>
                            <label className='flex flex-row gap-2'><input type='checkbox' id='productSoldToRetail' name='productSoldTo' className='w-4' onChange={handleSoldToChange} />Retail</label>
                        </div>
                    </label>

                    {productSoldTo.length > 0 && productPackages.length > 0 && (
                        <div className="flex flex-col gap-4">
                            {productSoldTo.map(soldTo => (
                                <div key={soldTo}>
                                    <h3 className="text-lg font-semibold mb-2">{soldTo === 'productSoldToFood' ? 'Food Services Pricing' : 'Retail Pricing'}</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {productPackages.map(pkg => (
                                            <div key={pkg} className="flex flex-row gap-2 items-center justify-between">
                                                <label htmlFor={`${soldTo}-${pkg}`} className=''>{
                                                    pkg === '50' ? '50g' : pkg === '453' ? '1lb' : pkg === '113' ? '16oz Container' : pkg === '227' ? '24oz Container' : pkg === '20' ? 'Sample Size' : '150g'
                                                }</label>
                                                <input type='number' id={`${soldTo}-${pkg}`} name={`${soldTo}-${pkg}`} className={defaultFormClass + 'w-1/2'} />
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                    <button type='submit' className='bg-green-600 text-white p-2 rounded focus:bg-green-700'>Add Product</button>
                </form>

            </div>
        </div>
    );
};

export default AddProduct;