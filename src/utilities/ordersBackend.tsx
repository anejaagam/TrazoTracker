import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
import { Action , useTrazoBackendContext} from './trazoBackend'

const client = generateClient<Schema>({ authMode: 'userPool' });

export interface Customer {
    id?: string;
    brand: string;
    locationName: string;
    contactName: string;
    contactNumber: string;
    contactEmail: string;
    deliveryMethods: string[];
    deliveryAddress: string;
    customerType: "FOODSERVICE" | "RETAIL";
    notes: string;
}

export interface Order {
    id?: string;
    customerId: string;
    productId: string;
    quantity: any;
    price: any;
    packagingSize: string;
    status: "PRE" | "GROWING" | "HARVESTED" | "DELIVERED";
    orderDate: string;
    deliveryDate: string;
    deliverMethod: "DIRECT" | "GFS" | "OTHER";
    notes: string;
}
export interface Delivery {
    id?: string;
    orders: string[];
    deliveryDate: string;
    deliveryMethod: "DIRECT" | "GFS" | "OTHER";
    customerId: string;
    notes: string;
}

export const createCustomer = async (dispatch: React.Dispatch<Action>, customer: Customer) => {
    if (!customer.id){
        customer.id = "IGPC"+ customer.brand.substring(0,3).toUpperCase()+ customer.locationName.substring(0,3).toUpperCase() ;
    }
    await client.models.Customer.create(customer);
    dispatch({type:"SET_CUSTOMERS_LOADED", payload: false});

}
export const createOrder = async (dispatch: React.Dispatch<Action>, order: Order) => {
    const { data: data1, errors: errors1 } = await client.models.Order.create(order);
    console.log(errors1);
    const { data, errors } = await client.models.Delivery.deliveryByCustomerId({
        customerId: order.customerId,
        deliveryDate: {
            eq: order.deliveryDate
        },
    });
    if (data.length === 0) {
        await client.models.Delivery.create({
            orders: [data1?.id || " "],
            deliveryDate: order.deliveryDate,
            deliveryMethod: order.deliverMethod,
            customerId: order.customerId,
            notes: order.notes
        });
    } else {
        const existingDelivery = data[0];
      const updatedOrders = existingDelivery.orders ? [...existingDelivery.orders, data1?.id || ""] : [data1?.id || ""];
      
        await client.models.Delivery.update({
            id: data[0].id,
            orders: updatedOrders
        });
    }
    dispatch({type:"SET_ORDERS_LOADED", payload: false});
    dispatch({type:"SET_DELIVERIES_LOADED", payload: false});
}

export const updateOrder = async (dispatch: React.Dispatch<Action>, order: Order) => {
    if (order.id) {
        const { data: oldData, errors } = await client.models.Order.get({ id: order.id });
        const customerId = oldData?.customerId || " ";
        const olddeliveryDate = oldData?.deliveryDate || "";
        if (olddeliveryDate !== order.deliveryDate) {
            const { data, errors } = await client.models.Delivery.deliveryByCustomerId({
                customerId: customerId,
                deliveryDate: {
                    eq: olddeliveryDate
                },
            });
            if (data.length !== 0) {
                await client.models.Delivery.update({
                    id: data[0].id,
                    orders: data[0]?.orders ? data[0].orders.filter((id) => id !== order.id) : []
                });

            }
            const { data: newData, errors: newErrors } = await client.models.Delivery.deliveryByCustomerId({
                customerId: customerId,
                deliveryDate: {
                    eq: order.deliveryDate
                },
            });
            if (newData.length === 0) {
                await client.models.Delivery.create({
                    orders: [order?.id || " "],
                    deliveryDate: order.deliveryDate,
                    deliveryMethod: order.deliverMethod,
                    customerId: order.customerId,
                    notes: order.notes
                });
            } else {
                await client.models.Delivery.update({
                    id: newData[0].id,
                    orders: newData[0]?.orders ? [...newData[0].orders, order.id || ""] : [order.id || ""]
                });
            }

            await client.models.Order.update({
                id: order.id,
                ...order
            });
        }
    }
    dispatch({type:"SET_ORDERS_LOADED", payload: false});
 
   
    dispatch({type:"SET_DELIVERIES_LOADED", payload: false});
}

export const deleteOrder = async (dispatch: React.Dispatch<Action>, order: Order) => {
    if (order.id) {
        const { data: oldData, errors } = await client.models.Order.get({ id: order.id });
        const customerId = oldData?.customerId || " ";
        const olddeliveryDate = oldData?.deliveryDate || "";
        const { data, errors: err } = await client.models.Delivery.deliveryByCustomerId({
            customerId: customerId,
            deliveryDate: {
                eq: olddeliveryDate
            },
        });
        if (data.length !== 0) {
            await client.models.Delivery.update({
                id: data[0].id,
                orders: data[0]?.orders ? data[0].orders.filter((id) => id !== order.id) : []
            });

        }
        await client.models.Order.delete({ id: order.id });
    }
    dispatch({type:"SET_ORDERS_LOADED", payload: false});
   
    dispatch({type:"SET_DELIVERIES_LOADED", payload: false});
}

export const getCustomer = async (id: string) => {
    const { data, errors } = await client.models.Customer.get({ id });
    return data;
}
export const getOrder = async (id: string) => {
    const { data, errors } = await client.models.Order.get({ id });
    return data;
}
export const getOrdersByCustomerId = async (customerId: string) => {
    const { data, errors } = await client.models.Order.ordersByCustomerId({
        customerId: customerId,
    });
    return data;
}
export const getDeliveriesByDeliveryDate = async (deliveryDate: string) => {
    const { data, errors } = await client.models.Delivery.deliveryByDeliveryDate({
        deliveryDate:  deliveryDate
        
    });
    return data;
}
export const getDeliveries = async () => {
    const { data, errors } = await client.models.Delivery.list();
    const DeliveryList: Delivery[] = data.map((data) => {
        return {
            id: data.id,
            orders: data.orders,
            deliveryDate: data.deliveryDate,
            deliveryMethod: data.deliveryMethod,
            customerId: data.customerId,
            notes: data.notes
        } as Delivery; // Type assertion to Delivery
    });
    return DeliveryList;
}
export const getCustomerList = async () => {
    const { data, errors } = await client.models.Customer.list();
    const customerList: Customer[] = data.map((data) => {
        return {
            id: data.id,
            brand: data.brand,
            locationName: data.locationName,
            contactName: data.contactName,
            contactNumber: data.contactNumber,
            contactEmail: data.contactEmail,
            deliveryMethods: data.deliveryMethods ?? [], // Ensure it's an array
            deliveryAddress: data.deliveryAddress,
            customerType: data.customerType,
            notes: data.notes
        } as Customer; // Type assertion to Customer
    });
        

    return customerList;
}
export const getOrderList = async () => {
    const { data, errors } = await client.models.Order.list();
    const OrderList: Order[] = data.map((data) => {
        return {
            id: data.id,
            customerId: data.customerId,
            productId: data.productId,
            quantity: data.quantity,
            price: data.price,
            packagingSize: data.packagingSize,
            status: data.status,
            orderDate: data.orderDate,
            deliveryDate: data.deliveryDate,
            deliverMethod: data.deliverMethod,
            notes: data.notes
        } as Order; // Type assertion to Order
    });
    return OrderList;
}

export const updateCustomer = async (dispatch: React.Dispatch<Action>, customer: Customer) => {
    await client.models.Customer.update(
        { id: customer.id || "", ...customer },
    );
    dispatch({type:"SET_CUSTOMERS_LOADED", payload: false});
}