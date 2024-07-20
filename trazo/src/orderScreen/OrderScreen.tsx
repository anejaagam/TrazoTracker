import React from 'react';
import Header from '../components/header';
import Button from '../components/button';
import { useNavigate } from 'react-router';
const customer: string = require('../assets/icons/user.svg').default;
const clipboard: string = require('../assets/icons/clipboard.svg').default;
const calendar: string = require('../assets/icons/calender.svg').default;
const plus: string = require('../assets/icons/plus.svg').default;
const OrderScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className='h-screen flex flex-col'>
            <Header />
            <div className="flex justify-center items-start p-4">
                <div className="grid grid-cols-4 gap-4">
                <Button onClick={() => {navigate('/orders')}} img={plus} text='New'/>
                    <Button onClick={() => {navigate('/orders')}} img={customer} text='Customer Profiles'/>
                    <Button onClick={() => {navigate('/track')}} img={clipboard} text='Current Orders' />
                    <Button onClick={() => {navigate('/products')}} img={calendar} text='Past Orders'/>
                </div>
            </div>
            <div className="flex flex-col justify-center p-10">
                <h1 className="text-2xl font-bold mb-4">Current Orders</h1>
                <table className="w-full table-auto border-collapse text-center">
                    <thead className='bg-green-700 text-white'>
                        <tr>
                            <th className="py-2">Order ID</th>
                            <th className="py-2">Customer ID</th>
                            <th className="py-2">Batch ID</th>
                            <th className="py-2">Order Date</th>
                            <th className="py-2">Delivery Date</th>
                            <th className="py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border py-2">1</td>
                            <td className="border py-2">12345</td>
                            <td className="border py-2">67890</td>
                            <td className="border py-2">2022-01-01</td>
                            <td className="border py-2">2022-01-05</td>
                            <td className="border py-2">Delivered</td>
                        </tr>
                        <tr>
                            <td className="border py-2">2</td>
                            <td className="border py-2">54321</td>
                            <td className="border py-2">09876</td>
                            <td className="border py-2">2022-01-02</td>
                            <td className="border py-2">2022-01-06</td>
                            <td className="border py-2">Processing</td>
                        </tr>
                        <tr>
                            <td className="border py-2">3</td>
                            <td className="border py-2">98765</td>
                            <td className="border py-2">43210</td>
                            <td className="border py-2">2022-01-03</td>
                            <td className="border py-2">2022-01-07</td>
                            <td className="border py-2">Shipped</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderScreen;