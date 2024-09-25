


// import React, { useState } from 'react';
// import AddProduct from '../../component/AddProduct/Addproduct';
// import ProductList from '../../component/ProductsData/ProductDatalist';
// import OrderProcess from '../../component/OrderProcess/OrderProcess';
// import OrderOverview from '../../component/Process Orders Details/ProcessOrderList';

// const Home = () => {
//   const [activeComponent, setActiveComponent] = useState('productList');

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'addProduct':
//         return <AddProduct />;
//       case 'orderProcess':
//         return <OrderProcess />;
//       case 'orderOverview':
//         return <OrderOverview />;
//       default:
//         return <ProductList />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div className="w-64 bg-white shadow-md">
//         <div className="p-4 font-bold text-lg border-b">Dashboard</div>
//         <nav className="mt-4">
//           <ul>
//             <li
//               className={`p-4 border-b hover:bg-gray-200 ${activeComponent === 'productList' ? 'bg-gray-200' : ''}`}
//               onClick={() => setActiveComponent('productList')}
//             >
//               Product List
//             </li>
//             <li
//               className={`p-4 border-b hover:bg-gray-200 ${activeComponent === 'addProduct' ? 'bg-gray-200' : ''}`}
//               onClick={() => setActiveComponent('addProduct')}
//             >
//               Add Product
//             </li>
//             <li
//               className={`p-4 border-b hover:bg-gray-200 ${activeComponent === 'orderProcess' ? 'bg-gray-200' : ''}`}
//               onClick={() => setActiveComponent('orderProcess')}
//             >
//               Order Process
//             </li>
//             <li
//               className={`p-4 border-b hover:bg-gray-200 ${activeComponent === 'orderOverview' ? 'bg-gray-200' : ''}`}
//               onClick={() => setActiveComponent('orderOverview')}
//             >
//               Order Overview
//             </li>
//           </ul>
//         </nav>
//       </div>
//       <div className="flex-1 p-4">
//         {renderComponent()}
//       </div>
//     </div>
//   );
// };

// export default Home;














import React, { useState } from 'react';
import AddProduct from '../../component/AddProduct/Addproduct';
import ProductList from '../../component/ProductsData/ProductDatalist';
import OrderProcess from '../../component/OrderProcess/OrderProcess';
import OrderOverview from '../../component/Process Orders Details/ProcessOrderList';

const Home = () => {
    const [activeComponent, setActiveComponent] = useState('productList');
    const [isDrawerExpanded, setIsDrawerExpanded] = useState(true);
  
    const renderComponent = () => {
      switch (activeComponent) {
        case 'addProduct':
          return <AddProduct />;
        case 'orderProcess':
          return <OrderProcess />;
        case 'orderOverview':
          return <OrderOverview />;
        default:
          return <ProductList />;
      }
    };
  
    return (
      <div className="flex h-screen bg-gray-100">
        <div 
          className={`bg-white shadow-md transition-all duration-300 ${isDrawerExpanded ? 'w-64' : 'w-20'} overflow-hidden`}
        >
          <div className="p-4 font-bold text-lg border-b flex items-center">
            <span className={`flex-1 ${isDrawerExpanded ? 'block' : 'hidden'}`}>Dashboard</span>
            <button
              onClick={() => setIsDrawerExpanded(!isDrawerExpanded)}
              className={`text-gray-500 hover:text-gray-700 focus:outline-none ${isDrawerExpanded ? 'ml-4' : 'ml-2'}`}
              aria-label={isDrawerExpanded ? 'Collapse drawer' : 'Expand drawer'}
            >
              {isDrawerExpanded ? '←' : '→'}
            </button>
          </div>
          {isDrawerExpanded && (
            <nav className="mt-4">
              <ul>
                <li
                  className={`p-4 border-b hover:bg-gray-200 ${activeComponent === 'productList' ? 'bg-gray-200' : ''}`}
                  onClick={() => setActiveComponent('productList')}
                >
                  Product List
                </li>
                <li
                  className={`p-4 border-b hover:bg-gray-200 ${activeComponent === 'addProduct' ? 'bg-gray-200' : ''}`}
                  onClick={() => setActiveComponent('addProduct')}
                >
                  Add Product
                </li>
                <li
                  className={`p-4 border-b hover:bg-gray-200 ${activeComponent === 'orderProcess' ? 'bg-gray-200' : ''}`}
                  onClick={() => setActiveComponent('orderProcess')}
                >
                  Order Process
                </li>
                <li
                  className={`p-4 border-b hover:bg-gray-200 ${activeComponent === 'orderOverview' ? 'bg-gray-200' : ''}`}
                  onClick={() => setActiveComponent('orderOverview')}
                >
                  Order Overview
                </li>
              </ul>
            </nav>
          )}
        </div>
        <div className="flex-1 p-4">
          {renderComponent()}
        </div>
      </div>
    );
  };
  
  export default Home;