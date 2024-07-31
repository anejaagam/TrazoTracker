import type {Schema} from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

const client = generateClient<Schema>({authMode: 'userPool'});
const packSizes = ["50", "453", "113", "227", "20","150"] as const;
const packSizesPowder = ["50", "150", "20"] as const;
const soldToEnum = ["FOODSERVICE", "RETAIL"] as const;
const powderSoldToEnum = ["RETAIL"] as const;

type PackSize = typeof packSizes[number];
type PackSizePowder = typeof packSizesPowder[number];
type SoldTo = typeof soldToEnum[number];
type PowderSoldTo = typeof powderSoldToEnum[number];

type Packing = {
    [key in SoldTo]?: number | string;
};
type PackingPowder = {
    [key in SoldTo]?: number | string;
};
  
export interface ProductList {
    id: string;
    type: string;
    name: string;
    packing: {
      [key in PackSize]?: Packing;
    };
  }
export interface ProductListPowder {
    id: string;
  type: string;
  name: string;
  packing: {
    [key in PackSizePowder]?: PackingPowder;
  };
}


export interface Product {
    id: string;
    type: string;
    name: string;
    packagingSizes: (string | null)[];
}
export interface Price {
    productId: string;
    soldTo: "FOODSERVICE" | "RETAIL" | null | undefined;
    packagingSize: string;
    price: number;
}

export const sendProduct = async (product: Product) => {
    const {data, errors} =
    await client.models.Product.create(
        product
    );
    return {data, errors};
}

export const sendPriceList = async (price: Price) => {
    const {data, errors} =
    await client.models.Prices.create(
        price
    );
     return {data, errors};

}

export const makeProduct =  (id:string, type:string, name: string, packings: string[]) => {
    const productData: Product = {
        type,
        id,
        name,
        packagingSizes: packings,
    }
    return productData;
}

export const makePrice = ( productId: string, soldTo: "FOODSERVICE" | "RETAIL" | null | undefined, packagingSize: string, price: number) => {
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

export const getPricesforProduct = async (productId: string) => {
    try {
        const { data, errors } = await client.models.Prices.productPricesByProductId({ productId });
        if (errors) {
          console.error(errors);
          return [];
        }
        const prices = data || [];
        const isPowder = prices.some(price => packSizesPowder.includes(price.packagingSize as "50" | "150" | "20"));
    
        if (isPowder) {
          const packing: PackingPowder[] = packSizesPowder.map(size => {
            const sizePrices: PackingPowder = { RETAIL: "No" };
            prices.forEach(price => {
              if (price.packagingSize === size) {
                sizePrices[price.soldTo as PowderSoldTo] = price.price;
              }
            });
            return sizePrices;
          });
          return packing;
        } else {
          const packing: Packing[] = packSizes.map(size => {
            const sizePrices: Packing = { FOODSERVICE: "No", RETAIL: "No" };
            prices.forEach(price => {
              if (price.packagingSize === size) {
                sizePrices[price.soldTo as SoldTo] = price.price;
              }
            });
            return sizePrices;
          });
          return packing;
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getFullProductPriceList = async () => {

        try {
            const { data, errors } = await client.models.Product.list();
            if (errors) {
              console.error(errors);
              return [];
            }
            const products = data || [];
            const productList = await Promise.all(products.map(async (product) => {
              const packingPrices = await getPricesforProduct(product.id);
              if (product.type === 'powder') {
                const packing = packSizesPowder.reduce((acc, size, index) => {
                  acc[size] = packingPrices[index] as PackingPowder;
                  return acc;
                }, {} as { [key in PackSizePowder]?: PackingPowder });
                return {
                  id: product.id,
                  type: product.type,
                  name: product.name,
                  packing
                } as ProductListPowder;
              } else {
                const packing = packSizes.reduce((acc, size, index) => {
                  acc[size] = packingPrices[index] as Packing;
                  return acc;
                }, {} as { [key in PackSize]?: Packing });
                return {
                  id: product.id,
                  type: product.type,
                  name: product.name,
                  packing
                } as ProductList;
              }
            }));

        return productList;
    }
    catch (error) {
        console.error(error);
    }
}

export const getAllProducts = async () => {
    const { data, errors } = await client.models.Product.list();
    if (errors) {
        console.error(errors);
        return [];
    }
    const products: Product[] = (data || []).map((product: Product) => ({
      id: product.id,
      type: product.type,
      name: product.name,
      packagingSizes: product.packagingSizes
    }));
    return products;
}