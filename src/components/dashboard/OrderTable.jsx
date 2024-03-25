import React from 'react';
import { useSelector } from 'react-redux';
import { CiCircleMore } from "react-icons/ci";
import { TiEdit } from "react-icons/ti";
const OrderTable = ({orders, seTCurrentOrder,currentOrder}) => {
   
    return (
        <div className="overflow-x-auto max-h-[85vh] rounded-lg">

         

            {/* <hr className='text-white mb-2'/> */}
            <table className="min-w-full divide-y divide-gray-200 text-black">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">...</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.length > 0 && orders.map((order, index) => (
                        <tr key={index} className={currentOrder?.id===order?.id ? " bg-gray-300":""}>
                            <td className="px-2 py-4 whitespace-nowrap">{order.id}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{formatDate(order?.createdAt)}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{order?.customer.fullName}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{order?.totalAmount}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{order?.transactionId || "offline"}</td>
                            <td className= { order?.orderStatus==="PENDING"?"px-2 py-4 whitespace-nowrap text-red-800 font-bold": " text-green-500 px-2 py-4 whitespace-nowrap font-bold" } >{order?.orderStatus}</td>
                            <td className="px-2 py-4 whitespace-nowrap cursor-pointer tec=xt-center"><TiEdit onClick={()=>{seTCurrentOrder(order)}}/></td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderTable;

const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
}