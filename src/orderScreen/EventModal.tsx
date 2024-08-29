import React, { useState } from 'react';
import { useTrazoBackendContext } from '../utilities/trazoBackend';
import { createCustomer, createOrder, Customer, Order } from '../utilities/ordersBackend';
import { getPrice, getProductById, Product } from '../utilities/productsbackend';

interface AddFormProps {
    onClose: () => void;
    customerId: string;
    orders: string[];
    deliveryDate: string;

}



const EventModal: React.FC<AddFormProps> = ({ onClose, customerId, orders, deliveryDate }) => {
    const { state, dispatch } = useTrazoBackendContext();
   let orderPrice = 0.00;
    const { customerList, productList, orderList } = state;
    const customer = customerList.find(customer => customer.id === customerId);

  

    return (
        <div className="modal fixed inset-10 flex justify-center items-center bg-black bg-opacity-0 mb-12 rounded z-20">
            <div className="modal-content bg-white w-1/2 h-full shadow-lg relative flex flex-none flex-col rounded-md gap-4">
                <div className="flex flex-row w-full p-5 gap-4 bg-green-900 text-white justify-between rounded-t-md">
                    <h2 className='text-lg font-semibold'>Delivery to {customer?.brand} </h2>
                    <button onClick={onClose} className='text-white justify-end flex text-xl font-black'>X</button>
                </div>
               <div className='flex flex-col gap-4 p-5'> <h1 className='text-xl font-extrabold '>{customer?.brand + " - " + customer?.locationName}</h1>
                <h3 className='text-md font-light '>{customer?.deliveryAddress}</h3>
                <h3 className='text-md font-light '>Delivery Date: {deliveryDate}</h3>

                <h2 className='text-lg font-bold my-5'>Orders</h2>
               <table className='border'>
                    <thead>
                        <tr>
                            <th className='p-2 border'>Product</th>
                            <th className='p-2 border'>Quantity</th>
                            <th className='p-2 border'>Packing Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(orderId => {
                            const order = orderList.find(order => order.id === orderId);
                            const product = productList.find(product => product.id === order?.productId);
                            orderPrice += parseFloat(order?.price);
                            return (
                                <tr key={orderId} className='border'>
                                    <td className='p-2 border'>{product?.name}</td>
                                    <td className='p-2 border text-right'>{order?.quantity}</td>
                                    <td className='p-2 border text-right'>{order?.packagingSize}g</td>
                                </tr>
                            );
                        })}
                        <tr className='border'>
                            <td className='p-2   font-extrabold' colSpan={2}>Total Price</td>
                            <td className='p-2 text-right font-extrabold'>{orderPrice}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
             
            </div>
        </div>
    );
};

export default EventModal;