import React, { useState } from 'react';
import { useTrazoBackendContext } from '../utilities/trazoBackend';
import { createCustomer, createOrder, Customer, Order } from '../utilities/ordersBackend';
import { getPrice, getProductById, Product } from '../utilities/productsbackend';

interface AddFormProps {
    onClose: () => void;

}



const AddScreen: React.FC<AddFormProps> = ({ onClose }) => {
    const { state, dispatch } = useTrazoBackendContext();
    const [packageSize, setPackageSize] = useState<string>('');
    const [customerId, setCustomerI] = useState<string>('');
    const [selectedProductId, setSelectedProductId] = useState<string>('');
    const { customerList, productList } = state;
    const [customer, setCustomer] = useState(true);
    const [order, setOrder] = useState(false);
    const defaultClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-4/6 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    const [orderPrice, setOrderPrice] = useState<string>('0.00');
   const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const productId = e.target.value;
        setSelectedProductId(productId);
      };
      const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const packageSize = e.target.value;
        setPackageSize(packageSize);
      }
      const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const customerId = e.target.value;
        setCustomerI(customerId);
      }
     const handleOrderPrice = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = e.target.value;
        const soldTo = customerList.find(customer => customer.id === customerId)?.customerType
            
        const price = (await getPrice(selectedProductId, soldTo, packageSize))
        const orderPriceCalc = (parseInt(price) * parseInt(quantity)).toFixed(2);
        setOrderPrice(orderPriceCalc.toString());
      }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
       if (customer) {
        
                const customer: Customer = {
                    brand: formData.get('brand') as string,
                    locationName: formData.get('LocationName') as string,
                    contactName: formData.get('contactName') as string,
                    contactEmail: formData.get('contactEmail') as string,
                    contactNumber: formData.get('contactNumber') as string,
                    deliveryAddress: formData.get('deliveryAddress') as string,
                    customerType: formData.get('customerType') as "FOODSERVICE" | "RETAIL",
                    deliveryMethods: formData.getAll('deliverMethods') as string[],
                    notes: formData.get('notes') as string,
                }
                const data = createCustomer(customer);
                console.log(data);
            }
        if (order) {
                const orderData: Order = {
                    customerId: formData.get('customerId') as string,
                    productId: formData.get('productId') as string,
                    quantity: formData.get('orderQuantity') as any,
                    price: orderPrice,
                    packagingSize: formData.get('orderAmount') as string,
                    status: formData.get('orderStatus') as "PRE" | "GROWING" | "HARVESTED" | "DELIVERED",
                    orderDate: formData.get('orderDate') as string,
                    deliveryDate: formData.get('deliveryDate') as string,
                    deliverMethod: formData.get('deliveryMethod') as "DIRECT" | "GFS" | "OTHER",
                    notes: formData.get('notes') as string,
                }
                console.log(orderData);
                const data1 = createOrder(orderData);
                console.log(data1);
            }

    
        onClose();
    };

    return (
        <div className="modal fixed inset-10 flex justify-center items-center bg-black bg-opacity-0 mb-12 rounded z-20">
            <div className="modal-content bg-white w-1/2 h-full shadow-lg relative flex flex-none flex-col rounded-md gap-4">
                <div className="flex flex-row w-full p-5 gap-4 bg-green-900 text-white justify-between rounded-t-md">
                    <h2 className='text-lg font-semibold'>Add Orders </h2>
                    <button onClick={onClose} className='text-white justify-end flex text-xl font-black'>X</button>
                </div>

                <div className="flex flex-row px-10 text-white gap-4 w-full justify-center">
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-900" onClick={() => { setCustomer(true); setOrder(false) }}>Customer </button>
                    <button className="bg-green-600 text-white p-2 rounded focus:bg-green-900" onClick={() => { setOrder(true); setCustomer(false) }}>Order</button>

                </div>
                {customer &&
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 justify-between h-full">
                        <label htmlFor="brand" className='flex flex-row gap-2 items-center justify-between'>Brand
                            <input type="text" name="brand" id="brand" className={defaultClass} /></label>
                        <label htmlFor='LocationName' className='flex flex-row gap-2 items-center justify-between'>Location Name
                            <input type="text" name="LocationName" id="LocationName" className={defaultClass} /></label>
                        <label htmlFor="contactName" className='flex flex-row gap-2 items-center justify-between'>Contact Name
                            <input type="text" name="contactName" id="contactName" className={defaultClass} /></label>
                        <label htmlFor='contactEmail' className='flex flex-row gap-2 items-center justify-between'>Contact Info (Email)
                            <input type="text" name="contactEmail" id="contactEmail" className={defaultClass} /></label>
                        <label htmlFor='contactNumber' className='flex flex-row gap-2 items-center justify-between'>Contact Info (Number)
                            <input type="text" name="contactNumber" id="contactNumber" className={defaultClass} /></label>
                        <label htmlFor='deliveryAddress' className='flex flex-row gap-2 items-center justify-between'>Delivery Address
                            <input type="text" name="deliveryAddress" id="deliveryAddress" className={defaultClass} /></label>
                        <label htmlFor='customerType' className='flex flex-row gap-2 items-center justify-between'>Customer Type
                            <label className="flex flex-row gap-2">
                                <input type="radio" id="customerTypeDistributor" name="customerType" className="w-4" value="FOODSERVICE" />Food Service
                            </label>
                            <label className="flex flex-row gap-2">
                                <input type="radio" id="customerTypeRetailer" name="customerType" className="w-4" value="RETAIL" />Retail
                            </label>
                        </label>
                        <label htmlFor='deliverMethods' className='flex flex-row gap-2 items-center justify-between'>Delivery Methods
                            <label className="flex flex-row gap-2">
                                <input type="checkbox" id="deliverMethodDirect" name="deliverMethods" className="w-4" value="DIRECT" />Direct
                            </label>
                            <label className="flex flex-row gap-2">
                                <input type="checkbox" id="deliverMethodGFS" name="deliverMethods" className="w-4" value="GFS" />GFS
                            </label>
                            <label className="flex flex-row gap-2">
                                <input type="checkbox" id="deliverMethodOther" name="deliverMethods" className="w-4" value="OTHER" />Other Distributor
                            </label>
                        </label>
                        <label htmlFor='notes' className='flex flex-row gap-2 items-center justify-between'>Notes
                            <textarea name="notes" id="notes" className={defaultClass}></textarea></label>

                        <button type="submit" className=' bg-green-800 p-2 px-4 text-white rounded-md w-min items-center self-center'>Submit</button>
                    </form>}
                {order && <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 justify-between h-full">
                    <label htmlFor='orderDate' className='flex flex-row gap-2 items-center justify-between'>Order Date
                        <input type="date" name="orderDate" id="orderDate" className={defaultClass} /></label>
                    <label htmlFor='customerId' className='flex flex-row gap-2 items-center justify-between'>Customer ID
                        <input list="customerIdList" name="customerId" id="customerId" className={defaultClass} onChange={handleCustomerChange}/>
                        <datalist id="customerIdList" >
                            {customerList.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.brand + " " + customer.locationName}
                                </option>
                            ))}
                        </datalist>
                    </label>
                    <label htmlFor='productId' className='flex flex-row gap-2 items-center justify-between'>Product ID
                        <input list="productIdList" name="productId" id="productId" className={defaultClass} onChange={handleProductChange}/>
                        <datalist id="productIdList" >
                            {productList.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </datalist>
                    </label>

                    <label htmlFor='orderAmount' className='flex flex-row gap-2 items-center justify-between'>Packaging
                        <select name="orderAmount" id="orderAmount" className={defaultClass} onChange={handlePackageChange}>
                        {productList.map(product => (
                                product.id === selectedProductId &&
                                product.packagingSizes.map(pkg => (
                                    <option key={pkg} value={pkg? pkg : ""}>{pkg==="50" ? "50g" : pkg=== "453" ? "1 lb" : pkg==="20" ? "Sample Size" : pkg==="113" ? "16oz Container" : "24oz Container"}</option>
                                ))
                            ))}
                        </select></label>
                    <label htmlFor='orderQuantity' className='flex flex-row gap-2 items-center justify-between'>Order Quantity
                        <input type="number" name="orderQuantity" id="orderQuantity" className={defaultClass} onChange={handleOrderPrice}/></label>
                    <label htmlFor='deliveryMethod' className='flex flex-row gap-2 items-center justify-between'>Delivery Method
                        <select name="deliveryMethod" id="deliveryMethod" className={defaultClass}>
                        {customerList.map(customer => (
                                customer.id === customerId &&
                                customer.deliveryMethods.map(method => (
                                    <option key={method} value={method}>{method}</option>
                                ))
                            ))}
                        </select></label>

                    <label htmlFor='deliveryDate' className='flex flex-row gap-2 items-center justify-between'>Delivery Date
                        <input type="date" name="deliveryDate" id="DeliveryDate" className={defaultClass} /></label>
                    <label htmlFor='orderStatus' className='flex flex-row gap-2 items-center justify-between'>Order Status
                        <select name="orderStatus" id="orderStatus" className={defaultClass}>
                           <option value="PRE">Pre</option>
                           <option value="GROWING">Growing</option>
                           <option value="HARVESTED">Harvested</option>
                           <option value="DELIVERED">Delivered</option>
                        </select></label>

                    <label htmlFor='notes' className='flex flex-row gap-2 items-center justify-between'>Notes
                        <textarea name="notes" id="notes" className={defaultClass}></textarea></label>
                    <hr></hr>
                    <label htmlFor='orderPrice' className='flex flex-row gap-2 items-center justify-between font-bold text-gray-400'>
                        <button type="submit" className=' bg-green-800 p-2 px-4 text-white rounded-md w-min items-center self-center'>Submit</button>

                        <label className='text-lg font-bold italic'>Order Price: ${orderPrice}</label>
                    </label>

                </form>}

            </div>
        </div>
    );
};

export default AddScreen;