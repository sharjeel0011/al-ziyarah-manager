
// import React, { useEffect, useState } from 'react';
// import { db } from '../../Config/Firebase/FirebaseConfig';
// import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [updatedStocks, setUpdatedStocks] = useState({});

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'products'));
//         const productsList = querySnapshot.docs.map(doc => {
//           const data = doc.data();
//           return {
//             id: doc.id,
//             productName: data.productName || '',
//             price: data.price || '',
//             category: data.category || '',
//             sku: data.sku || '',
//             imageUrl: data.imageUrl || '',
//             totalStock: data.totalStock || 0,
//             colors: data.colors || [] // Assuming colors include sizes and stock
//           };
//         });
//         setProducts(productsList);
//       } catch (error) {
//         console.error('Error fetching products: ', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleEditStock = (product) => {
//     setSelectedProduct(product);
//     setUpdatedStocks(product.colors.reduce((acc, color) => {
//       acc[color.color] = color.sizes.reduce((sizeAcc, size) => {
//         sizeAcc[size.size] = size.stock;
//         return sizeAcc;
//       }, {});
//       return acc;
//     }, {}));
//     setShowModal(true);
//   };

//   const handleStockChange = (color, size, value) => {
//     setUpdatedStocks(prev => ({
//       ...prev,
//       [color]: {
//         ...prev[color],
//         [size]: value
//       }
//     }));
//   };

//   const handleSaveStock = async () => {
//     if (!selectedProduct) return;

//     const productRef = doc(db, 'products', selectedProduct.id);

//     const updatedColors = selectedProduct.colors.map(color => ({
//       ...color,
//       sizes: color.sizes.map(size => ({
//         ...size,
//         stock: parseInt(updatedStocks[color.color][size.size] || size.stock, 10)
//       }))
//     }));

//     const totalStock = updatedColors.reduce((acc, color) =>
//       acc + color.sizes.reduce((sizeAcc, size) => sizeAcc + size.stock, 0), 0);

//     try {
//       await updateDoc(productRef, {
//         colors: updatedColors,
//         totalStock
//       });
//       setShowModal(false);
//       setSelectedProduct(null);
//       setUpdatedStocks({});
//       // Re-fetch products or update state as needed
//     } catch (error) {
//       console.error('Error updating product stock: ', error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-8 shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Product List</h2>
//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr>
//             <th className="py-2 border">Product Name</th>
//             <th className="py-2 border">Price</th>
//             <th className="py-2 border">Category</th>
//             <th className="py-2 border">SKU</th>
//             <th className="py-2 border">Image</th>
//             <th className="py-2 border">Total Stock</th>
//             <th className="py-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product => (
//             <tr key={product.id}>
//               <td className="py-2 border">{product.productName}</td>
//               <td className="py-2 border">{product.price}</td>
//               <td className="py-2 border">{product.category}</td>
//               <td className="py-2 border">{product.sku}</td>
//               <td className="py-2 border">
//                 {product.imageUrl ? <img src={product.imageUrl} alt={product.productName} className="h-16 w-16 object-cover" /> : 'No image'}
//               </td>
//               <td className="py-2 border">{product.totalStock}</td>
//               <td className="py-2 border">
//                 <button
//                   onClick={() => handleEditStock(product)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Edit Stock
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && selectedProduct && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg max-w-lg w-full overflow-auto max-h-[80vh]">
//             <h3 className="text-lg font-semibold mb-4">Edit Stock for {selectedProduct.productName}</h3>
//             <div className="space-y-4">
//               {selectedProduct.colors.map(color => (
//                 <div key={color.color}>
//                   <h4 className="text-md font-medium">{color.color}</h4>
//                   {color.sizes.map(size => (
//                     <div key={size.size} className="flex items-center mb-2">
//                       <span className="w-1/3">{size.size}</span>
//                       <input
//                         type="number"
//                         value={updatedStocks[color.color][size.size] || size.stock}
//                         onChange={(e) => handleStockChange(color.color, size.size, e.target.value)}
//                         className="w-2/3 border border-gray-300 rounded px-2 py-1"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 flex justify-end">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveStock}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;











import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase/FirebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedStocks, setUpdatedStocks] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const totalStock = data.colors?.reduce((acc, color) => 
            acc + color.sizes?.reduce((sizeAcc, size) => sizeAcc + parseInt(size.stock, 10), 0), 0) || 0;
          return {
            id: doc.id,
            productName: data.productName || '',
            price: data.price || '',
            category: data.category || '',
            sku: data.sku || '',
            imageUrl: data.imageUrl || '',
            colors: data.colors || [],
            totalStock
          };
        });
        setProducts(productsList);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEditStock = (product) => {
    setSelectedProduct(product);
    setUpdatedStocks(product.colors.reduce((acc, color) => {
      acc[color.color] = color.sizes.reduce((sizeAcc, size) => {
        sizeAcc[size.size] = size.stock;
        return sizeAcc;
      }, {});
      return acc;
    }, {}));
    setShowModal(true);
  };

  const handleStockChange = (color, size, value) => {
    setUpdatedStocks(prev => ({
      ...prev,
      [color]: {
        ...prev[color],
        [size]: value
      }
    }));
  };

  const handleSaveStock = async () => {
    if (!selectedProduct) return;

    const productRef = doc(db, 'products', selectedProduct.id);

    const updatedColors = selectedProduct.colors.map(color => ({
      ...color,
      sizes: color.sizes.map(size => ({
        ...size,
        stock: parseInt(updatedStocks[color.color][size.size] || size.stock, 10)
      }))
    }));

    const totalStock = updatedColors.reduce((acc, color) =>
      acc + color.sizes.reduce((sizeAcc, size) => sizeAcc + size.stock, 0), 0);

    try {
      await updateDoc(productRef, {
        colors: updatedColors,
        totalStock
      });
      setShowModal(false);
      setSelectedProduct(null);
      setUpdatedStocks({});
      // Re-fetch products or update state as needed
    } catch (error) {
      console.error('Error updating product stock: ', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border">Product Name</th>
            <th className="py-2 border">Price</th>
            <th className="py-2 border">Category</th>
            <th className="py-2 border">SKU</th>
            <th className="py-2 border">Image</th>
            <th className="py-2 border">Total Stock</th>
            <th className="py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td className="py-2 border">{product.productName}</td>
              <td className="py-2 border">{product.price}</td>
              <td className="py-2 border">{product.category}</td>
              <td className="py-2 border">{product.sku}</td>
              <td className="py-2 border">
                {product.imageUrl ? <img src={product.imageUrl} alt={product.productName} className="h-16 w-16 object-cover" /> : 'No image'}
              </td>
              <td className="py-2 border">{product.totalStock}</td>
              <td className="py-2 border">
                <button
                  onClick={() => handleEditStock(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit Stock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full overflow-auto max-h-[80vh]">
            <h3 className="text-lg font-semibold mb-4">Edit Stock for {selectedProduct.productName}</h3>
            <div className="space-y-4">
              {selectedProduct.colors.map(color => (
                <div key={color.color}>
                  <h4 className="text-md font-medium">{color.color}</h4>
                  {color.sizes.map(size => (
                    <div key={size.size} className="flex items-center mb-2">
                      <span className="w-1/3">{size.size}</span>
                      <input
                        type="number"
                        value={updatedStocks[color.color][size.size] || size.stock}
                        onChange={(e) => handleStockChange(color.color, size.size, e.target.value)}
                        className="w-2/3 border border-gray-300 rounded px-2 py-1"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStock}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;

