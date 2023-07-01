import React from 'react';
import axios from 'axios'
import {Routes, Route, Link} from 'react-router-dom'
import { useState } from 'react';
import {Home} from './pages/home/home';
import {Product} from './pages/product/product';

function App() {

  return (
    <>
      <Routes>
        {/* the home page */}
        <Route path='/' element={<Home/>}>
        </Route>
        {/* the product page */}
        <Route path='/product' element={<Product/>}>
        </Route>
        {/* the third page??? */}
        <Route>

        </Route>
      </Routes>
    </>
  )
}

export default App
