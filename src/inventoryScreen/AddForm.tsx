import React from 'react';

interface AddFormProps {
    onClose: () => void;
   
}



const AddForm: React.FC<AddFormProps> = ({onClose}) => {
    const [seeds, setSeeds] = React.useState(true);
    const [products, setProducts] = React.useState(false);
    const [misc, setMisc] = React.useState(false);
    const [powder, setPowder] = React.useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


       
        onClose();
    };

    return (
        <div className="modal fixed inset-10 flex justify-center items-center bg-black bg-opacity-0 mb-12 rounded">
            <div className="modal-content bg-white w-1/2 h-full shadow-lg relative flex flex-none flex-col rounded-md gap-4">
            <div className="flex flex-row w-full p-5 gap-4 bg-green-900 text-white justify-between rounded-t-md">
                <h2 className='text-lg font-semibold'>Add Inventory Item</h2>
                <button onClick={onClose} className='text-white justify-end flex text-xl font-black'>X</button>
                </div>
                
                <div className="flex flex-row px-10 text-white gap-4 w-full justify-center">
                <button className="bg-green-600 text-white p-2 rounded focus:bg-green-900" onClick={() => { setProducts(false); setMisc(false); setSeeds(true); } }>Seeds</button>
                <button className="bg-green-600 text-white p-2 rounded focus:bg-green-900" onClick={() => { setProducts(true); setMisc(false); setSeeds(false); } }>Products</button>
                <button className="bg-green-600 text-white p-2 rounded focus:bg-green-900" onClick={() => { setProducts(false); setMisc(true); setSeeds(false); } }>Misc</button>
                </div>
                {seeds&& <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5 justify-between h-full'>
                    <label htmlFor="supplierName" className='flex flex-row gap-2 items-center justify-between'>Supplier Name
                    <input type="text" id="supplierName" name="supplierName" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='' />
                    </label>
                    <label htmlFor="seedVariety" className='flex flex-row gap-2 items-center justify-between'>Seed Variety
                    <input type="text" id="seedVariety" name="seedVariety" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='' />
                    </label>
                    <label htmlFor="dateOfAcquisition" className='flex flex-row gap-2 items-center justify-between'>Date of Acquisition
                    <input type="date" id="dateOfAcquisition" name="dateOfAcquisition" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    </label>
                    <label htmlFor="quantity" className='flex flex-row gap-2 items-center justify-between'>Quantity
                    <input type="number" id="quantity" name="quantity" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    <label htmlFor="id" className='flex flex-row gap-2 items-center justify-between'>ID
                    <input type="text" id="id" name="id" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    </label>
                    <button type="submit" className=' bg-green-800 p-2 px-4 text-white rounded-md w-min items-center self-center'>Submit</button>
                    </form>}

                {products&& <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5 h-full justify-between'>
                    <label htmlFor="productId" className='flex flex-row gap-2 items-center justify-between'>Product ID
                        <select id="productId" name="productId" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                            <option value="1">Product 1</option>
                            <option value="2">Product 2</option>
                            <option value="3">Product 3</option>
                            {/* Add more options as needed */}
                        </select>
                    </label>
                    <label htmlFor="productType" className='flex flex-row gap-2 items-center justify-between'>Product Type
                        <div className='flex flex-row gap-2'>
                            <input type="radio" id="refrigerated" name="productType" value="refrigerated" onChange={()=>setPowder(false)} />
                            <label htmlFor="refrigerated">Refrigerated</label>
                        </div>
                        <div  className='flex flex-row gap-2'>
                            <input type="radio" id="powder" name="productType" value="powder" onChange={()=>setPowder(true)}/>
                            <label htmlFor="powder">Powder</label>
                        </div>
                    </label>
                    <label htmlFor="productQuantity" className='flex flex-row gap-2 items-center justify-between'>Quantity
                        <input type="number" id="productQuantity" name="productQuantity" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    {!powder && <label htmlFor="packageSize" className='flex flex-row gap-2 items-center justify-between'>Package Size
                        <select id="packageSize" name="packageSize" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                            <option value="50">50 Grams</option>
                            <option value="453">1 lb</option>
                            <option value="113">4oz Container</option>
                            <option value="450">450 Grams</option>
                            <option value="20">Sample Size</option>
                        </select>
                    </label>}
                    <label htmlFor="dateOfHarvest" className='flex flex-row gap-2 items-center justify-between'>Date of Harvest
                    <input type="date" id="dateOfHarvest" name="dateOfHarvest" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    </label>
                    <button type="submit" className=' bg-green-800 p-2 px-4 text-white rounded-md w-min items-center self-center'>Submit</button>
                    </form>}

                {misc&& <form onSubmit={handleSubmit} className='flex flex-col gap-4 h-full justify-between p-5'>
                    <label htmlFor="miscProduct" className='flex flex-row gap-2 items-center justify-between'>Misc Product
                        <label htmlFor='miscFertilizer' className='flex flex-row gap-2'><input type='radio' id='miscFertilizer' name='miscProduct' value='Fertilizer' />Fertilizer</label>
                        <label htmlFor='miscSoil' className='flex flex-row gap-2'><input type='radio' id='miscSoil' name='miscProduct' value='Soil' />Soil</label>
                        <label htmlFor='PackingMaterial' className='flex flex-row gap-2'><input type='radio' id='miscPackingMaterial' name='miscProduct' value='PackingMaterial' />Packing Material</label>
                    </label>
                    <label htmlFor="miscSupplier" className='flex flex-row gap-2 items-center justify-between'>Supplier
                        <input type="text" id="miscSupplier" name="miscSupplier" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    <label htmlFor="miscQuantity" className='flex flex-row gap-2 items-center justify-between'>Quantity
                        <input type="number" id="miscQuantity" name="miscQuantity" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    <label htmlFor="miscDescription" className='flex flex-row gap-2 items-center justify-between'>Description
                        <textarea id="miscDescription" name="miscDescription" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    <label htmlFor="miscDate" className='flex flex-row gap-2 items-center justify-between'>Date of Purchase
                    <input type="date" id="miscDate" name="miscDate" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    </label>
                    <button type="submit" className=' bg-green-800 p-2 px-4 text-white rounded-md w-min items-center self-center'>Submit</button>
                    </form>}
            </div>
        </div>
    );
};

export default AddForm;