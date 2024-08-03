import React from 'react';
import { HarvestedProduct, MiscProduct, Seed, DeleteItem, UpdateItem } from '../utilities/inventoryBackend';
import {useTrazoBackendContext} from '../utilities/trazoBackend';
import { Product } from 'aws-cdk-lib/aws-servicecatalog';

interface ItemProps {
    onClose: () => void;
    seeds?: boolean;
    products?: boolean;
    misc?: boolean;
    ProductItem?: HarvestedProduct;
    SeedItem?: Seed;
    MiscItem?: MiscProduct
}



const ItemModal: React.FC<ItemProps> = ({ onClose, seeds, products, misc, ProductItem, SeedItem, MiscItem }) => {
    const {state, dispatch} = useTrazoBackendContext();
    const [powder, setPowder] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    
    const handleDelete = async (id: string, type: string) => {
        await DeleteItem(dispatch, id, type);
        setEdit(false);
        onClose();
    };

    const handleUpdate = async(id:string, type: string, seed?: Seed, product?: HarvestedProduct, misc?: MiscProduct) => {
        await UpdateItem(dispatch,id, type, seed, product, misc);
        window.location.reload();
        setEdit(false);
        onClose();
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const activeType = seeds ? 'SEED' : products ? 'HARVESTEDPRODUCT' : misc ? 'MISCPRODUCT' : '';
        switch (activeType) {
            case 'SEED':
                const Seed : Seed = {
                    supplierName: formData.get('supplierName') as string,
                    variety: formData.get('seedVariety') as string,
                    dateAcquired: formData.get('dateOfAcquisition') as string,
                    quantityAcquired: parseInt(formData.get('quantity') as string),
                    inventoryId: 'IGPINV',
                    id: formData.get('SeedId') as string,
                    quantityLeft: parseInt(formData.get('quantityLeft') as string),
                    priceBoughtAt: parseInt(formData.get('price') as string)
                };
                await handleUpdate(SeedItem?.id || '', activeType, Seed);
                break;
                case 'HARVESTEDPRODUCT':
                    const HarvestProduct : HarvestedProduct = {
                        productId: ProductItem?.productId || '',
                        quantityHarvested: parseInt(formData.get('productQuantity') as string),
                        quantityLeft: ProductItem?.quantityLeft || 0,
                        packaging: formData.get('packageSize') as string,
                        dateOfHarvest: formData.get('dateOfHarvest') as string,
                        inventoryId: 'IGPINV',
                    };
                    await handleUpdate(ProductItem?.id || "", activeType, undefined, HarvestProduct);
                    break;
                case 'MISCPRODUCT':
                    const MiscProduct : MiscProduct = {
                        type: formData.get('miscProduct') as "FERTILIZER" | "SOIL" | "GROWINGMATERIAL" | "PACKINGMATERIAL",
                        quantity: parseInt(formData.get('miscQuantity') as string),
                        price: parseFloat(formData.get('price') as string),
                        description: formData.get('miscDescription') as string,
                        quantityLeft: parseInt(formData.get('miscQuantityLeft') as string),
                        dateAcquired: formData.get('miscDate') as string,
                        inventoryId: 'IGPINV',
                        id: MiscItem?.id || '',
                        supplierName: formData.get('miscSupplier') as string
                    };
                    await handleUpdate(MiscProduct?.id || "", activeType, undefined, undefined, MiscProduct);
            }
        onClose();
    };

   

    return (
        <div className="modal fixed inset-10 flex justify-center items-center bg-black bg-opacity-0 mb-12 rounded">
            <div className="modal-content bg-white w-1/2 h-full shadow-lg relative flex flex-none flex-col rounded-md gap-4">
                <div className="flex flex-row w-full p-5 gap-4 bg-green-900 text-white justify-between rounded-t-md">
                    <h2 className='text-lg font-semibold'>Inventory Item</h2>
                    <button onClick={onClose} className='text-white justify-end flex text-xl font-black'>X</button>
                </div>

                {seeds && <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5 justify-between h-full'>
                    <label htmlFor="supplierName" className='flex flex-row gap-2 items-center justify-between'>Supplier Name
                        <input disabled={!edit} defaultValue={SeedItem?.supplierName} type="text" id="supplierName" name="supplierName" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='' />
                    </label>
                    <label htmlFor="seedVariety" className='flex flex-row gap-2 items-center justify-between'>Seed Variety
                        <input disabled={!edit} defaultValue={SeedItem?.variety} type="text" id="seedVariety" name="seedVariety" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='' />
                    </label>
                    <label htmlFor="dateOfAcquisition" className='flex flex-row gap-2 items-center justify-between'>Date of Acquisition
                        <input disabled={!edit} defaultValue={SeedItem?.dateAcquired} type="date" id="dateOfAcquisition" name="dateOfAcquisition" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    <label htmlFor="quantity" className='flex flex-row gap-2 items-center justify-between'>Quantity
                        <input disabled={!edit} defaultValue={SeedItem?.quantityAcquired} type="number" id="quantity" name="quantity" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    <label htmlFor="quantityLeft" className='flex flex-row gap-2 items-center justify-between'>Quantity Left
                        <input disabled={!edit} type="number" defaultValue={SeedItem?.quantityLeft} id="quantityLeft" name="quantityLeft" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    <label htmlFor="id" className='flex flex-row gap-2 items-center justify-between'>ID
                        <input disabled type="text" id="id" name="id" defaultValue={SeedItem?.id} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    <label htmlFor='Price' className='flex flex-row gap-2 items-center justify-between'>Price
                    <input type="number" defaultValue={SeedItem?.priceBoughtAt} id="price" name="price" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    </label>
                    <div className="flex flex-row gap-2">
                        <button style={!edit ? { display: 'none' } : { display: 'block' }} type="submit" className=' bg-yellow-500 p-2 px-4 text-white rounded-md w-min items-center self-center'>Update</button>
                        <button style={!edit ? { display: 'none' } : { display: 'block' }} type="button" className=' bg-red-800 p-2 px-4 text-white rounded-md w-min items-start self-start' onClick={()=>{handleDelete(SeedItem?.id || "", "SEED")}}>Delete</button>
                        <button className=' bg-red-800 p-2 px-4 text-white rounded-md w-min items-start self-start disabled:bg-slate-400' onClick={() => setEdit(true)} type='reset' disabled={edit}>Edit</button>
                    </div>
                </form>}

                {products && <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5 h-full justify-between'>
                    <label htmlFor="productId" className='flex flex-row gap-2 items-center justify-between'>Product ID
                        <input disabled type="text" id="productId" name="productId" defaultValue={ProductItem?.productId} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>

                    <label htmlFor="productQuantity" className='flex flex-row gap-2 items-center justify-between'>Quantity
                        <input disabled={!edit} type="number" id="productQuantity" name="productQuantity" defaultValue={ProductItem?.quantityHarvested} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    <label htmlFor="productQuantityLeft" className='flex flex-row gap-2 items-center justify-between'>Quantity Left
                        <input disabled={!edit} type="number" id="productQuantityLeft" name="productQuantityLeft" defaultValue={ProductItem?.quantityLeft} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    {!powder && <label htmlFor="packageSize" className='flex flex-row gap-2 items-center justify-between'>Package Size
                        <select disabled={!edit} defaultValue={ProductItem?.packaging} id="packageSize" name="packageSize" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                            <option defaultValue="50">50 Grams</option>
                            <option defaultValue="453">1 lb</option>
                            <option defaultValue="113">4oz Container</option>
                            <option defaultValue="450">450 Grams</option>
                            <option defaultValue="20">Sample Size</option>
                        </select>
                    </label>}
                    <label htmlFor="dateOfHarvest" className='flex flex-row gap-2 items-center justify-between'>Date of Harvest
                        <input disabled={!edit} defaultValue={ProductItem?.dateOfHarvest} type="date" id="dateOfHarvest" name="dateOfHarvest" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    <div className="flex flex-row gap-2">
                        <button style={!edit ? { display: 'none' } : { display: 'block' }} type="submit" className=' bg-yellow-500 p-2 px-4 text-white rounded-md w-min items-center self-center'>Update</button>
                        <button style={!edit ? { display: 'none' } : { display: 'block' }} type="button" className=' bg-red-800 p-2 px-4 text-white rounded-md w-min items-start self-start' onClick={() => handleDelete(ProductItem?.id || " ", "HARVESTEDPRODUCT")}>Delete</button>
                        <button className=' bg-red-800 p-2 px-4 text-white rounded-md w-min items-start self-start disabled:bg-slate-400' onClick={() => setEdit(true)} type='reset' disabled={edit}>Edit</button>
                    </div>
                </form>}

                {misc && <form onSubmit={handleSubmit} className='flex flex-col gap-4 h-full justify-between p-5'>
                <label htmlFor="miscProduct"  className='flex flex-row gap-2 items-center justify-between'>Misc Product
                        <label htmlFor='miscFertilizer' className='flex flex-row gap-2'><input disabled type='radio' id='miscFertilizer' name='miscProduct' defaultChecked={MiscItem?.type === "FERTILIZER"} value={"FERTILIZER"} />Fertilizer</label>
                        <label htmlFor='miscSoil' className='flex flex-row gap-2'><input disabled type='radio' id='miscSoil' name='miscProduct' defaultChecked={MiscItem?.type === "SOIL"} value={"SOIL"} />Soil</label>
                        <label htmlFor='miscGrowing' className='flex flex-row gap-2'><input disabled type='radio' id='miscGrowing' name='miscProduct'  defaultChecked={MiscItem?.type === "GROWINGMATERIAL"} value={"GROWINGMATERIAL"} />Growing Materials</label>
                        <label htmlFor='PackingMaterial' className='flex flex-row gap-2'><input disabled type='radio' id='miscPackingMaterial' name='miscProduct'  defaultChecked={MiscItem?.type === "PACKINGMATERIAL"} value={"PACKINGMATERIAL"} />Packing Material</label>
                    </label>
                    <label htmlFor="miscSupplier" className='flex flex-row gap-2 items-center justify-between'>Supplier
                        <input disabled={!edit}defaultValue={MiscItem?.supplierName} type="text" id="miscSupplier" name="miscSupplier" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    <label htmlFor="miscQuantity" className='flex flex-row gap-2 items-center justify-between'>Quantity
                        <input disabled={!edit} defaultValue={MiscItem?.quantity} type="number" id="miscQuantity" name="miscQuantity" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    <label htmlFor="miscQuantityLeft" className='flex flex-row gap-2 items-center justify-between'>Quantity Left
                        <input disabled={!edit} type="number" defaultValue={MiscItem?.quantityLeft} id="miscQuantityLeft" name="miscQuantityLeft" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    <label htmlFor="miscDescription" className='flex flex-row gap-2 items-center justify-between'>Description
                        <textarea disabled={!edit} defaultValue={MiscItem?.description} id="miscDescription" name="miscDescription" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    <label htmlFor="miscDate" className='flex flex-row gap-2 items-center justify-between'>Date of Purchase
                        <input disabled={!edit} defaultValue={MiscItem?.dateAcquired} type="date" id="miscDate" name="miscDate" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </label>
                    <div className="flex flex-row gap-2">
                        <button style={!edit ? { display: 'none' } : { display: 'block' }} type="submit" className=' bg-yellow-500 p-2 px-4 text-white rounded-md w-min items-center self-center'>Update</button>
                        <button style={!edit ? { display: 'none' } : { display: 'block' }} type="button" className=' bg-red-800 p-2 px-4 text-white rounded-md w-min items-start self-start' onClick={()=>{handleDelete(MiscItem?.id || "", "MISCPRODUCT")}} >Delete</button>
                        <button className=' bg-red-800 p-2 px-4 text-white rounded-md w-min items-start self-start disabled:bg-slate-400' onClick={() => setEdit(true)} type='reset' disabled={edit}>Edit</button>
                    </div>

                </form>}


            </div>
        </div>
    );
};

export default ItemModal;