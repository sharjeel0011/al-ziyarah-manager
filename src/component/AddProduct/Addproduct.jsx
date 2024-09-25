




// import React, { useState } from 'react';
// import { db } from '../../Config/Firebase/FirebaseConfig';
// import { collection, addDoc } from 'firebase/firestore';

// const AddProduct = () => {
//   const [productName, setProductName] = useState('');
//   const [price, setPrice] = useState('');
//   const [category, setCategory] = useState('');
//   const [colors, setColors] = useState([{ color: '', sizes: [] }]);

//   const handleAddColorField = () => {
//     setColors([...colors, { color: '', sizes: [] }]);
//   };

//   const handleRemoveColorField = (index) => {
//     setColors(colors.filter((_, i) => i !== index));
//   };

//   const handleColorChange = (index, value) => {
//     const updatedColors = [...colors];
//     updatedColors[index].color = value;
//     setColors(updatedColors);
//   };

//   const handleSizeChange = (colorIndex, size) => {
//     const updatedColors = [...colors];
//     const sizeIndex = updatedColors[colorIndex].sizes.findIndex(s => s.size === size);
//     if (sizeIndex === -1) {
//       updatedColors[colorIndex].sizes.push({ size, stock: '' });
//     } else {
//       updatedColors[colorIndex].sizes.splice(sizeIndex, 1);
//     }
//     setColors(updatedColors);
//   };

//   const handleStockChange = (colorIndex, sizeIndex, stock) => {
//     const updatedColors = [...colors];
//     updatedColors[colorIndex].sizes[sizeIndex].stock = stock;
//     setColors(updatedColors);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addDoc(collection(db, 'products'), {
//         productName,
//         price,
//         category,
//         colors,
//       });
//       alert('Product added successfully');
//       // Clear form
//       setProductName('');
//       setPrice('');
//       setCategory('');
//       setColors([{ color: '', sizes: [] }]);
//     } catch (e) {
//       console.error('Error adding document: ', e);
//     }
//   };

//   const renderSizeField = (colorIndex) => {
//     const sizeOptions = {
//       shoes: ['36', '37', '38', '39', '40', '41'],
//       dress: ['S', 'M', 'L', 'XL', 'XXL'],
//       abaya: ['S', 'M', 'L', 'XL', 'XXL'],
//     };

//     if (category === 'jewellery' || category === 'helth&beauti') {
//       return null;
//     }

//     return (
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Size</label>
//         <div className="flex flex-wrap gap-2">
//           {sizeOptions[category]?.map((sizeOption) => (
//             <label key={sizeOption} className="flex items-center">
//               <input
//                 type="checkbox"
//                 value={sizeOption}
//                 checked={colors[colorIndex].sizes.some(s => s.size === sizeOption)}
//                 onChange={() => handleSizeChange(colorIndex, sizeOption)}
//                 className="mr-2"
//               />
//               {sizeOption}
//             </label>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderStockFields = (colorIndex) => {
//     return colors[colorIndex].sizes.map((sizeObj, sizeIndex) => (
//       <div key={`${colorIndex}-${sizeIndex}`} className="mb-2">
//         <label className="block text-sm font-medium mb-1">
//           Stock for {colors[colorIndex].color} - {sizeObj.size}
//         </label>
//         <input
//           type="number"
//           value={sizeObj.stock}
//           onChange={(e) => handleStockChange(colorIndex, sizeIndex, e.target.value)}
//           className="w-full px-2 py-1 border rounded"
//           required
//         />
//       </div>
//     ));
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white p-8 shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Add Product</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2" htmlFor="product-name">
//             Product Name
//           </label>
//           <input
//             type="text"
//             id="product-name"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2" htmlFor="price">
//             Price
//           </label>
//           <input
//             type="number"
//             id="price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2" htmlFor="category">
//             Category
//           </label>
//           <select
//             id="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="shoes">Shoes</option>
//             <option value="dress">Dress</option>
//             <option value="jewellery">Jewellery</option>
//             <option value="abaya">Abaya</option>
//             <option value="hijab">Hijab</option>
//             <option value="helth&beauti">Health & Beauty</option>
//           </select>
//         </div>
//         {colors.map((colorObj, index) => (
//           <div key={index} className="mb-4">
//             <label className="block text-sm font-medium mb-2" htmlFor={`color-${index}`}>
//               Color {index + 1}
//             </label>
//             <input
//               type="text"
//               id={`color-${index}`}
//               value={colorObj.color}
//               onChange={(e) => handleColorChange(index, e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//             {renderSizeField(index)}
//             {renderStockFields(index)}
//             <button
//               type="button"
//               onClick={() => handleRemoveColorField(index)}
//               className="bg-red-500 text-white px-4 py-2 rounded mt-2"
//             >
//               Remove Color
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={handleAddColorField}
//           className="bg-green-500 text-white px-4 py-2 rounded mt-4"
//         >
//           Add Color
//         </button>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

























import React, { useState } from 'react';
import { db, storage } from '../../Config/Firebase/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [sku, setSku] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [colors, setColors] = useState([{ color: '', sizes: [] }]);

  const handleAddColorField = () => {
    setColors([...colors, { color: '', sizes: [] }]);
  };

  const handleRemoveColorField = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleColorChange = (index, value) => {
    const updatedColors = [...colors];
    updatedColors[index].color = value;
    setColors(updatedColors);
  };

  const handleSizeChange = (colorIndex, size) => {
    const updatedColors = [...colors];
    const sizeIndex = updatedColors[colorIndex].sizes.findIndex(s => s.size === size);
    if (sizeIndex === -1) {
      updatedColors[colorIndex].sizes.push({ size, stock: '' });
    } else {
      updatedColors[colorIndex].sizes.splice(sizeIndex, 1);
    }
    setColors(updatedColors);
  };

  const handleStockChange = (colorIndex, sizeIndex, stock) => {
    const updatedColors = [...colors];
    updatedColors[colorIndex].sizes[sizeIndex].stock = stock;
    setColors(updatedColors);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `product_images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setImageUrl(downloadURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        productName,
        price,
        category,
        sku,
        imageUrl,
        colors,
      });
      alert('Product added successfully');
      // Clear form
      setProductName('');
      setPrice('');
      setCategory('');
      setSku('');
      setImage(null);
      setImageUrl('');
      setColors([{ color: '', sizes: [] }]);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const renderSizeField = (colorIndex) => {
    const sizeOptions = {
      shoes: ['36', '37', '38', '39', '40', '41'],
      dress: ['S', 'M', 'L', 'XL', 'XXL'],
      abaya: ['S', 'M', 'L', 'XL', 'XXL'],
    };

    if (category === 'jewellery' || category === 'helth&beauti') {
      return null;
    }

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Size</label>
        <div className="flex flex-wrap gap-2">
          {sizeOptions[category]?.map((sizeOption) => (
            <label key={sizeOption} className="flex items-center">
              <input
                type="checkbox"
                value={sizeOption}
                checked={colors[colorIndex].sizes.some(s => s.size === sizeOption)}
                onChange={() => handleSizeChange(colorIndex, sizeOption)}
                className="mr-2"
              />
              {sizeOption}
            </label>
          ))}
        </div>
      </div>
    );
  };

  const renderStockFields = (colorIndex) => {
    return colors[colorIndex].sizes.map((sizeObj, sizeIndex) => (
      <div key={`${colorIndex}-${sizeIndex}`} className="mb-2">
        <label className="block text-sm font-medium mb-1">
          Stock for {colors[colorIndex].color} - {sizeObj.size}
        </label>
        <input
          type="number"
          value={sizeObj.stock}
          onChange={(e) => handleStockChange(colorIndex, sizeIndex, e.target.value)}
          className="w-full px-2 py-1 border rounded"
          required
        />
      </div>
    ));
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="product-name">
            Product Name
          </label>
          <input
            type="text"
            id="product-name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="shoes">Shoes</option>
            <option value="dress">Dress</option>
            <option value="jewellery">Jewellery</option>
            <option value="abaya">Abaya</option>
            <option value="hijab">Hijab</option>
            <option value="helth&beauti">Health & Beauty</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="sku">
            Product SKU
          </label>
          <input
            type="text"
            id="sku"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="image">
            Product Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        {colors.map((colorObj, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor={`color-${index}`}>
              Color {index + 1}
            </label>
            <input
              type="text"
              id={`color-${index}`}
              value={colorObj.color}
              onChange={(e) => handleColorChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
            {renderSizeField(index)}
            {renderStockFields(index)}
            <button
              type="button"
              onClick={() => handleRemoveColorField(index)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Remove Color
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddColorField}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Add Color
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
