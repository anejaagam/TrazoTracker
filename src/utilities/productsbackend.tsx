import type {Schema} from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

const client = generateClient<Schema>()
export interface Product {
    id: string;
    name: string;
    packagingSizes: string[];
    
}
export interface Price {
    productId: string;
    soldTo: "FoodServices" | "Retail" | null | undefined;
    packagingSize: string;
    price: number;
}
export const sendProduct = async (product: Product) => {
    
    await client.models.Product.create(
        product
    );
}

export const sendPriceList = async (price: Price) => {
    await client.models.Prices.create(
        price
    );
}

export const makeProduct =  (id:string, name: string, packings: string[]) => {
    const productData: Product = {
        id,
        name,
        packagingSizes: packings,
    }
    return productData;
}

export const makePrice = ( productId: string, soldTo: "FoodServices" | "Retail" | null | undefined, packagingSize: string, price: number) => {
    const priceData: Price = {
        productId,
        soldTo,
        packagingSize,
        price
    }
    return priceData;
}

export const getProductById = async (id: any): Promise<Product | null> => {
    try {
      const product: any = await client.models.Product.get(id);
      return product;
    } catch (error: any) {
      if (error.name === 'NotFound') {
        console.warn(`Product with ID ${id} not found.`);
        return null;
      }
      console.error(`Error retrieving product with ID ${id}:`, error);
      throw error;
    }
  };

