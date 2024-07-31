import type {Schema} from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
import {Action} from './trazoBackend'

const client = generateClient<Schema>({authMode: 'userPool'});

export interface HarvestedProduct {
    productId: string;
    quantityHarvested: number;
    packaging: string;
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
    type: 'FERTILIZER' | 'SOIL' | 'GROWINGMATERIAL' | 'PACKINGMATERIAL'| null | undefined;
    quantity: number;
    price: number;
    description: string;
    quantityLeft: number;
    inventoryId: string;
    dateAcquired: string;
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
     return {data, errors};

}

export const sendMiscProduct = async (product: MiscProduct) => {
    const {data, errors} =
    await client.models.MiscProduct.create(
        product
    );
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
  