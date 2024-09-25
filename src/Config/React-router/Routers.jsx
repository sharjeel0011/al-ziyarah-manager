import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../Screen/Home/Home';
import Nav from '../../component/Navbar/Nav';

const Routers = () => {
    return (
        <>
          
        <BrowserRouter>
    <Nav/>
          <Routes>
            <Route path="/" element={<Home/>} />
          
          </Routes>
        </BrowserRouter>
      </>
    )
}

export default Routers