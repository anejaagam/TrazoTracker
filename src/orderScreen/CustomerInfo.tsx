import React, { useEffect, useRef, useState } from 'react';
import { useTrazoBackendContext } from '../utilities/trazoBackend';
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tabs, TabsRef } from 'flowbite-react';
import { Customer, getOrder, getOrdersByCustomerId, Order } from '../utilities/ordersBackend';

interface CustomerInfoProps {
    onClose: () => void;
    customer: Customer | undefined;

}



const CustomerInfo: React.FC<CustomerInfoProps> = ({ onClose, customer }) => {
    const { state, dispatch } = useTrazoBackendContext();
    const tabsRef = useRef<TabsRef>(null);
    const [activeTab, setActiveTab] = useState(0);
    const [orders, setOrders] = useState([] as any[]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        



        onClose();
    };

useEffect(() => {
    const fetchOrders = async () => {
        const orderList = await getOrdersByCustomerId(customer?.id || "");
        setOrders(orderList);
    }
    fetchOrders();
}, [customer]);
    return (
        <div className="modal fixed inset-y-5 inset-x-4 flex justify-center items-center bg-black bg-opacity-0 mb-12 rounded">
            <div className="modal-content bg-white w-5/6 shadow-lg relative flex flex-none flex-col rounded-md gap-4 pb-5">
                <div className="flex flex-row w-full p-5 gap-4 bg-green-900 text-white justify-between rounded-t-md">
                    <h2 className='text-lg font-semibold'>Customer Info</h2>
                    <button onClick={onClose} className='text-white justify-end flex text-xl font-black'>X</button>
                </div>

                <div className="flex flex-col px-10 gap-4 w-full justify-center">
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-2xl font-semibold'>{customer?.brand}</h1>

                        <div className="flex flex-row gap-2">
                            <div className='flex flex-col gap-4 border-r-2 border-r-black pr-2 mr-2'>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-lg font-semibold'>Location</label>
                                    <p>{customer?.locationName}</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-lg font-semibold'>Contact</label>
                                    <p>{customer?.contactName}</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-lg font-semibold'>Phone</label>
                                    <p>{customer?.contactNumber}</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-lg font-semibold'>Email</label>
                                    <p>{customer?.contactEmail}</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-lg font-semibold'>Address</label>
                                    <p>{customer?.deliveryAddress}</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-lg font-semibold'>Customer Type</label>
                                    <p>{customer?.customerType}</p>
                                </div>
                            </div>
                            <div className=''>
                                <h1 className='text-xl font-semibold'>Orders</h1>

                                <Table className='my-4'>
                                    <TableHead>
                                      
                                            <TableHeadCell className='p-4'>Product ID </TableHeadCell>
                                            <TableHeadCell className='p-4'>Quantity </TableHeadCell>
                                            <TableHeadCell className='p-4'>Order Date </TableHeadCell>
                                            <TableHeadCell className='p-4'>Status</TableHeadCell>
                                            <TableHeadCell className='p-4'>Delivery Date</TableHeadCell>
                                            <TableHeadCell className='p-4'>Price</TableHeadCell>
                                            <TableHeadCell className='p-4'>Packaging Size</TableHeadCell>
                                       
                                    </TableHead>
                                    <TableBody className="divide-y">
                                        {orders.map((order) => (
                                            <TableRow key={order.productId}>
                                                <TableCell>{order.productId}</TableCell>
                                                <TableCell>{order.quantity}</TableCell>
                                                <TableCell>{order.orderDate}</TableCell>
                                                <TableCell>{order.status}</TableCell>
                                                <TableCell>{order.deliveryDate}</TableCell>
                                                <TableCell>{order.price}</TableCell>
                                                <TableCell>{order.packagingSize}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

            export default CustomerInfo;