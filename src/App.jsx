import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductListing from "./components/ProductListing";

const App = () => {
  return (
    <div>
      <h1>Product Listing App</h1>
      <Routes>
        <Route path="/" element={<ProductListing />} />
      </Routes>
    </div>
  );
};

export default App;
