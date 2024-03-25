import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrder } from '../../redux/order/orderAction';
import OrderTable from './OrderTable';
import { Switch } from '@chakra-ui/react';

const Orders = () => {

  const token = localStorage.getItem("token-owner");
  const { myrestaurant } = useSelector((store) => store.restaurant);

  const dispatch = useDispatch();
  const { orders,updatedorder } = useSelector((store) => store.order);

  useEffect(() => {
    dispatch(getAllOrders({ token, restaurantId: myrestaurant?.id }))
  }, [updatedorder])

  const [currentOrder, seTCurrentOrder] = useState(null);

  const handleorder=async()=>{
    if(currentOrder?.orderStatus==="DELIVERED"){
      alert("already delivered")
      return;
    }

    const data={
      orderId:currentOrder?.id,
      status:"DELIVERED"
    }
    const neworder= await dispatch(updateOrder({token, data}))
   
    seTCurrentOrder(  neworder)
  }


  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Part - Order Details */}

      <div className="md:w-2/3 p-4">
        {/* Order Table Component */}
        <h1 className='text-orange-500  font-bold text-3xl bg-white p-2 rounded-md shadow-md mb-2'>Orders</h1>
        <OrderTable seTCurrentOrder={seTCurrentOrder} currentOrder={currentOrder} orders={orders} />
      </div>





      <div className="md:w-1/3 p-4">
        <div className="bg- text-black bg-white ">
          
          {currentOrder === null ? (
            <div></div>
            ) : (
              <div className='border  p-4 rounded-lg'>
              <div className="mb-2">
                <div className='text-2xl font-bold '> Order details </div>
                <p className="font-semibold">Order ID: {currentOrder?.id}</p>
              </div>
              <div className="mb-1">
                <p className="font-semibold">Customer: 
                { currentOrder?.customer?.fullName}</p>
              </div>
              <div className="overflow-auto max-h-48 mb-4">
                <table className="w-full bg-black text-white ">
                  <thead>
                    <tr className="bg-orange-400">
                      <th className="font-semibold border border-gray-300 ">Item</th>
                      <th className="font-semibold border border-gray-300">Quantity</th>
                      <th className="font-semibold border border-gray-300">Price</th>
                      <th className="font-semibold border border-gray-300">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrder?.items?.map((item, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300">{item?.food?.name}</td>
                        <td className="border border-gray-300">{item?.quantity}</td>
                        <td className="border border-gray-300">{item?.food?.price}</td>
                        <td className="border border-gray-300">{item?.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Total Amount:₹
 {currentOrder.totalAmount}</p>
              </div>
              <div>
                <p className="font-semibold">Order Status: {currentOrder.orderStatus}</p>
                <Switch isChecked={currentOrder?.orderStatus==="DELIVERED"}onChange={(e)=>{handleorder()}}>change order status</Switch>
              </div>
            </div>
          )}
        </div>
      </div>




    </div>


  );
}

export default Orders
