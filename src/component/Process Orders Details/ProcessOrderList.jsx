// import React, { useEffect, useState } from 'react';
// import { db } from '../../Config/Firebase/FirebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';

// const OrderOverview = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'orders'));
//         const ordersList = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setOrders(ordersList);
//       } catch (error) {
//         console.error('Error fetching orders: ', error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto bg-white p-8 shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Order Overview</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Number</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking Number</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Color</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Size</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Provider</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Provider</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {orders.map(order => (
//               <tr key={order.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderNumber}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.trackingNumber}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.productName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.productColor}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.productSize}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderProvider}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.shippingProvider}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.productPrice}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.orderDate.seconds * 1000).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrderOverview;






















// import React, { useEffect, useState } from 'react';
// import { db } from '../../Config/Firebase/FirebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';

// const OrderOverview = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'orders'));
//         const ordersList = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setOrders(ordersList);
//       } catch (error) {
//         console.error('Error fetching orders: ', error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto bg-white p-8 shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Order Overview</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Number</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking Number</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Number</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Email</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Address</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer City</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Province</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Charges Apply</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Image</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Color</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Size</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Provider</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Provider</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {orders.map(order => (
//               <tr key={order.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderNumber}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.trackingNumber}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerNumber}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerEmail}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerAddress}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerCity}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerProvince}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.deliveryChargesApply}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.productName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <img src={order.productImageUrl} alt={order.productName} className="h-16 w-16 object-cover" />
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.productColor}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.productSize}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderProvider}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.shippingProvider}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.productPrice}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.orderDate.seconds * 1000).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrderOverview;















import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const OrderOverview = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'orders'));
        const ordersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersList);
      } catch (error) {
        console.error('Error fetching orders: ', error);
      }
    };

    fetchOrders();
  }, []);

  // Calculate the index range for the current page
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate the total number of pages
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Handler for page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Overview</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Color</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Provider</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Provider</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Province</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Charges</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentOrders.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={order.productImageUrl} alt={order.productName} className="w-16 h-16 object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.trackingNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.productName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.productColor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.productSize}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderProvider}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.shippingProvider}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.productPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.orderDate.seconds * 1000).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerAddress}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerCity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerEmail}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerProvince}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.deliveryChargesApply}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Previous
        </button>
        <span className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderOverview;
