import React, { useEffect } from 'react';
import Header from '../components/header';
import Button from '../components/button';
import FullCalendar  from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import styled from "@emotion/styled";
import { useNavigate } from 'react-router';
import { start } from 'repl';
import { a } from '@aws-amplify/backend';
import AddScreen from './AddScreen';
import { getDeliveries } from '../utilities/ordersBackend';
import { useTrazoBackendContext } from '../utilities/trazoBackend';
const customer: string = require('../assets/icons/user.svg').default;
const clipboard: string = require('../assets/icons/clipboard.svg').default;
const calendar: string = require('../assets/icons/calender.svg').default;
const plus: string = require('../assets/icons/plus.svg').default;
export const StyleWrapper = styled.div`
   .fc-button-primary {
    background: green
 !important;
    border: none;
  }
    .fc{
    -fc-event-bg-color: #3788d8;
  --fc-event-border-color: #3788d8;
  --fc-event-text-color: #fff;
  --fc-event-selected-overlay-color: rgba(0, 0, 0, 0.25);

  --fc-more-link-bg-color: #d0d0d0;
  --fc-more-link-text-color: inherit;

  --fc-event-resizer-thickness: 8px;
  --fc-event-resizer-dot-total-width: 8px;
  --fc-event-resizer-dot-border-width: 1px;

  --fc-non-business-color: rgba(215, 215, 215, 0.3);
  --fc-bg-event-color: rgb(143, 223, 130);
  --fc-bg-event-opacity: 0.3;
  --fc-highlight-color: rgba(188, 232, 241, 0.3);
  --fc-today-bg-color:  rgb(240 253 244);
  --fc-now-indicator-color: red;
    }
    `
const OrderScreen: React.FC = () => {
    const [add, setAdd] = React.useState(false);
    const [events, setEvents] = React.useState<any[]>([]);
    const {state, dispatch} = useTrazoBackendContext();
    const [deliveries, setDeliveries] = React.useState<any[]>([]);
    const {customerList, orderList} = state;
    const navigate = useNavigate();
    const handleEventClick = (info: any) => {
      
       alert(info.event.id);
    };
    useEffect(() => {
        const getEvents = async () => {
            const deliveries = await getDeliveries();
            setDeliveries(deliveries);
            console.log(deliveries);
            const eventsList = deliveries.map(delivery => {
                const customer = customerList.find(customer => customer.id === delivery.customerId);
                return {
                    id: delivery.id,
                    title: customer?.brand + ' ' + customer?.locationName,
                    start: delivery.deliveryDate,
                    allDay: true,
                    info: delivery.orders
                }
            })
            setEvents(eventsList);
        }
        getEvents();
    }, [])
    return (
        <div className='h-screen flex gap-10 flex-col'>
          
            <div className="flex justify-center items-start  p-4">
                <div className="grid grid-cols-4 gap-4">
                <Button onClick={() => setAdd(true)} img={plus} text='New'/>
                    <Button onClick={() => {navigate('/orders/customers')}} img={customer} text='Customer Profiles'/>
                    <Button onClick={() => {navigate('/orders/current')}} img={clipboard} text='Current Orders' />
                    <Button onClick={() => {navigate('/orders/past')}} img={calendar} text='Past Orders'/>
                </div>
            </div>
            <div className="flex flex-col justify-center p-10 max-h-full">
                <StyleWrapper>
            <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
      height={"auto"}
      contentHeight={"auto"}
      aspectRatio={1}
      headerToolbar={{
        left: 'title',
        center: '',
        right: 'prev,today,next'
      }}
      events={events}
      eventColor='green'
      eventClick={(info) => {handleEventClick(info)}}
    />
 </StyleWrapper>
            </div>
            {add && <AddScreen onClose={() => setAdd(false)} />}
        </div>
      
    );
};

export default OrderScreen;