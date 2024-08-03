import React, { useState } from 'react';
import { useTrazoBackendContext } from '../utilities/trazoBackend';
import * as InventoryBackend from '../utilities/inventoryBackend'
interface AddFormProps {
    onClose: () => void;
   
}



const AddForm: React.FC<AddFormProps> = ({onClose}) => {
    const {state, dispatch} = useTrazoBackendContext();
    const {productList, inventoryList} = state;
    const [seeds, setSeeds] = React.useState(true);
    const [products, setProducts] = React.useState(false);
    const [misc, setMisc] = React.useState(false);
    const [powder, setPowder] = React.useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string>('');
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const activeType = seeds ? 'seeds' : products ? 'products' : misc ? 'misc' : '';
        switch (activeType) {
            case 'seeds':
        const Seed : InventoryBackend.Seed = {
            supplierName: formData.get('supplierName') as string,
            variety: formData.get('seedVariety') as string,
            dateAcquired: formData.get('dateOfAcquisition') as string,
            quantityAcquired: parseInt(formData.get('quantity') as string),
            quantityLeft: parseInt(formData.get('quantity') as string),
            priceBoughtAt: parseFloat(formData.get('price') as string),
            inventoryId: 'IGPINV',
            id: formData.get('SeedId') as string
        };
        InventoryBackend.addSeed(dispatch, Seed);
        break;
        case 'products':
        const HarvestProduct : InventoryBackend.HarvestedProduct = {
            productId: selectedProductId,
            quantityHarvested: formData.get('productQuantity') as unknown as number,
            quantityLeft: formData.get('productQuantity') as unknown as number,
            packaging: formData.get('packageSize') as string,
            dateOfHarvest: formData.get('dateOfHarvest') as string,
            inventoryId: 'IGPINV'
        };
        InventoryBackend.addHarvestedProduct(dispatch, HarvestProduct);
        break;
        case 'misc':
        const MiscProduct : InventoryBackend.MiscProduct = {
            type: formData.get('miscProduct') as 'FERTILIZER' | 'SOIL' | 'GROWINGMATERIAL' | 'PACKINGMATERIAL',
            quantity: parseInt(formData.get('miscQuantity') as string),
            price: parseFloat(formData.get('price') as string),
            description: formData.get('miscDescription') as string,
            quantityLeft: parseInt(formData.get('miscQuantity') as string),
            dateAcquired: formData.get('miscDate') as string,
            inventoryId: 'IGPINV',
            supplierName: formData.get('miscSupplier') as string
        };
        InventoryBackend.addMiscProduct(dispatch, MiscProduct);
        break;
    }



       
        onClose();
    };
    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const productId = e.target.value;
        setSelectedProductId(productId);
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
                    <label htmlFor="SeedId" className='flex flex-row gap-2 items-center justify-between'>ID
                    <input type="text" id="SeedId" name="SeedId" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    </label>
                    <label htmlFor='Price' className='flex flex-row gap-2 items-center justify-between'>Price
                    <input type="number" id="price" name="price" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    </label>
                    <button type="submit" className=' bg-green-800 p-2 px-4 text-white rounded-md w-min items-center self-center'>Submit</button>
                    </form>}

                {products&& <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5 h-full justify-between'>
                    <label htmlFor="productId" className='flex flex-row gap-2 items-center justify-between'>Product ID
                    <select id="productId" name="productId"  onChange={handleProductChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="">Select a product</option>
        {productList.map(product => (
          <option key={product.id} value={product.id}>{product.id + ' '+ product.name + ' '+ (product.type === "powders" ? product.type : "")}</option>
        ))}
      </select>
                    </label>
                    
                    <label htmlFor="productQuantity" className='flex flex-row gap-2 items-center justify-between'>Quantity
                        <input type="number" id="productQuantity" name="productQuantity" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    <label htmlFor="packageSize" className='flex flex-row gap-2 items-center justify-between'>Package Size
                        <select id="packageSize" name="packageSize" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                            {productList.map(product => (
                                product.id === selectedProductId &&
                                product.packagingSizes.map(pkg => (
                                    <option key={pkg} value={pkg? pkg : ""}>{pkg==="50" ? "50g" : pkg=== "453" ? "1 lb" : pkg==="20" ? "Sample Size" : pkg==="113" ? "16oz Container" : "24oz Container"}</option>
                                ))
                            ))}
                        </select>
                    </label>
                    <label htmlFor="dateOfHarvest" className='flex flex-row gap-2 items-center justify-between'>Date of Harvest
                    <input type="date" id="dateOfHarvest" name="dateOfHarvest" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    </label>
                    <button type="submit" className=' bg-green-800 p-2 px-4 text-white rounded-md w-min items-center self-center'>Submit</button>
                    </form>}

                {misc&& <form onSubmit={handleSubmit} className='flex flex-col gap-4 h-full justify-between p-5'>
                    <label htmlFor="miscProduct" className='flex flex-row gap-2 items-center justify-between'>Misc Product
                        <label htmlFor='miscFertilizer' className='flex flex-row gap-2'><input type='radio' id='miscFertilizer' name='miscProduct' value='FERTILIZER' />Fertilizer</label>
                        <label htmlFor='miscSoil' className='flex flex-row gap-2'><input type='radio' id='miscSoil' name='miscProduct' value='SOIL' />Soil</label>
                        <label htmlFor='miscGrowing' className='flex flex-row gap-2'><input type='radio' id='miscGrowing' name='miscProduct' value='GROWINGMATERIAL' />Growing Materials</label>
                        <label htmlFor='PackingMaterial' className='flex flex-row gap-2'><input type='radio' id='miscPackingMaterial' name='miscProduct' value='PACKINGMATERIAL' />Packing Material</label>
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
                    <label htmlFor='Price' className='flex flex-row gap-2 items-center justify-between'>Price
                    <input type="number" id="price" name="price" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    </label>
                    <button type="submit" className=' bg-green-800 p-2 px-4 text-white rounded-md w-min items-center self-center'>Submit</button>
                    </form>}
            </div>
        </div>
    );
};

export default AddForm;