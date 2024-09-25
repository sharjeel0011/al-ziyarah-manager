






// import React, { useEffect, useState } from 'react';
// import { db } from '../../Config/Firebase/FirebaseConfig';
// import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';

// const OrderProcess = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [orderDetails, setOrderDetails] = useState({
//     customerName: '',
//     customerNumber: '',
//     customerAddress: '',
//     customerCity: '',
//     customerProvince: '',
//     customerEmail: '',
//     orderProvider: 'daraz',
//     orderNumber: '',
//     trackingNumber: '',
//     shippingProvider: 'daraz',
//     ProductPrice :''
    
//   });
//   const [selectedColor, setSelectedColor] = useState('');
//   const [selectedSize, setSelectedSize] = useState('');
//   const [colorOptions, setColorOptions] = useState([]);
//   const [sizeOptions, setSizeOptions] = useState([]);
//   const [stock, setStock] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'products'));
//         const productsList = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setProducts(productsList);
//       } catch (error) {
//         console.error('Error fetching products: ', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (selectedProduct) {
//       setColorOptions(selectedProduct.colors || []);
//       setSelectedColor('');
//       setSelectedSize('');
//       setSizeOptions([]);
//       setStock('');
//     }
//   }, [selectedProduct]);

//   useEffect(() => {
//     if (selectedProduct && selectedColor) {
//       const colorData = selectedProduct.colors.find(color => color.color === selectedColor);
//       if (colorData) {
//         setSizeOptions(colorData.sizes || []);
//         setSelectedSize('');
//         setStock('');
//       } else {
//         setSizeOptions([]);
//         setStock('');
//       }
//     }
//   }, [selectedColor, selectedProduct]);

//   useEffect(() => {
//     if (selectedProduct && selectedColor && selectedSize) {
//       const colorData = selectedProduct.colors.find(color => color.color === selectedColor);
//       if (colorData) {
//         const sizeData = colorData.sizes.find(size => size.size === selectedSize);
//         setStock(sizeData ? sizeData.stock : '');
//       } else {
//         setStock('');
//       }
//     }
//   }, [selectedSize, selectedColor, selectedProduct]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setOrderDetails({ ...orderDetails, [name]: value });
//   };

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//     setModalOpen(true);
//   };

//   const handleOrderProcess = async () => {
//     const requiredFields = [
//       'customerName', 'customerNumber', 'customerAddress', 'customerCity',
//       'customerProvince', 'customerEmail', 'orderNumber', 'trackingNumber'
//     ];
//     const allFieldsFilled = requiredFields.every(field => orderDetails[field]);

//     if (!allFieldsFilled || !selectedColor || !selectedSize) {
//       setErrorMessage('Please fill all required fields.');
//       return;
//     }

//     try {
//       if (!selectedProduct) {
//         throw new Error('No product selected.');
//       }

//       const colorData = selectedProduct.colors.find(color => color.color === selectedColor);
//       if (!colorData) {
//         throw new Error('Selected color not found.');
//       }
//       const sizeData = colorData.sizes.find(size => size.size === selectedSize);
//       if (!sizeData) {
//         throw new Error('Selected size not found.');
//       }

//       const updatedStock = parseInt(sizeData.stock) - 1;
//       if (updatedStock < 0) {
//         throw new Error('Insufficient stock.');
//       }

//       const colorIndex = selectedProduct.colors.findIndex(color => color.color === selectedColor);
//       const sizeIndex = colorData.sizes.findIndex(size => size.size === selectedSize);

//       const updatedColors = [...selectedProduct.colors];
//       updatedColors[colorIndex] = {
//         ...updatedColors[colorIndex],
//         sizes: [
//           ...updatedColors[colorIndex].sizes.slice(0, sizeIndex),
//           { ...updatedColors[colorIndex].sizes[sizeIndex], stock: updatedStock.toString() },
//           ...updatedColors[colorIndex].sizes.slice(sizeIndex + 1)
//         ]
//       };

//       await updateDoc(doc(db, 'products', selectedProduct.id), {
//         colors: updatedColors
//       });

//       await addDoc(collection(db, 'orders'), {
//         ...orderDetails,
//         productId: selectedProduct.id,
//         productName: selectedProduct.productName,
//         productPrice: selectedProduct.price,
//         productImageUrl: selectedProduct.imageUrl,
//         productColor: selectedColor,
//         productSize: selectedSize,
//         orderDate: new Date()
//       });

//       // Update state to force re-render
//       setProducts(prevProducts => 
//         prevProducts.map(product => 
//           product.id === selectedProduct.id
//             ? { ...product, colors: updatedColors }
//             : product
//         )
//       );

//       // Close modal and reset states
//       setModalOpen(false);
//       setOrderDetails({
//         customerName: '',
//         customerNumber: '',
//         customerAddress: '',
//         customerCity: '',
//         customerProvince: '',
//         customerEmail: '',
//         orderProvider: 'daraz',
//         orderNumber: '',
//         trackingNumber: '',
//         shippingProvider: 'daraz'
//       });
//       setSelectedProduct(null);
//       setErrorMessage('');
//     } catch (error) {
//       console.error('Error processing order: ', error);
//       setErrorMessage(error.message);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-8 shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Order Process</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer"
//             onClick={() => handleProductClick(product)}
//           >
//             <img
//               src={product.imageUrl}
//               alt={product.productName}
//               className="h-32 w-32 object-cover mb-2 mx-auto"
//             />
//             <div className="text-center">
//               <h3 className="font-bold">{product.productName}</h3>
//               <p>${product.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {modalOpen && selectedProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white p-6 rounded shadow-md w-full max-w-lg max-h-[90vh] overflow-hidden">
//             <div className="mb-4">
//               <h3 className="text-xl font-bold mb-4">Order Details for {selectedProduct.productName}</h3>
//               <div className="overflow-y-auto max-h-[70vh]">
//                 {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Order Number</label>
//                   <input
//                     type="text"
//                     name="orderNumber"
//                     value={orderDetails.orderNumber}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Tracking Number</label>
//                   <input
//                     type="text"
//                     name="trackingNumber"
//                     value={orderDetails.trackingNumber}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Customer Name</label>
//                   <input
//                     type="text"
//                     name="customerName"
//                     value={orderDetails.customerName}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Customer Number</label>
//                   <input
//                     type="text"
//                     name="customerNumber"
//                     value={orderDetails.customerNumber}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Customer Address</label>
//                   <input
//                     type="text"
//                     name="customerAddress"
//                     value={orderDetails.customerAddress}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Customer City</label>
//                   <input
//                     type="text"
//                     name="customerCity"
//                     value={orderDetails.customerCity}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Customer Province</label>
//                   <input
//                     type="text"
//                     name="customerProvince"
//                     value={orderDetails.customerProvince}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Customer Email</label>
//                   <input
//                     type="email"
//                     name="customerEmail"
//                     value={orderDetails.customerEmail}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Order Provider</label>
//                   <select
//                     name="orderProvider"
//                     value={orderDetails.orderProvider}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   >
//                     <option value="daraz">Daraz</option>
//                     <option value="website">Website</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Shipping Provider</label>
//                   <select
//                     name="shippingProvider"
//                     value={orderDetails.shippingProvider}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   >
//                     <option value="daraz">Daraz</option>
//                     <option value="tcs">TCS</option>
//                     <option value="leopard">Leopard</option>
//                   </select>
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Product Color</label>
//                   <select
//                     value={selectedColor}
//                     onChange={(e) => setSelectedColor(e.target.value)}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   >
//                     <option value="">Select Color</option>
//                     {colorOptions.map((color, index) => (
//                       <option key={index} value={color.color}>
//                         {color.color}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Product Size</label>
//                   <select
//                     value={selectedSize}
//                     onChange={(e) => setSelectedSize(e.target.value)}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   >
//                     <option value="">Select Size</option>
//                     {sizeOptions.map((size, index) => (
//                       <option key={index} value={size.size}>
//                         {size.size} ({size.stock} in stock)
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setSelectedColor('');
//                     setSelectedSize('');
//                   }}
//                   className="bg-gray-300 text-gray-800 px-4 py-2 rounded mb-4"
//                 >
//                   Clear Selections
//                 </button>
//               </div>
//             </div>
//             <div className="flex justify-between">
//               <button onClick={handleOrderProcess} className="bg-blue-500 text-white px-4 py-2 rounded">
//                 Order Process
//               </button>
//               <button onClick={() => {
//                 setModalOpen(false);
//                 setSelectedProduct(null);
//                 setErrorMessage('');
//               }} className="bg-gray-500 text-white px-4 py-2 rounded">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderProcess;




























// import React, { useEffect, useState } from 'react';
// import { db } from '../../Config/Firebase/FirebaseConfig';
// import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';

// const OrderProcess = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [orderDetails, setOrderDetails] = useState({
//     customerName: '',
//     customerNumber: '',
//     customerAddress: '',
//     customerCity: '',
//     customerProvince: '',
//     customerEmail: '',
//     orderProvider: 'daraz',
//     orderNumber: '',
//     trackingNumber: '',
//     shippingProvider: 'daraz',
//     productPrice: '', // Editable
//     deliveryChargesApply: '' // Editable
//   });
//   const [selectedColor, setSelectedColor] = useState('');
//   const [selectedSize, setSelectedSize] = useState('');
//   const [colorOptions, setColorOptions] = useState([]);
//   const [sizeOptions, setSizeOptions] = useState([]);
//   const [stock, setStock] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'products'));
//         const productsList = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setProducts(productsList);
//       } catch (error) {
//         console.error('Error fetching products: ', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (selectedProduct) {
//       setColorOptions(selectedProduct.colors || []);
//       setSelectedColor('');
//       setSelectedSize('');
//       setSizeOptions([]);
//       setStock('');
//       setOrderDetails(prevDetails => ({
//         ...prevDetails,
//         productPrice: selectedProduct.price // Default to product's current price
//       }));
//     }
//   }, [selectedProduct]);

//   useEffect(() => {
//     if (selectedProduct && selectedColor) {
//       const colorData = selectedProduct.colors.find(color => color.color === selectedColor);
//       if (colorData) {
//         setSizeOptions(colorData.sizes || []);
//         setSelectedSize('');
//         setStock('');
//       } else {
//         setSizeOptions([]);
//         setStock('');
//       }
//     }
//   }, [selectedColor, selectedProduct]);

//   useEffect(() => {
//     if (selectedProduct && selectedColor && selectedSize) {
//       const colorData = selectedProduct.colors.find(color => color.color === selectedColor);
//       if (colorData) {
//         const sizeData = colorData.sizes.find(size => size.size === selectedSize);
//         setStock(sizeData ? sizeData.stock : '');
//       } else {
//         setStock('');
//       }
//     }
//   }, [selectedSize, selectedColor, selectedProduct]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setOrderDetails({ ...orderDetails, [name]: value });
//   };

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//     setModalOpen(true);
//   };

//   const handleOrderProcess = async () => {
//     const requiredFields = [
//       'customerName', 'customerNumber', 'customerAddress', 'customerCity',
//       'customerProvince', 'customerEmail', 'orderNumber', 'trackingNumber',
//       'productPrice', 'deliveryChargesApply'
//     ];
//     const allFieldsFilled = requiredFields.every(field => orderDetails[field]);

//     if (!allFieldsFilled || !selectedColor || !selectedSize) {
//       setErrorMessage('Please fill all required fields.');
//       return;
//     }

//     try {
//       if (!selectedProduct) {
//         throw new Error('No product selected.');
//       }

//       const colorData = selectedProduct.colors.find(color => color.color === selectedColor);
//       if (!colorData) {
//         throw new Error('Selected color not found.');
//       }
//       const sizeData = colorData.sizes.find(size => size.size === selectedSize);
//       if (!sizeData) {
//         throw new Error('Selected size not found.');
//       }

//       const updatedStock = parseInt(sizeData.stock) - 1;
//       if (updatedStock < 0) {
//         throw new Error('Insufficient stock.');
//       }

//       const colorIndex = selectedProduct.colors.findIndex(color => color.color === selectedColor);
//       const sizeIndex = colorData.sizes.findIndex(size => size.size === selectedSize);

//       const updatedColors = [...selectedProduct.colors];
//       updatedColors[colorIndex] = {
//         ...updatedColors[colorIndex],
//         sizes: [
//           ...updatedColors[colorIndex].sizes.slice(0, sizeIndex),
//           { ...updatedColors[colorIndex].sizes[sizeIndex], stock: updatedStock.toString() },
//           ...updatedColors[colorIndex].sizes.slice(sizeIndex + 1)
//         ]
//       };

//       await updateDoc(doc(db, 'products', selectedProduct.id), {
//         colors: updatedColors
//       });

//       await addDoc(collection(db, 'orders'), {
//         ...orderDetails,
//         productId: selectedProduct.id,
//         productName: selectedProduct.productName,
//         productImageUrl: selectedProduct.imageUrl,
//         productColor: selectedColor,
//         productSize: selectedSize,
//         orderDate: new Date()
//       });

//       // Update state to force re-render
//       setProducts(prevProducts => 
//         prevProducts.map(product => 
//           product.id === selectedProduct.id
//             ? { ...product, colors: updatedColors }
//             : product
//         )
//       );

//       // Close modal and reset states
//       setModalOpen(false);
//       setOrderDetails({
//         customerName: '',
//         customerNumber: '',
//         customerAddress: '',
//         customerCity: '',
//         customerProvince: '',
//         customerEmail: '',
//         orderProvider: 'daraz',
//         orderNumber: '',
//         trackingNumber: '',
//         shippingProvider: 'daraz',
//         productPrice: '', // Reset after order
//         deliveryChargesApply: '' // Reset after order
//       });
//       setSelectedProduct(null);
//       setErrorMessage('');
//     } catch (error) {
//       console.error('Error processing order: ', error);
//       setErrorMessage(error.message);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-8 shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Order Process</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer"
//             onClick={() => handleProductClick(product)}
//           >
//             <img
//               src={product.imageUrl}
//               alt={product.productName}
//               className="h-32 w-32 object-cover mb-2 mx-auto"
//             />
//             <div className="text-center">
//               <h3 className="font-bold">{product.productName}</h3>
//               <p>${product.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {modalOpen && selectedProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white p-6 rounded shadow-md w-full max-w-lg max-h-[90vh] overflow-hidden">
//             <div className="mb-4">
//               <h3 className="text-xl font-bold mb-4">Order Details for {selectedProduct.productName}</h3>
//               <div className="overflow-y-auto max-h-[70vh]">
//                 {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Order Number</label>
//                   <input
//                     type="text"
//                     name="orderNumber"
//                     value={orderDetails.orderNumber}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Tracking Number</label>
//                   <input
//                     type="text"
//                     name="trackingNumber"
//                     value={orderDetails.trackingNumber}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Customer Name</label>
//                   <input
//                     type="text"
//                     name="customerName"
//                     value={orderDetails.customerName}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Customer Number</label>
//                   <input
//                     type="text"
//                     name="customerNumber"
//                     value={orderDetails.customerNumber}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Customer Address</label>
//                   <input
//                     type="text"
//                     name="customerAddress"
//                     value={orderDetails.customerAddress}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Customer City</label>
//                   <input
//                     type="text"
//                     name="customerCity"
//                     value={orderDetails.customerCity}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Customer Province</label>
//                   <input
//                     type="text"
//                     name="customerProvince"
//                     value={orderDetails.customerProvince}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Customer Email</label>
//                   <input
//                     type="email"
//                     name="customerEmail"
//                     value={orderDetails.customerEmail}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Product Price</label>
//                   <input
//                     type="number"
//                     name="productPrice"
//                     value={orderDetails.productPrice}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Delivery Charges Apply</label>
//                   <input
//                     type="number"
//                     name="deliveryChargesApply"
//                     value={orderDetails.deliveryChargesApply}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                     placeholder="Enter delivery charges"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Product Color</label>
//                   <select
//                     value={selectedColor}
//                     onChange={(e) => setSelectedColor(e.target.value)}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   >
//                     <option value="">Select Color</option>
//                     {colorOptions.map(color => (
//                       <option key={color.color} value={color.color}>{color.color}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Product Size</label>
//                   <select
//                     value={selectedSize}
//                     onChange={(e) => setSelectedSize(e.target.value)}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   >
//                     <option value="">Select Size</option>
//                     {sizeOptions.map(size => (
//                       <option key={size.size} value={size.size}>{size.size}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Stock</label>
//                   <input
//                     type="text"
//                     value={stock}
//                     className="w-full px-3 py-2 border rounded"
//                     disabled
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setSelectedColor('');
//                     setSelectedSize('');
//                   }}
//                   className="bg-gray-300 text-gray-800 px-4 py-2 rounded mb-4"
//                 >
//                   Clear Selections
//                 </button>
//               </div>
//             </div>
//             <div className="flex justify-between">
//               <button onClick={handleOrderProcess} className="bg-blue-500 text-white px-4 py-2 rounded">
//                 Order Process
//               </button>
//               <button onClick={() => {
//                 setModalOpen(false);
//                 setSelectedProduct(null);
//                 setErrorMessage('');
//               }} className="bg-gray-500 text-white px-4 py-2 rounded">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderProcess;















import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase/FirebaseConfig';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';

const OrderProcess = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    customerNumber: '',
    customerAddress: '',
    customerCity: '',
    customerProvince: '',
    customerEmail: '',
    orderProvider: 'daraz', // Default value
    orderNumber: '',
    trackingNumber: '',
    shippingProvider: 'daraz', // Default value
    productPrice: '', // Editable
    deliveryChargesApply: '' // Editable
  });
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [colorOptions, setColorOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [stock, setStock] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setColorOptions(selectedProduct.colors || []);
      setSelectedColor('');
      setSelectedSize('');
      setSizeOptions([]);
      setStock('');
      setOrderDetails(prevDetails => ({
        ...prevDetails,
        productPrice: selectedProduct.price // Default to product's current price
      }));
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedProduct && selectedColor) {
      const colorData = selectedProduct.colors.find(color => color.color === selectedColor);
      if (colorData) {
        setSizeOptions(colorData.sizes || []);
        setSelectedSize('');
        setStock('');
      } else {
        setSizeOptions([]);
        setStock('');
      }
    }
  }, [selectedColor, selectedProduct]);

  useEffect(() => {
    if (selectedProduct && selectedColor && selectedSize) {
      const colorData = selectedProduct.colors.find(color => color.color === selectedColor);
      if (colorData) {
        const sizeData = colorData.sizes.find(size => size.size === selectedSize);
        setStock(sizeData ? sizeData.stock : '');
      } else {
        setStock('');
      }
    }
  }, [selectedSize, selectedColor, selectedProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleOrderProcess = async () => {
    const requiredFields = [
      'customerName', 'customerNumber', 'customerAddress', 'customerCity',
      'customerProvince', 'customerEmail', 'orderNumber', 'trackingNumber',
      'productPrice', 'deliveryChargesApply'
    ];
    const allFieldsFilled = requiredFields.every(field => orderDetails[field]);

    if (!allFieldsFilled || !selectedColor || !selectedSize) {
      setErrorMessage('Please fill all required fields.');
      return;
    }

    try {
      if (!selectedProduct) {
        throw new Error('No product selected.');
      }

      const colorData = selectedProduct.colors.find(color => color.color === selectedColor);
      if (!colorData) {
        throw new Error('Selected color not found.');
      }
      const sizeData = colorData.sizes.find(size => size.size === selectedSize);
      if (!sizeData) {
        throw new Error('Selected size not found.');
      }

      const updatedStock = parseInt(sizeData.stock) - 1;
      if (updatedStock < 0) {
        throw new Error('Insufficient stock.');
      }

      const colorIndex = selectedProduct.colors.findIndex(color => color.color === selectedColor);
      const sizeIndex = colorData.sizes.findIndex(size => size.size === selectedSize);

      const updatedColors = [...selectedProduct.colors];
      updatedColors[colorIndex] = {
        ...updatedColors[colorIndex],
        sizes: [
          ...updatedColors[colorIndex].sizes.slice(0, sizeIndex),
          { ...updatedColors[colorIndex].sizes[sizeIndex], stock: updatedStock.toString() },
          ...updatedColors[colorIndex].sizes.slice(sizeIndex + 1)
        ]
      };

      await updateDoc(doc(db, 'products', selectedProduct.id), {
        colors: updatedColors
      });

      await addDoc(collection(db, 'orders'), {
        ...orderDetails,
        productId: selectedProduct.id,
        productName: selectedProduct.productName,
        productImageUrl: selectedProduct.imageUrl,
        productColor: selectedColor,
        productSize: selectedSize,
        orderDate: new Date()
      });

      // Update state to force re-render
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === selectedProduct.id
            ? { ...product, colors: updatedColors }
            : product
        )
      );

      // Close modal and reset states
      setModalOpen(false);
      setOrderDetails({
        customerName: '',
        customerNumber: '',
        customerAddress: '',
        customerCity: '',
        customerProvince: '',
        customerEmail: '',
        orderProvider: 'daraz', // Reset to default value
        orderNumber: '',
        trackingNumber: '',
        shippingProvider: 'daraz', // Reset to default value
        productPrice: '', // Reset after order
        deliveryChargesApply: '' // Reset after order
      });
      setSelectedProduct(null);
      setErrorMessage('');
    } catch (error) {
      console.error('Error processing order: ', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Process</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="h-32 w-32 object-cover mb-2 mx-auto"
            />
            <div className="text-center">
              <h3 className="font-bold">{product.productName}</h3>
              <p>${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg max-h-[90vh] overflow-hidden">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-4">Order Details for {selectedProduct.productName}</h3>
              <div className="overflow-y-auto max-h-[70vh]">
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Order Number</label>
                  <input
                    type="text"
                    name="orderNumber"
                    value={orderDetails.orderNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Tracking Number</label>
                  <input
                    type="text"
                    name="trackingNumber"
                    value={orderDetails.trackingNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Customer Name</label>
                  <input
                    type="text"
                    name="customerName"
                    value={orderDetails.customerName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Customer Number</label>
                  <input
                    type="text"
                    name="customerNumber"
                    value={orderDetails.customerNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Customer Address</label>
                  <input
                    type="text"
                    name="customerAddress"
                    value={orderDetails.customerAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Customer City</label>
                  <input
                    type="text"
                    name="customerCity"
                    value={orderDetails.customerCity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Customer Province</label>
                  <input
                    type="text"
                    name="customerProvince"
                    value={orderDetails.customerProvince}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Customer Email</label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={orderDetails.customerEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Product Price</label>
                  <input
                    type="number"
                    name="productPrice"
                    value={orderDetails.productPrice}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Delivery Charges Apply</label>
                  <input
                    type="text"
                    name="deliveryChargesApply"
                    value={orderDetails.deliveryChargesApply}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Select Color</label>
                  <select
                    value={selectedColor}
                    onChange={e => setSelectedColor(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  >
                    <option value="">Select a color</option>
                    {colorOptions.map((color, index) => (
                      <option key={index} value={color.color}>{color.color}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Select Size</label>
                  <select
                    value={selectedSize}
                    onChange={e => setSelectedSize(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  >
                    <option value="">Select a size</option>
                    {sizeOptions.map((size, index) => (
                      <option key={index} value={size.size}>{size.size}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Stock</label>
                  <input
                    type="text"
                    value={stock}
                    readOnly
                    className="w-full px-3 py-2 border rounded bg-gray-100"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Shipping Provider</label>
                  <select
                    name="shippingProvider"
                    value={orderDetails.shippingProvider}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  >
                    <option value="daraz">Daraz</option>
                    <option value="tcs">TCS</option>
                    <option value="leopard">Leopard</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Order Provider</label>
                  <select
                    name="orderProvider"
                    value={orderDetails.orderProvider}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  >
                    <option value="daraz">Daraz</option>
                    <option value="website">website</option>
                    <option value="other">other</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleOrderProcess}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Process Order
                </button>
              </div>
            </div>
          </div>
        
      </div>
      )}</div>
  );
};

export default OrderProcess;
