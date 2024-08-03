import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import { getAllProducts, Product } from './productsbackend';
import { getInventoryid, getInventoryList, Inventory } from './inventoryBackend';

// Define types for state and actions
type State = {
  productList: (Product)[];
  productsLoaded: boolean;
  inventoryList: Inventory; 
  inventoriesLoaded: boolean;
  inventoryId: string ;
};

export type Action =
  | { type: 'SET_PRODUCT_LIST'; payload: (Product )[] }
  | { type: 'SET_PRODUCTS_LOADED'; payload: boolean }
  | { type: 'SET_INVENTORY_LIST'; payload: Inventory }
  | { type: 'SET_INVENTORIES_LOADED'; payload: boolean }
  | { type: 'SET_INVENTORY_ID'; payload: string };

const initialState: State = {
  productList: [],
  productsLoaded: false,
  inventoryList: {seeds: [], harvestedProducts: [], miscProducts: []},
  inventoriesLoaded: false,
  inventoryId: 'IGPINV',
};

const TrazoBackendContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null,
});

const trazoBackendReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PRODUCT_LIST':
      return { ...state, productList: action.payload };
      case 'SET_PRODUCTS_LOADED':
      return { ...state, productsLoaded: action.payload };
      case 'SET_INVENTORY_LIST':
      return { ...state, inventoryList: action.payload };
      case 'SET_INVENTORIES_LOADED':
      return { ...state, inventoriesLoaded: action.payload };
      case 'SET_INVENTORY_ID':
      return { ...state, inventoryId: action.payload };
    default:
      return state;
  }
};

// Provider component
export const TrazoBackendProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(trazoBackendReducer, initialState);

  useEffect(() => {
    if (!state.productsLoaded) {
        const fetchProductList = async () => {
          const products = await getAllProducts();
          dispatch({ type: 'SET_PRODUCT_LIST', payload: products });
          dispatch({ type: 'SET_PRODUCTS_LOADED', payload: true });
        };
        fetchProductList();
    }
  }, [state.productsLoaded]);
  useEffect(() => {
    const fetchInventoryId = async () => {
      const id = await getInventoryid();
      dispatch({ type: 'SET_INVENTORY_ID', payload: id || 'IGPINV' });
    };
    fetchInventoryId();
    const fetchInventoryList = async () => {
      const inventory = await getInventoryList(); // Define this function to fetch inventory
      console.log(inventory);
      dispatch({ type: 'SET_INVENTORY_LIST', payload: inventory || {seeds: [], harvestedProducts: [], miscProducts: []} });
      dispatch({ type: 'SET_INVENTORIES_LOADED', payload: true });
    };
    fetchInventoryList();
  }, []);

  return (
    <TrazoBackendContext.Provider value={{ state, dispatch }}>
      {children}
    </TrazoBackendContext.Provider>
  );
};

// Custom hook to use the TrazoBackend context
export const useTrazoBackendContext = () => useContext(TrazoBackendContext);
