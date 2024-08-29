import React from 'react';
import BackButton from '../components/backButton';
import { useTrazoBackendContext } from '../utilities/trazoBackend';
import CustomerInfo from './CustomerInfo';
import { Customer } from '../utilities/ordersBackend';

const CustomerScreen = () => {
    const {state, dispatch} = useTrazoBackendContext();
    const {customerList, orderList} = state;
    const [customerModal, setCustomerModal] = React.useState(false);
    const [selectedCustomer, setSelectedCustomer] = React.useState<Customer>();
    return (
        <><div className='w-full flex flex-col gap-2'>
           
            {/* <div className="flex flex-row justify-start items-center px-10 text-white">
    
    </div> */}
            <div className="flex flex-row w-full p-5 gap-4 justify-between items-center">
                <BackButton />
                
                <h2 className="w-2/4 text-center text-2xl font-bold text-green-900">Customers</h2>
                <div className="w-1/4 flex justify-end">
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-700" >Add</button>
                </div>
            </div>
            
            <div className="flex justify-center px-10 py-4">
            <table className="w-full table-auto" border={1}>
                <thead className='bg-green-700'>
                    <tr className="text-left text-white">
                        <th className='p-4'>Brand</th>
                        <th className='p-4'>Location</th>
                        <th className='p-4'>Contact</th>
                        <th className='p-4'>Phone</th>
                        <th className='p-4'>Email</th>
                        <th className='p-4'>Delivery Methods</th>
                        <th className='p-4'>Address</th>
                        <th className='p-4'>Customer Type</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {customerList.map((customer) => (
                        <tr key={customer.id} className=' odd:bg-white even:bg-green-100' onClick={()=> {setCustomerModal(true); setSelectedCustomer(customer)}}>
                            <td className='p-4'>{customer.brand}</td>
                            <td className='p-4'>{customer.locationName}</td>
                            <td className='p-4'>{customer.contactName}</td>
                            <td className='p-4'>{customer.contactNumber}</td>
                            <td className='p-4'>{customer.contactEmail}</td>
                            <td className='p-4'>{customer.deliveryMethods.join(", ")}</td>
                            <td className='p-4'>{customer.deliveryAddress}</td>
                            <td className='p-4'>{customer.customerType}</td>
                            
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            {customerModal && <CustomerInfo onClose={() => setCustomerModal(false)} customer={selectedCustomer}/>}
        </div><> </></>
    );
};

export default CustomerScreen;