import React from 'react';
import Header from './components/header';
import Button from './components/button';
import { useNavigate } from 'react-router';
const inventory: string = require('./assets/icons/Inventory.svg').default;
const orders: string = require('./assets/icons/order.svg').default;
const products: string = require('./assets/icons/products.svg').default;
const tracking: string = require('./assets/icons/track.svg').default;
const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className='h-screen flex flex-col'>
        
            <div className="flex justify-center items-center h-full ">
                <div className="grid grid-cols-2 gap-4">
                    <Button onClick={() => { navigate('/products') }} img={products} text='Products' />
                    <Button onClick={() => { navigate('/inventory') }} img={inventory} text='Inventory' />
                    <Button onClick={() => { navigate('/orders') }} img={orders} text='Orders' disabled={true} />
                    <Button onClick={() => { navigate('/track') }} img={tracking} text='Tray Track' disabled={true} />
                </div>
            </div>
        </div>
    );
};

export default Home;