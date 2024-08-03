import type {Schema} from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
import {Action} from './trazoBackend'

const client = generateClient<Schema>({authMode: 'userPool'});

export interface HarvestedProduct {
    id?: string;
    productId: string;
    quantityHarvested: number;
    packaging: string;
    quantityLeft: number;
    dateOfHarvest: string;
    inventoryId: string;
}

export interface Seed{
    id: string;
    supplierName: string;
    variety: string;
    quantityAcquired: number;
    quantityLeft: number;
    priceBoughtAt: number;
    dateAcquired: string;
    inventoryId: string;
}

export interface MiscProduct{
    id?: string;
    type: 'FERTILIZER' | 'SOIL' | 'GROWINGMATERIAL' | 'PACKINGMATERIAL'| null | undefined;
    quantity: number;
    price: number;
    description: string;
    quantityLeft: number;
    inventoryId: string;
    dateAcquired: string;
    supplierName: string;
}

export interface Inventory{
    seeds: Seed[];
    harvestedProducts: HarvestedProduct[];
    miscProducts: MiscProduct[];
}

export const getInventoryid = async () => {
    const {data, errors} =
    await client.models.Inventory.list();
    if (errors) {
        console.error(errors);
        return null;
    }
    if (data.length === 0) {
        createInventory('IGPINV');
    }
    return data[0].id;

}
export const createInventory = async (id: string) => {
    const {data, errors} =
    await client.models.Inventory.create(
        {id: id}
    );
     return {data, errors};

}
export const sendSeed = async (seed: Seed) => {
    const {data, errors} =
    await client.models.Seed.create(
        seed
    );
     return {data, errors};

}
export const sendHarvestedProduct = async (product: HarvestedProduct) => {
    const {data, errors} =
    await client.models.HarvestedProduct.create(
        product
    );
    console.log(data, errors);
     return {data, errors};

}

export const sendMiscProduct = async (product: MiscProduct) => {
    const {data, errors} =
    await client.models.MiscProduct.create(
        product
    );
    console.log(data, errors);
     return {data, errors};

}
export const getInventoryList = async () => {
    const {data : inventory, errors} =
    await client.models.Inventory.get({id: 'IGPINV'}, {selectionSet:['id','products.*','seeds.*','misc.*']});
    if (errors) {
        console.error(errors);
        return null;
    }
    const inventoryList = {
        seeds: inventory?.seeds || [],
        harvestedProducts: inventory?.products || [],
        miscProducts: inventory?.misc || [],
    }
    return  inventoryList;
    
}


export const UpdateItem = async (dispatch: React.Dispatch<Action>,id: string, type: string, seed?: Seed, product?:HarvestedProduct, mic?:MiscProduct) => {
    if (type === 'SEED') {
        const {data, errors} =
        await client.models.Seed.update(
            {id: id, 
                quantityLeft: seed?.quantityLeft,
                priceBoughtAt: seed?.priceBoughtAt,
                dateAcquired: seed?.dateAcquired,
                supplierName: seed?.supplierName,
                variety: seed?.variety,
                quantityAcquired: seed?.quantityAcquired
            }
        );
        console.log(data, errors);
         return {data, errors};
    } else if (type === 'HARVESTEDPRODUCT') {
        const {data, errors} =
        await client.models.HarvestedProduct.update(
            {id: id,
                quantityHarvested: product?.quantityHarvested,
                packaging: product?.packaging,
                dateOfHarvest: product?.dateOfHarvest,
                quantityLeft: product?.quantityLeft,
            }
        );
        console.log(data, errors);
         return {data, errors};
    }else if (type === 'MISCPRODUCT') {
        const {data, errors} =
        await client.models.MiscProduct.update(
            {id: id, 
                type: mic?.type,
                quantity: mic?.quantity,
                price: mic?.price,
                description: mic?.description,
                quantityLeft: mic?.quantityLeft,
                dateAcquired: mic?.dateAcquired,
                supplierName: mic?.supplierName,}
        );
         return {data, errors};
    }
    const inventoryId = await getInventoryid();
    const inventory = await getInventoryList(); // Define this function to fetch inventory
    dispatch({ type: 'SET_INVENTORY_LIST', payload: inventory || {seeds: [], harvestedProducts: [], miscProducts: []} });
    dispatch({ type: 'SET_INVENTORIES_LOADED', payload: true });
    dispatch({ type: 'SET_INVENTORY_ID', payload: inventoryId || 'IGPINV' });
    
}

export const DeleteItem = async (dispatch: React.Dispatch<Action>, id: string, type: string) => {
    if (type === 'SEED') {
        await client.models.Seed.delete({id: id});
    } else if (type === 'HARVESTEDPRODUCT') {
        await client.models.HarvestedProduct.delete({id: id});
    }else if (type === 'MISCPRODUCT') {
        await client.models.MiscProduct.delete({id: id});
    }
    const inventoryId = await getInventoryid();
    const inventory = await getInventoryList(); // Define this function to fetch inventory
    dispatch({ type: 'SET_INVENTORY_LIST', payload: inventory || {seeds: [], harvestedProducts: [], miscProducts: []} });
    dispatch({ type: 'SET_INVENTORIES_LOADED', payload: true });
    dispatch({ type: 'SET_INVENTORY_ID', payload: inventoryId || 'IGPINV' });
  }

export const addSeed = async (dispatch: React.Dispatch<Action>, seed: Seed) => {
    await sendSeed(seed);
    const inventoryId = await getInventoryid();
    const inventory = await getInventoryList(); // Define this function to fetch inventory
    dispatch({ type: 'SET_INVENTORY_LIST', payload: inventory || {seeds: [], harvestedProducts: [], miscProducts: []} });
    dispatch({ type: 'SET_INVENTORIES_LOADED', payload: true });
    dispatch({ type: 'SET_INVENTORY_ID', payload: inventoryId || 'IGPINV' });
  };
  
  export const addHarvestedProduct = async (dispatch: React.Dispatch<Action>, product: HarvestedProduct) => {
    await sendHarvestedProduct(product);
    const inventoryId = await getInventoryid();
    const inventory = await getInventoryList(); // Define this function to fetch inventory
    dispatch({ type: 'SET_INVENTORY_LIST', payload: inventory || {seeds: [], harvestedProducts: [], miscProducts: []} });
    dispatch({ type: 'SET_INVENTORIES_LOADED', payload: true });
    dispatch({ type: 'SET_INVENTORY_ID', payload: inventoryId || 'IGPINV' });
  };
  
  export const addMiscProduct = async (dispatch: React.Dispatch<Action>, product: MiscProduct) => {
    await sendMiscProduct(product);
    const inventoryId = await getInventoryid();
    const inventory = await getInventoryList(); // Define this function to fetch inventory
    dispatch({ type: 'SET_INVENTORY_LIST', payload: inventory || {seeds: [], harvestedProducts: [], miscProducts: []} });
    dispatch({ type: 'SET_INVENTORIES_LOADED', payload: true });
    dispatch({ type: 'SET_INVENTORY_ID', payload: inventoryId || 'IGPINV' });
  };
  